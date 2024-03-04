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

* Add logic for signing in, up, and out
* Need admin page where I can enter a new board and it's information, as well as upload images.
  * For now I'm just manually uploading to S3 and adding entries via console or Postman.

* Need to eventually deal with proper image sizing and aspect ratio
* Add feature to load low-quality, blurry image first while main image is loading for nicer effect
* Add more boards!!
