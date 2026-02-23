// FlowCash SW — cache-first for static assets, network-first for API
const CACHE_NAME = 'flowcash-v1';
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
    '/flowcash-logo.png',
];

// Install — pre-cache shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch — network-first for API, cache-first for static
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET and API calls
    if (request.method !== 'GET') return;
    if (request.url.includes('/api/')) {
        // Network-first for API
        event.respondWith(
            fetch(request)
                .then((res) => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    return res;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Cache-first for static assets
    event.respondWith(
        caches.match(request).then((cached) => cached || fetch(request))
    );
});
