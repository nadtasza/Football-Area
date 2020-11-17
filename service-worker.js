importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');


const CACHE_NAME = "Football-Area";
const urlsToCache = [
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
  "/push.js",
  "/manifest.json",
  "/service-worker.js",
  "/image/background1.png",
  "/image/lapangan2.jpg",
  "/icon.png",
  "/icon192.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js"


];

workbox.precaching.precacheAndRoute([{
    url: '/index.html',
    revision: '1'
  },
  {
    url: '/nav.html',
    revision: '1'
  },
  {
    url: '/article.html',
    revision: '1'
  },
  {
    url: '/pages/home.html',
    revision: '1'
  },
  {
    url: '/pages/saved.html',
    revision: '1'
  },
  {
    url: 'pages/schedule.html',
    revision: '1'
  },
  {
    url: '/pages/standing.html',
    revision: '1'
  },
  {
    url: '/css/materialize.min.css',
    revision: '1'
  },
  {
    url: '/css/style.css',
    revision: '1'
  },
  {
    url: '/js/materialize.js',
    revision: '1'
  },
  {
    url: '/js/materialize.min.js',
    revision: '1'
  },
  {
    url: '/js/api.js',
    revision: '1'
  },
  {
    url: '/js/db.js',
    revision: '1'
  },
  {
    url: '/js/idb.js',
    revision: '1'
  },
  {
    url: '/js/nav.js',
    revision: '1'
  },
  {
    url: '/push.js',
    revision: '1'
  },
  {
    url: '/manifest.json',
    revision: '1'
  },
  {
    url: '/service-worker.js',
    revision: '1'
  },
  {
    url: '/image/background1.png',
    revision: '1'
  },
  {
    url: '/image/lapangan2.jpg',
    revision: '1'
  },
  {
    url: '/icon.png',
    revision: '1'
  },
  {
    url: '/icon192.png',
    revision: '1'
  },
  {
    url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    revision: '1'
  },
  {
    url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    revision: '1'
  },
  {
    url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js',
    revision: '1'
  }

]);

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  const base_url = "https://api.football-data.org/v2/";
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
        ignoreSearch: true
      }).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", event => {
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
self.addEventListener('push', event => {
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