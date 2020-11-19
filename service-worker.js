importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}


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
    url: '/css/materialize.css',
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
    revision: '2'
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
    revision: '2'
  },
  {
    url: '/manifest.json',
    revision: '2'
  },
  {
    url: '/service-worker.js',
    revision: '2'
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
  },
  {
    url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    revision: '1'
  }

], {
  ignoreUrlParametersMatching: [/.*/],
});

workbox.routing.registerRoute(
  ({
    url
  }) => url.origin === 'https://api.football-data.org/v2/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-data',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);
workbox.routing.registerRoute(
  new RegExp('/index.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'index'
  })
);
workbox.routing.registerRoute(
  new RegExp('/article.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'articles'
  })
);
workbox.routing.registerRoute(
  new RegExp('/nav.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'nav'
  })
);


/*workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-data',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ]
  })
);*/





// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);




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