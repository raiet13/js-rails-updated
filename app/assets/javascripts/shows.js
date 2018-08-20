 /* global $ jQuery */
 
 let showChar = false;

$(document).ready(function(){
    console.log('Show Controller Page');

    // Set variables and reset state
    showChar = false;

    // Attach Event Listeners
    attachListeners();

});

// Attach event listeners
function attachListeners() {
    console.log('Add click listeners');
    
    // Form Event Listener
    $('form').submit(formSubmit);
    $('.show-page-char-click').click(getCharacters);

};

// Create new show without page refresh
function formSubmit(event) {
    console.log('New Show Submit');

    // Prevent form from submitting the default way
    event.preventDefault();
    
    const values = $(this).serialize();
    $.post('/shows', values).done(function(data) {
        console.log(data);
        const show = data;
        show.info = function() {
            return `
            <li><a href="shows/${show.id}">${show.name}</a></li>
            <ol>
              <li>Has ${show.characters.length} characters.</li>
              <li>Age requirement is ${show.req_age}.</li>
              <li>Takes ${show.req_recording_hours} recording hours.</li>
              <li>You are currently not recording this show.
              </li>
            </ol>
            `;
        };
        
        $('#all-shows').append(show.info());
    });
};

// Get show characters
function getCharacters(){
    console.log("Get characters");
    
    // Get id and Empty div for get response
    const id = $(this).data("id");
    $('#show-characters').empty();
    if (showChar === true) {
      return showChar = false;  
    } else {
        $.getJSON( "/shows/" + id, function( data ) {
            console.log('Show data : ', data);
            const characters = data["characters"];
    
            characters.forEach(function(char) {
                const listItem = `<li><a href="/characters/${char.id}">${char.name}</a></li>`;
                $("#show-characters").append(listItem);
            });
        }).done(function(){
            return showChar = true;
        });
    };
};

