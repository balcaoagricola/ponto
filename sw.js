const CACHE_NAME = 'balcao-agricola-ponto-v1';
const urlsToCache = [
  './',
  './index.html'
];

// Instalação do Service Worker e salvaguarda em cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceção de pedidos para carregar offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function() {
      // Se estiver offline e tentar aceder à página principal, devolve a cache
      return caches.match('./index.html');
    })
  );
});
