# Hipster Shorditch

This is my final project submission for the Udacity Web Developer Nanodegree.

It is a map application which shows some of my favourite hipster places in Shoreditch, London.

## How to run

Clone this git repositiory and then run:

1. `yarn install`
2. `yarn start`

and then open http://localhost:3000/ in your web browser to see the app.

## How to deploy the application

You can also run `yarn build` to generate a compiled version of the application. See https://github.com/facebook/create-react-app#npm-run-build-or-yarn-build for more details. This will create a version with a compiled service worker which can be used to run the application as an offline application. Note that the Leaflet.js api and the Foursquare api's do not work offline.

## Technology used

The app makes use of the following libraries and apis:

* https://github.com/facebook/create-react-app - This is the boilerplate I started with
* https://github.com/PaulLeCam/react-leaflet - This allowed me to integrate Leaflet.js easily into my React app
* Foursquare developer API - I use this to pull down and show additional information about my places including address, opening hours and rating
