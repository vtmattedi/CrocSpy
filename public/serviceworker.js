
const CACHE_NAME = 'croc-spy-cache-v';
const CACHE_VERSION = 'v2';

// Files to be cached by the service worker
// Do not remove the comments below, they are used by postbuild.js to inject the file list
//%FILENAMES%
FILENAMES = ['nothing-to-cache'];
//%FILENAMESEND% Do not remove this comment, it is used by postbuild.js to inject the file list
self.addEventListener('install', event => {
  // Nothing to cache yet, but we can log the installation
  console.log('Service Worker installing.');
  event.waitUntil(
    async () => {
      cache = await caches.open(`${CACHE_NAME}-${CACHE_VERSION}`);
      console.log('Service Worker: Caching Files', FILENAMES.length);
      await cache.addAll(FILENAMES);
      self.skipWaiting();
    }
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  self.skipWaiting(); // Skip waiting to activate immediately
  // Clean up old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith(CACHE_NAME) && cacheName !== `${CACHE_NAME}-${CACHE_VERSION}`) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

const isPageRoute = (uri) => {
  const ext = uri.split('.')
  if (ext.length > 1) {
    const fileExt = ext[ext.length - 1].toLowerCase();
    return fileExt === 'html' || fileExt === 'htm' || fileExt === '';
  }
  return true;

}

self.addEventListener('fetch', (event) => {
  const uri = new URL(event.request.url).pathname
  const ISROUTE = /(\.(htm(l)?)$)|(^[^\.]*.?$)/.test(uri)
  // if file ends with .html or .htm or has no extension
  // we consider it a route and serve the index.html since we are using a single-page application model
  const urlToTest = ISROUTE ? './index.html' : uri;
  // Check if this is one of the routes we want to cache
  if (ISROUTE || FILENAMES.includes(urlToTest) || urlToTest.indexOf("flag-icons/flags/4x3") !== -1) {
    event.respondWith(caches.open(`${CACHE_NAME}-${CACHE_VERSION}`).then(async (cache) => {
      const cachedResponse = await cache.match(urlToTest);
      const fetchedResponse = fetch(event.request).then((networkResponse) => {
        //stale while revalidate
        if (networkResponse.ok)
          cache.put(urlToTest, networkResponse.clone());
        return networkResponse;
      }).catch((error) =>{
        console.error('Fetch failed: ', error);
        return new Response('Network error occurred', {
          status: 408,
          statusText: 'Network Error'
        });
      });
      if (cachedResponse) {
        //console.log('Serving from cache:', urlToTest);
        return cachedResponse;
      }
      else {
        //console.log('Fetching from network:', urlToTest);
        // If we have no cached response, we fetch from the networkk
        return fetchedResponse;
      }
    }));
  } else {
    return;
  }

});