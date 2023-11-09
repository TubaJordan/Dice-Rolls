// Define the files you want to cache
const CACHE_NAME = 'dice-roller-v1';
const FILES_TO_CACHE = [
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/images/android-chrome-192x192.png',
    '/images/android-chrome-512x512.png',
    '/images/apple-touch-icon.png',
    '/images/favicon-16x16.png',
    '/images/favicon-32x32.png',
    '/images/mstile-70x70.png',
    '/images/mstile-144x144.png',
    '/images/mstile-150x150.png',
    '/images/mstile-310x150.png',
    '/images/mstile-310x310.png',
    '/images/safari-pinned-tab.svg',
    '/images/site.webmanifest',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});