var CACHE_NAME = 'railTweet-4';
var urlsToCache = [
    '/',
    '/index.html',
    '/static/contact.html',
    '/static/about.html',
    '/static/assets/css/bootstrap.min.css',
    '/static/assets/css/sticky-footer-navbar.css',
    '/static/assets/images/chrome-touch-icon-192x192.png',
    '/static/assets/images/chrome-touch-icon-384x384.png',
    '/static/assets/js/jquery.min.js',
    '/static/assets/js/typeahead.bundle.min.js',
    '/static/assets/js/bootstrap.min.js',
    '/static/assets/js/common-min.js',
    '/static/assets/manifest.json'
];

function shouldCache(url) {
    if (url.substr(0, location.origin.length) === location.origin) {
        return urlsToCache.indexOf(url.substr(location.origin.length)) > -1;
    } else {
        return urlsToCache.indexOf(url) > -1;
    }
}

self.addEventListener('install', function (event) {
    // Perform install steps
    console.log('WORKER: install');
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache', urlsToCache);
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', function (event) {
        console.log('WORKER: fetch event ignored');
        if (event.request.method !== 'GET' && event.request.method !== 'HEAD') {
            console.log(['WORKER: fetch event ignored.', event.request]);
            return;
        }

        event.respondWith(
            caches.match(event.request)
                .then(function (cached) {
                    var networked = fetch(event.request)
                        .then(fetchedFromNetwork, unableToResolve)
                        .catch(unableToResolve);

                    console.log("Responding from " + (cached ? 'cache' : 'network') + ' url:' + event.request.url);
                    return cached || networked;

                    function fetchedFromNetwork(response) {
                        var cacheCopy = response.clone();
                        console.log('WORKER: fetched response from network.', event.request);
                        if (shouldCache(event.request.url)) {
                            console.log('WORKER: caching new response from network', event.request.url);
                            caches
                                .open(CACHE_NAME)
                                .then(function (cache) {
                                    cache.put(event.request, cacheCopy);
                                })
                                .then(function () {
                                    console.log('WORKER: fetch response stored in cache.', event.request.url);
                                });
                        } else {
                            console.log('WORKER: not caching ', event.request.url);
                        }

                        return response;
                    }

                    function unableToResolve() {
                        console.log('WORKER: fetch request failed in both cache and network.');
                        return new Response('<h1>Service Unavailable</h1>', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/html'
                            })
                        });
                    }
                })
        )
    }
);


self.addEventListener('activate', function (event) {
    console.log('WORKER: activate');
    var cacheWhitelist = [CACHE_NAME];
    event.waitUntil(self.clients.claim());
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('WORKER: deleting previous caches');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});