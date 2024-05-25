# My Cutting Board App

* User scans the NFC tag on their cutting board
* They are brought to a page with information on their board
  * Image(s)
  * List and description of woods used
  * Link to YT video of it's creation
  * Contact link for RILW

* If they go directly to the web page they are prompted to enter their board's ID

* For now this will all just be publicly available endpoints

## TODO

* [x] Add logic for signing in, up, and out
  * [x] Sign in with Google
  * [x] Sign up with Google
  * [x] Sign out
  * [x] Move user info and logged in state to context with custom hook
  * [ ] Refactor to make sure signing in or up work correctly and subapp info is sent to backend
* [] ADMIN PAGE
  * For now I'm just manually uploading to S3 and adding entries via console or Postman.
  * [] Feature for adding new boards and coasters with their images
  * [] Feature for deleting boards and coasters
  * [] Feature for editing boards and coasters
    * [] Board/coaster images
    * [] Board/coaster videos
    * [] Board/coaster description and other information 
* [] Need to eventually deal with proper image sizing and aspect ratio
* [] Add feature to load low-quality, blurry image first while main image is loading for nicer effect
* [] Add more boards!!
* [x] Update styling to fix issue with centered information not allowing user to scroll
* [x] Add Navigation Bar
* [ ] User Settings Page
  * [ ] Save theme and override app theme
    * [ ] Custom themes beyond light and dark  
  * [ ]  ???
  * [ ]  ???
  * [ ]  ???
* [x] Light/Dark Theme
  * [x] Move theme to context with custom hook  
* [ ] Add Loading Spinner
  * [ ] On initial load
  * [ ] On sign in
  * [ ] On loading of random drink info
  * [ ] On loading images
  * [ ] On loading videos
  * [ ] On NotFound component while it redirects to home
* [ ] Add a Requests class to handle all requests
  * [ ] Possibly create a custom library that works with all subapps of the NestJS Mega Backend?
* [ ] Figure out how to allow a logged in user register the products they own
* [ ] 
