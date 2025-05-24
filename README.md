## [Croc Spy App](crocspy.vercel.app)

The Croc Spy project aims to build an AI to help identify and cataloge crocodilian species sent by the public. The project was idelized by a biology professor at UFBa and it is currently been developed.

This app is an PWA that will connect the users with the AI. It was built using React + Vite.

Main Packages Used:

* leaflet for the map.
* React-camera-pro for the webRTC interactions.
* i18n for the translations (setup but now yet implmented all the texts).
* dexie (indexedDB) for the local storage.
* react-bootstrap for general components.
* reac-router-dom for routing.

The project is still in development so there still are some development artefacts such as the admin panel
which makes testing easier.
In the spirit of the project, most text are AI generated and thus should not be taken as absolut truths. The final version will contain information text that will be approved by the professor.

The AI team have not yet finished the backend and thus, for now, we are faking the upload and randomly assigning an species to a photo.

Some dev points:

* Yes, the theme on the language selector is purposely inverted.
* The Map is centered at the average coordinates of the photos with gps data.
* The count includes photos without gps data.
* The pins in the map are offset by a sinusoid and a cossinusoid from the original location. This is better visualizing multiple photos during testing.
* If you use the app on a desktop, your device probably does not have  an integrated gps and thus the location is a rougher approximation than on mobile.

Try it out live: [crocspy.vercel.app](crocspy.vercel.app)
