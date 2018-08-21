 /* global $ jQuery */
 
let showChar = false;

$(document).ready(function (){
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
    $('#sort-shows').click(getShowListAndSort);
};

// Get show list and sort function
function getShowListAndSort(event) {
    console.log('get show list and sort shows');
    
    // Empty the show div
    $('#all-shows').empty();
    let sortedShows;
    
    // Get the show list, sort it, then render it to the DOM
    $.getJSON( "/shows/", function( data ) {
        console.log('Shows : ', data);
        sortedShows = data.sort(function(a, b){return a.name.toLowerCase() > b.name.toLowerCase()});
    }).done(function(data){
        console.log('sort shows here')
        console.log(sortedShows)
        data.forEach((show) => {$('#all-shows').append(displayShow(show));})
    });
}

// Return proper show index view
function displayShow(show) {
    return `
    <li>${show.name}</li>
    <ol>
      <li>Has ${show.characters.count} characters.</li>
      <li>Age requirement is ${show.req_age}.</li>
      <li>Takes ${show.req_recording_hours} recording hours.</li>
      <li>You are currently not recording this show.</li>
    </ol>
    `
}

// Create new show without page refresh
function formSubmit(event) {
    console.log('New Show Submit');

    // Prevent form from submitting the default way
    event.preventDefault();
    
    const values = $(this).serialize();
    $.post('/shows', values).done(function(data) {
        console.log(data);
        
        // Create new js model show object
        const show = new Show(data);
        
        $('#all-shows').append(show.info());
    });
};

// Create new show (outside of the class syntax)
function Show(data) {
    this.id = data.id;
    this.name = data.name;
    this.req_recording_hours = data.req_recording_hours;
    this.req_age = data.req_age;
    this.description = data.description;
    this.show_page_views = data.show_page_views;
    this.characters = data.characters;
}

// Show js model object new method -- Use Prototype to prevent redefining function for each object
Show.prototype.info = function () {
    return `
    <li><a href="shows/${this.id}">${this.name}</a></li>
    <ol>
      <li>Has ${this.characters.length} characters.</li>
      <li>Age requirement is ${this.req_age}.</li>
      <li>Takes ${this.req_recording_hours} recording hours.</li>
      <li>You are currently not recording this show.
      </li>
    </ol>
    `;
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

