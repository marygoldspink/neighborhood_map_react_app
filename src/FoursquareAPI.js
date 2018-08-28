const API = "https://api.foursquare.com/v2";
const CLIENT_ID = 'DLWPKPYXOUYKMSYMUZRCNRR5BSOTSWCSA1IBQABHSO0CDI4B';
const CLIENT_SECRET = 'AFOGHA22BMMK3N4JWX1BJMFFD0ZVTEAFNWFVVFQJCBTZ3TFE';
const VERSION = '20180828';

// This is my foursquare api based on what I'd done with the previous React project:
//  https://github.com/marygoldspink/reactnd-project-myreads-starter/blob/master/src/BooksAPI.js

// Get an individual venue by its id
export const get = (venueId) =>
  fetch(`${API}/venues/${venueId}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
    .then(res => res.json())
    .then(data => {
        if (data.meta.code !== 200) {
            throw data.meta.errorDetail;
        }
        return data.response.venue;
    });
