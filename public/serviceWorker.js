// Cache name for storing assets
const CACHE_NAME = 'gusto-cache-v1';

// Files to cache
const urlsToCache = [
  '/gusto-restaurant/index.html',
  '/gusto-restaurant/offlinePage.html',
  '/gusto-restaurant/gusto-icon.svg',
];

// Install event: Cache the specified assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  // Force the service worker to activate immediately
  self.skipWaiting();
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  // Claim clients immediately
  self.clients.claim();
});

// Fetch event: Serve cached content or offline page
self.addEventListener('fetch', event => {
  // Handle navigation requests (e.g., page loads)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If navigation fails (offline), serve the offline page
        return caches.match('/gusto-restaurant/offlinePage.html').then(response => {
          return response || new Response(
            '<h1>Offline</h1><p>Offline page not found.</p>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        });
      })
    );
  } else {
    // Handle other requests (e.g., CSS, JS, images)
    event.respondWith(
      caches.match(event.request).then(response => {
        // Return cached response if available
        return response || fetch(event.request).catch(() => {
          // Optional: Handle failed asset fetches (e.g., return a fallback image)
          return new Response('Resource not available offline', {
            status: 404,
            statusText: 'Not Found',
          });
        });
      })
    );
  }
});