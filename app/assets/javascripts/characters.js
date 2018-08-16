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
};

// Shuffle between characters in show -- Get previous character (when applicable)
function previousButtonClick(){
    console.log('Render Previous Character Page');
};

// Shuffle between characters in show -- Get next character (when applicable)
function nextButtonClick(){
    console.log('Render Next Character Page');
};