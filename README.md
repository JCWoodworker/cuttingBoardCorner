# Cutting Board Corner

* User scans the NFC tag on their cutting board
* They are brought to a page with information on their board
  * Image(s)
  * List and description of woods used
  * Link to YT video of it's creation
  * Contact link for RILW
* OR they are brough to a page with information on their coaster(s)
  * Same as above
  * Random cocktail generator
    * Name, glassware, image, ingredients, and instructions
* If they go directly to www.cuttingboardcorner.com they can choose between entering a board ID or coaster ID
* For now all endpoints and information are public

## Feature Updates

### New Features 5/24/2024
* Users can now login using Google!
  * No logged-in options for users yet
* Users can choose a persistent theme - either dark or light
  * It doesn't matter if the user is logged in or not
* Nav menu (as MUI drawer) is fixed at the top of the page
  * It disappears when user scrolls down the page
  * It re-appears as soon as a user starts to scroll back up the page
  * Google login is within the Guest Nav Drawer
  * No Working nav links for Guests or users YET

## TODO

### Authentication
* [x] Add logic for signing in, up, and out
  * [x] Sign in with Google
  * [x] Sign up with Google
  * [x] Sign out
  * [x] Move user info and logged in state to context with custom hook
  * [ ] Refactor to make sure signing in or up work correctly and subapp info is sent to backend
  * [x] Set the user's role in userInfo based on backend response
* [ ] Change ```credentialResponse``` type to something besides ```any```
  * [ ] Create custom type if necessary, or import from Google's library

### UI
* [ ] Change favicon
* [ ] Add border radius to ALL 4 sides of Google user image
* [ ] Refactor BoardDataShow with <Divider /> instead of <hr />
* [ ] Allow a logged in user register the products they own
* [ ] ADMIN PAGE
  * For now I'm just manually uploading to S3 and adding entries via console or Postman.
  * [ ] adding new boards and coasters with their images
  * [ ] Deleting boards and coasters
  * [ ] Editing boards and coasters
    * [ ] Board/coaster images
    * [ ] Board/coaster description and other information
  * [ ] Feature for CSV upload for bulk additions
* [ ] User Settings Page
  * [ ] Save theme / override guest theme
    * [ ] Custom themes beyond light and dark
  * [ ]  ???
  * [ ]  ???
* [ ] Add Loading Spinner
  * [ ] On initial load
  * [ ] On sign in
  * [ ] On loading of random drink info
  * [ ] On loading images
  * [ ] On loading videos
  * [ ] On NotFound component while it redirects to home
* [x] Add Navigation Bar
  * [x] Move Google login to guest nav bar
  * [x] Add Admin link for users with admin role
* [x] Light/Dark Theme
  * [x] Move theme to context with custom hook  

### Performance
* [ ] Uploaded images are automatically shrinked to 5mb or less
* [ ] Load a low-quality blurry image FIRST while main image is loading for nicer effect

### Backend Changes
* [ ] Add more boards to the database
  * [ ] Maybe wait for Admin page to be created to make this easier
* [ ] Change product IDs to UUIDs instead of numbers
  * [ ] Update frontend to handle UUIDs
* [ ] CLI ???  Maybe ???

### Bug Fixes
* [x] Update styling to fix issue with centered information not allowing user to scroll
* [ ] Going directly to ```/boards/:id``` or ```/coasters/:id``` redirects the user to ```/```

### Misc
* [ ] Add a Requests class to handle all requests
  * [ ] Possibly create a custom library that works with all subapps of the NestJS Mega Backend?
* [ ] Choose what testing libraries you want to use for unit and E2E
  * [ ] Write some FUCKING UNIT TESTS
  * [ ] Write some FUCKING E2E TESTS
* [x] Refactor loading routes into one return statement
* [ ] Create useLocalStorage custom hook