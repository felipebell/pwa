self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static')
      .then(function(cache){
        console.log('[Service Worker] Precaching App Shell');
        cache.add('../public/');
        cache.add('index.html');
        cache.add('src/js/app.js');
        cache.add('src/js/feed.js');
        cache.add('src/js/promise.js');
        cache.add('src/js/fetch.js');
        cache.add('src/js/material.min.js');
        cache.add('src/css/app.css');
        cache.add('src/css/feed.css');
        cache.add('src/image/main-image.jpg');
        cache.add('https://fonts.googleapis.com/css?family=Roboto:400,700');
        cache.add('https://fonts.googleapis.com/icon?family=Material+Icons');
        cache.add('https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'); 
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response){
        if(response){
          return response;
        }else{
          return fetch(event.request)
          .then(function(res){
            caches.open('dynamic')
            .then(function(cache){
              cache.put(event.request.url, res.clone());
              return resolveCname;
            });
          });
        }
      })
  );
});