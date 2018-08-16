 /* global $ jQuery */
 
 let characterList;

$(document).ready(function(){
    console.log('Character Controller Page');

    // Reset variables/interactables on page load
    characterList = [];
    $(".show-characters").empty();
    // document.getElementById("show-char-index-button").style.display = "block";

    // Attach Event Listeners
    attachListeners();
});

// Attach event listeners
function attachListeners() {
    console.log('Add click listeners');
    
    // Add button event listeners
    $(".char-show-page").click(prevNextbuttonClick);
    $(".char-index-page").click(showCharacterIndex);
};

/* *** CHARACTER INDEX PAGE FUNCTIONALITY *** */

function showCharacterIndex(){
    console.log("Show index of show's characters");

    // Set (or 'clear') variables for current instance of function
    const id = $(this).data("id");

    // Get list of characters in Show to check if next or previous is possible (otherwise alert)
     $.getJSON("/shows/" + id, function(data) {
         console.log('Show data = ', data);
         
         // Hide the button once used
        //  document.getElementById("show-char-index-button").style.display = "none";
    $(".show-characters").empty();

        // Append data to page
         data["characters"].forEach(function( char ) {
            console.log("char = ", char);
            const charData = `
                <li>Name : <a href="/characters/${char["id"]}">${char["name"]}</a></li>
                <ul> 
                  <li>Role : ${char["role"]}</li>
                  <li>Description : ${char["description"]}</li>
                  <li><a href="/shows/${data["id"]}/characters/${char["id"]}/edit">Edit</a></li>
                </ul>
                `;
            
            $(".show-characters").append(charData);
        });
     });
};



/* *** CHARACTER SHOW PAGE FUNCTIONALITY *** */

// Main Button Click Function for the Character Show Page
function prevNextbuttonClick(){
    // console.log('Clicked button : ', event.target.id);
    
    // Set (or 'clear') variables for current instance of function
    const id = $(this).data("id");
    const showId = $(this).data("show_id");
    const clickedButton = event.target.id;
    const charData = this;
    characterList.length = 0;
    
    // Get list of characters in Show to check if next or previous is possible (otherwise alert)
     $.getJSON("/shows/" + showId, function(data) {
        //  console.log('Show data = ', data);
         data["characters"].forEach(function( char ) {
            // console.log("char = ", char);
            characterList.push(char.id);
        });
     }).done(function() {
        // console.log("character list = ", characterList)
        const charIndex = characterList.indexOf(id);
        // console.log('Id is in index position : ', characterList.indexOf(id), ' | Length = ', characterList.length, ' | CharIndex = ', charIndex);

        // Check if next or previous is possible (otherwise alert)
        if (characterList.includes(id)) {
            // console.log('Allow click - ', clickedButton);
            // Call the correct button functionality
            if (clickedButton === 'previous-char') {
                if (charIndex === 0) {
                    alert('There are no more characters to display in this direction.');
                    return;
                } else {
                    previousButtonClick(charData);
                };
            } else if (clickedButton === 'next-char') {
                if (charIndex === characterList.length - 1) {
                    alert('There are no more characters to display in this direction.');
                    return;
                } else {
                    nextButtonClick(charData);
                };
            };
        };
    });
};

// Shuffle between characters in show -- Get previous character (when applicable)
function previousButtonClick(buttonInfo){
    // console.log('Render Previous Character Page');

    // Get id of next character and current show id
    const previousId = parseInt($(buttonInfo).data("id")) - 1;
    const showId = $(buttonInfo).data("show_id");
    
    // Get Character JSON Data and Replace in Character Show View
    getReplaceCharacterData(previousId);
};

// Shuffle between characters in show -- Get next character (when applicable)
function nextButtonClick(buttonInfo){
    // console.log('Render Next Character Page');
    
    // Get id of next character and current show id
    const nextId = parseInt($(buttonInfo).data("id")) + 1;
    const showId = $(buttonInfo).data("show_id");
    
    // Get Character JSON Data and Replace in Character Show View
    getReplaceCharacterData(nextId);
};

// Get Character JSON Data and Replace in Character Show View -- ***** WIP delete div issue
function getReplaceCharacterData(id) {
    $.getJSON("/characters/" + id, function(data) {
        // console.log('Next Character Data = ', data);
    
        // Replace the current character data -- Basic text replacements
        $(".char-header").text(data["name"]);
        $(".char-name").text(data["name"]);
        $(".char-role").text(data["role"]);
        $(".char-description").text(data["description"]);
        $(".char-last-updated").text(data["last-updated"]);
        $(".char-page-views").text(data["char_page_views"]);
        
        // Replace the current character data -- Functionality replacements requiring different handling
        $(".char-show").empty();
        $(".char-edit").empty();
        $(".char-delete").empty();
        // console.log('Delete div = ', $(".char-delete")); // ****** WIP duplicated for some reason
        const charShowLink = `<a href="/shows/${data["show"]["id"]}">${data["show"]["name"]}</a>`;
        const charEditLink = `<a href="/shows/${data["show"]["id"]}/characters/${data["id"]}/edit">Edit Character</a>`;
        const charDeleteLink = `<form action="/characters/${data["id"]}" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="_method" value="delete"><input type="hidden" name="authenticity_token" value="7V3GIg3BguJ2/bRRNJQfQw2HUwm4tU+YJoe1a6kYoLS1rZdhrigk6TUA9EaD9OHloH4bliT7wjfblyplknDnqQ==">
            <input type="submit" name="commit" value="Delete Character">
            </form>`;
        $(".char-show").append(charShowLink);
        $(".char-edit").append(charEditLink);
        $(".char-delete").append(charDeleteLink);
        
        // Reset the button submittable ids
        $("#previous-char").data("id", data["id"]);
        $("#next-char").data("id", data["id"]);
    });
    
};