const CACHE_NAME = 'tj-cache-v1';
const URLsToCache = ['/', '/index.html', '/manifest.json', '/sw.js', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
