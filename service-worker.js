const CACHE_NAME = "Football-Area";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/article.html",
  "/pages/home.html",
  "/pages/saved.html",
  "/pages/schedule.html",
  "/pages/standing.html",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/css/style.css",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/nav.js",
  "/js/script.js",
  "/manifest.json",
  "/service-worker.js",
  "/image/background1.png",
  "/image/lapangan2.jpg",
  "/icon.png",
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js'
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  let base_url = "https://api.football-data.org/v2/";
  const online = self.navigator.onLine;
  if (event.request.url.indexOf(base_url) > -1 && online) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {
        'ignoreSearch': true
      }).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


//---pengaturan untuk push sama dengan sw.js di latihan
self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: "/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});