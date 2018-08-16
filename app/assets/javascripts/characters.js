 /* global $ jQuery */

$(document).ready(function(){
    console.log('Character Controller Page');
    attachListeners();
});

// Attach event listeners
function attachListeners() {
    console.log('Add click listeners');
    
    // Add button event listeners
    $("#previous-char").click(previousButtonClick);
    $("#next-char").click(nextButtonClick);
    $("button").click(buttonTestClick);
};

// Temp button info to get "what was clicked"
function buttonTestClick(){
    console.log('Button clicked');
    console.log('Current data = ', this);
    const id = $(this).data("id");
    const showId = $(this).data("show_id");
    console.log(`Character id : ${id} | Show id : ${showId}`);
};

// Shuffle between characters in show -- Get previous character (when applicable)
function previousButtonClick(){
    console.log('Render Previous Character Page');
};

// Shuffle between characters in show -- Get next character (when applicable)
function nextButtonClick(){
    console.log('Render Next Character Page');
    
    // Check if next is possible (otherwise alert)
    
    // Get id of next character and current show id
    const nextId = parseInt($(this).data("id")) + 1;
    const showId = $(this).data("show_id");
    
    $.getJSON("/characters/" + nextId, function(data) {
        console.log('Next Character Data = ', data);
    
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
        console.log('Delete div = ', $(".char-delete"));
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
