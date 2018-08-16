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
    
        // Replace the current character data
        // $(".authorName").text(data["author"]["name"]);
        // $(".postTitle").text(data["title"]);
        // $(".postBody").text(data["description"]);
        
        // // Reset the button submittable ids
        // $("#previous-char").attr("data-id", data["id"]);
        // $("#next-char").attr("data-id", data["id"]);
    });

};
