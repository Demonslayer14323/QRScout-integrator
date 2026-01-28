const CACHE_NAME = 'qrscout-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache).catch(err => {
                    console.log('Cache addAll error:', err);
                });
            })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip external API calls (let them fail naturally for offline detection)
    if (url.hostname !== 'localhost' && 
        url.hostname !== '127.0.0.1' && 
        !url.hostname.includes('github.io') &&
        url.hostname !== location.hostname) {
        return;
    }

    // For same-origin requests, use cache-first strategy for HTML/CSS/JS
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }

                    return fetch(request).then(response => {
                        // Don't cache if it's not a success response
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            });

                        return response;
                    });
                })
                .catch(() => {
                    // Return offline page or cached content
                    return caches.match('/index.html');
                })
        );
    }
});

// Background Sync for pending data
self.addEventListener('sync', event => {
    if (event.tag === 'sync-pending-data') {
        event.waitUntil(syncPendingData());
    }
});

async function syncPendingData() {
    try {
        const db = await openDB();
        const pending = await getPendingFromDB(db);
        
        let synced = 0;
        let failed = 0;
        
        for (const item of pending) {
            try {
                const response = await fetch(item.scriptUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        data: item.data
                    })
                });
                
                const result = await response.json();
                if (result.success === true) {
                    await markAsSyncedInDB(db, item.id);
                    synced++;
                } else {
                    failed++;
                }
            } catch (error) {
                failed++;
            }
        }
        
        // Notify clients of sync completion
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'sync-complete',
                synced: synced,
                failed: failed
            });
        });
        
    } catch (error) {
        console.error('Sync failed:', error);
        throw error;
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('QRScoutDB', 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (e) => {
            const objectStore = e.target.result.createObjectStore('submissions', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('synced', 'synced', { unique: false });
        };
    });
}

function getPendingFromDB(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['submissions'], 'readonly');
        const objectStore = transaction.objectStore('submissions');
        const index = objectStore.index('synced');
        const request = index.getAll(false);
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function markAsSyncedInDB(db, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['submissions'], 'readwrite');
        const objectStore = transaction.objectStore('submissions');
        const getRequest = objectStore.get(id);
        
        getRequest.onsuccess = () => {
            const item = getRequest.result;
            if (item) {
                item.synced = true;
                objectStore.put(item);
            }
        };
        
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}
