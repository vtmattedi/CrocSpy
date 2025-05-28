
const CACHE_NAME = 'croc-spy-cache';
const CACHE_VERSION = 'v3';

// Do not remove the comments below, they are used by postbuild.js to inject the file list
//%FILENAMES%
const FILENAMES =[
  "./android-chrome-192x192.png",
  "./android-chrome-512x512.png",
  "./apple-touch-icon.png",
  "./assets/bg-3JFsPf48.mp3",
  "./assets/bite-zijO9hDJ.mp3",
  "./assets/bootstrap-icons-BeopsB42.woff",
  "./assets/bootstrap-icons-mSm7cUeB.woff2",
  "./assets/ChatGPTcrocAnatomy-Ctp8WuuS.png",
  "./assets/ChatGPTcrocBehaviour-mNFfiF4t.png",
  "./assets/ChatGPTcrocDistribution-CFt4buOf.png",
  "./assets/ChatGPTcrocEvolution-CyctQp2q.png",
  "./assets/ChatGPTcrocFamily-BlNAmC1w.png",
  "./assets/ChatGPTcrocHist-CBoGy9tc.png",
  "./assets/croc0-BlK8CbYB.png",
  "./assets/croc1-DrwShtkQ.png",
  "./assets/croc2-Cw9Qlgo1.png",
  "./assets/croc3-aoUYfnbq.png",
  "./assets/croc4-DCs9ol2I.png",
  "./assets/croc5-DsgqB6Wt.png",
  "./assets/croc6-a-6BFKh-.png",
  "./assets/croc7-DhRqps4D.png",
  "./assets/croc8-BFf9bcep.png",
  "./assets/crocEye-Dzy9u3uI.png",
  "./assets/croclockhomes-DBDSfOrq.png",
  "./assets/croclockhomesclosed-B2ClPhnC.png",
  "./assets/crocParty-Dv-8MfG1.png",
  "./assets/crocPartyMobile-CGDTBOF9.png",
  "./assets/howler-CoXO_3kd.js",
  "./assets/index-Dm5vgb2Z.js",
  "./assets/index-fJtg8Dzf.css",
  "./assets/logo2-4v7iL4eM.svg",
  "./assets/shutter-BR8FDDCF.mp3",
  "./assets/whoisthat-DDW8OVwN.mp3",
  "./croc1.svg",
  "./croc2.svg",
  "./croc3.svg",
  "./favicon-16x16.png",
  "./favicon-32x32.png",
  "./favicon.ico",
  "./index.html",
  "./serviceworker.js",
  "./site.webmanifest"
];
const ROUTES = [
  "/",
  "/map",
  "/camera",
  "/info",
  "/home",
  "/test",
  "/result/:id",
  "/Upload/:id",
  "/Identify",
  "/Explore",
  "/howto/:what",
  "/404"
];
//%FILENAMESEND% Do not remove this comment, it is used by postbuild.js to inject the file list
const ROUTES_REGEX = new RegExp(`^(${ROUTES.map(route => route.toLowerCase().replace(/:[^/]+/g, '[^/]+')).join('|')})$`);
self.addEventListener('install', event => {
  // Nothing to cache yet, but we can log the installation
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open(`${CACHE_NAME}-${CACHE_VERSION}`).then(cache => {
      console.log('Caching files during service worker installation:', FILENAMES.length);
      console.log('REGEX:', ROUTES_REGEX);
      cache.addAll(FILENAMES);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
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

self.addEventListener('fetch', event => {
  //console.log('Service Worker fetching:', event.request.url);
  const uri = new URL(event.request.url).pathname.toLowerCase();
  const isRoute = ROUTES_REGEX.test(uri);
  const urlToTest = isRoute ? './index.html' : event.request.url;
  event.respondWith(
     (async () => {
      // Try to get the response from a cache.
      const cachedResponse = await caches.match(urlToTest);
      // Return it if we found one.
      if (cachedResponse) return cachedResponse;
      // If we didn't find a match in the cache, use the network.
      return fetch(event.request);
    })(),
  )
});