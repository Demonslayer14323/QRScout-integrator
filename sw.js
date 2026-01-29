const CACHE_NAME = 'qrscout-v4';
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
