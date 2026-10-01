// NeuroGaze service worker: offline support.
// Bump CACHE whenever you deploy a new version so phones pick up the update.
const CACHE = 'neurogaze-v1';
const CORE = ['/', '/index.html', '/manifest.webmanifest',
  '/icons/icon-192.png', '/icons/icon-512.png', '/icons/icon-maskable-512.png', '/icons/apple-touch-icon.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Pages: try the network first so updates show, fall back to the cached app offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('/index.html', copy));
        return res;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Everything else (icons, Google Fonts): serve from cache, refresh in the background.
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
