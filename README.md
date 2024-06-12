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

### New Features 6/011/2024
* Admin can now add a new product and select an image from their device
  * No validation set up form fields yet
  * Image size validation is not working
* Admin can now delete a product
  * Deleting brings up confirmation dialog
  * This permanently deletes the product from the database
  * This does NOT delete the image from S3
* Admin product list items now show title and description on screens over 600px wide
  * Only title is shown on smaller screens

### New Features 6/04/2024
* Admin page is now available to logged-in users with the admin role
  * Admins can view, add, and delete products
  * Edit icon is not operational yet
* Logged in users have pages for settings, my products, and a home page
  * None of these have any features beyond a header yet
* Light/Dark mode is now available in the menu
  * This persists across page refreshes regardless of login status

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

### UI/UX
* [ ] Change all alerts to toasts
  * [ ] Decide where on screen to pop up - center or bottom makes sense
  * [ ] Allow click or tap anywhere to close
  * [ ] Account for the confirm when deleting a product
* [x] Add a Layout component to wrap all others
  * [x] NavDrawer will only need to be imported ONCE if used here
  * [x] Main <Box /> will contain all other components and only needs to add styling ONCE
    * [x] Repeated styling can be removed from all main components after this is complete
* [ ] Change favicon
* [x] Refactor home page
  * [x] Refactored backend to put all products in one table
* [x] Add border radius and themed border to ALL 4 sides of Google user image
* [x] Refactor BoardDataShow with <Divider /> instead of <hr />
* [ ] Allow a logged in user to view the products they own
* [ ] ADMIN PAGE
  * [x] Add new boards and coasters with their images
    * [x] UPDATE this to allow uploading an image 
    * [ ] UPDATE this to allow for taking a picture right from the device
  * [ ] View all users
  * [ ] Add person icon to the icon cluster on each product
    * [ ] This will allow an admin to search/select assign a product to a user.
    * [ ] One product can be assigned to multiple users
  * [ ] Feature for editing a user's role
  * [ ] Admin user can view a product by clicking on it (show page)
    * [ ] Admin can assign a product to a user from this "show page"
  * [x] Delete boards and coasters
  * [ ] Edit existing boards and coasters
    * [ ] Board/coaster images
    * [ ] Board/coaster description and other information
  * [ ] Feature for CSV upload for bulk additions
* [ ] User Settings Page
  * [ ] Save theme / override guest theme
    * [ ] Custom themes beyond light and dark
* [ ] Add Loading Spinner or Skeleton
  * [ ] On initial load
  * [ ] On sign in
  * [ ] On loading of random drink info
  * [ ] On loading images
  * [ ] On NotFound component while it redirects to home
  * [x] On adding new product
* [x] Navigation Bar
  * [x] Move Google login to guest nav bar
  * [x] Add Admin link for users with admin role
  * [x] Add Google user's image
  * [x] Add Welcome message with user's name 
* [x] Light/Dark Theme
  * [x] Move theme to context with custom hook  

### Performance
* [ ] Uploaded images are automatically shrinked to 5mb or less
* [ ] Use Skeleton component while images are loading
  * [x] admin product list
  * [ ] admin product show (this component doesn't exist yet)
  * [ ] user product show

### Backend Changes
* [ ] Add more boards to the database
  * [ ] Maybe wait for Admin page to be created to make this easier
* [ ] Change product IDs to UUIDs instead of numbers
  * [ ] Update frontend to handle UUIDs
* [ ] CLI ???  Maybe ???

### Bug Fixes
* [x] Update styling to fix issue with centered information not allowing user to scroll
* [ ] Going directly to ```/boards/:id``` or ```/coasters/:id``` redirects the user to ```/```
* [ ] NotFound always redirects to ```/```
  * [ ] Update to redirect to the LAST page in history
  * [ ] Update all logic that handles state with board or coaster
* [x] Error on adding new product in prod
  * [x] Update error message on backend
  * [x] ID sequence was off by 1
  * [x] Ran query to update the sequence to the correct next value
    * [x] SELECT pg_get_serial_sequence('table_name', 'id'); 
    * [x] SELECT setval('name_of_sequence', (SELECT MAX(id) FROM table_name) + 1);
* [ ] If refresh token request fails user is stuck in a loading state until they manually refresh

### Misc
* [ ] Add a Requests class to handle all requests
  * [x] GET
  * [x] POST
  * [ ] PUT / PATCH
  * [x] DELETE
  * [x] getBackendUrl()
  * [x] refreshTokens()
  * [ ] add logic to handle external AND internal API requests
  * [ ] Possibly create a custom library that works with all subapps of the NestJS Mega Backend ???
  * [ ] Try to figure out the original logic behind running refresh on GET error
    * [ ] Refactor to something that makes sense and is repeatable
* [ ] Choose what testing libraries you want to use for unit and E2E
  * [ ] Write some FUCKING UNIT TESTS
  * [ ] Write some FUCKING E2E TESTS
* [x] Refactor loading routes into one return statement
* [ ] Create useLocalStorage custom hook