## [Croc Spy App](crocspy.vercel.app) 🐊

The Croc Spy project aims to build an AI to help identify and cataloge crocodilian species sent by the public. The project was idealized by a biology professor at UFBa, and it has currently been developed.

This app is a PWA that connects users with AI. It was built using React + Vite. It is fullt responsive and is also available offline making the PWA experience even better.

##### Main Packages Used:

* leaflet for the map.
* React-camera-pro for the WebRTC interactions.
* i18n for the translations (setup but now yet implemented all the texts).
* Dexie (indexedDB) for the local storage.
* react-bootstrap for general components.
* react-router-dom for routing.

<details>
<summary>Caching
</summary>

* Vite's workbox plugin didnt work out of the box the way I wanted so I made a serviceworker that uses a simple stale-while-revalidate strategy to cache most of the website, including handling for routes, making the PWA available offline.
* It caches all website local pages and assets plus some flags over a CDN
* A postbuild script injects the files generated by the build in the service worker's script.
* The service worker precaches all those files.
* It will try to match fetch url to .html, .htm or no extension file (routes), a filename in the filelist generated or a url for the react-flag CDN
* For any of those it uses a [stale-while-revalidate strategy](https://developer.chrome.com/docs/workbox/caching-strategies-overview#stale-while-revalidate) for any other url it fallsback to de the browser.
</details>
<br>

The project is still in development, so there are still some development artefacts, such as the admin panel
which makes testing easier.
In the spirit of the project, most texts are AI-generated and thus should not be taken as absolute truths. The final version will contain information text that will be approved by the professor.

The AI team have not yet finished the backend and thus, for now, we are faking the upload and randomly assigning a species to a photo.

Some dev points:

* Yes, the theme on the language selector is purposely inverted.
* The Map is centered at the average coordinates of the photos with GPS data.
* The count includes photos without GPS data.
* The pins in the map are offset by a sinusoid and a cossinusoid from the original location. This is better visualizing multiple photos during testing.
* If you use the app on a desktop, your device probably does not have  an integrated gps and thus the location is a rougher approximation than on mobile.

Try it out live: [crocspy.vercel.app](crocspy.vercel.app)
