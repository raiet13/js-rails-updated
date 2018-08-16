- Main Notes - 

Source for Assessment
    https://github.com/raiet13/rails-js-assessment-v-000
    
Original Rails App/Project
    https://github.com/raiet13/rails-tvshow_recordings/tree/c9-init
    https://ide.c9.io/confizzed13/rails_test_example


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

- Main Commands For Project Testing -

- If "Run" button not working -- Run Server -> "rails s -b $IP -p $PORT"



- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

- Next Steps - 

- Use jQuery/ajax for TV show/characters
    -> Show Page with "next" (cycle through all shows)
    -> Index Page -> Automatically render all characters from show && click button to show all active user recordings on user profile
    -> "has_many" == use the TV shows to render new characters without a redirect
        -> Show the characters in a Show AND render new characters w/o redirect

- For complexity's sake in terms of views, updating above
    -> Create new Characters on the show character index page without refresh (shows/:show_id/characters)
    -> Click "See all of show's character information" link/button on Show Page and render all characters there
        https://learn.co/tracks/full-stack-web-development-v6/rails-and-javascript/using-ajax-and-rails/video-review-loading-comments-via-get-ajax

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

- Nice to Haves - 

- Log In or Sign Up with Google --> Add sign in with Google (check login or sign up page and use/keep password?)

- Character Show Page 
-> Delete button on "next" not removing original form for some reason, not sure why -- check in/ask reviewer about it (moving on as it isn't directly part of the spec requirements and is taking a while to deal with)
-> Next/Previous able to handle randomly removed characters (will need to reconfigure the functions to remove the previous/next and handle all logic in the button click)

- Character Index Page
    -> Button only works one time... Not sure why that is... -- moving on for now



- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
