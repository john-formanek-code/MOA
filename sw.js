// Minimal SW bez ikon
const CACHE = 'longstrike-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './images/LongStrike.png',
  './images/LongStrikeWithScope.png',
  './images/LongStrikeWithBarrel.png',
  './images/LongStrikeWithScopeAndBarrel.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }).catch(() => r))
  );
});
