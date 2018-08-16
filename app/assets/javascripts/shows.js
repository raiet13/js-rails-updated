 /* global $ jQuery */

$(document).ready(function(){
    console.log('Show Controller Page');

    // Attach Event Listeners
    attachListeners();

});

// Attach event listeners
function attachListeners() {
    console.log('Add click listeners');
    
    // Form Event Listener
    $('form').addEventListener("submit", formSubmit);

};

// Create new show without page refresh
function formSubmit(event) {
    console.log('New Show Submit');
    
    // Prevent form from submitting the default way
    event.preventDefault();
    
    const values = $(this).serialize();
    const createShow = $.post('/shows', values);
    
    createShow.done(function(data) {
        console.log(data);
        const newShow = `
            <li><a href="shows/${data["id"]}">${data["name"]}</a></li>
            <ol>
              <li>Has ${data["name"]["characters"].length} characters.</li>
              <li>Age requirement is ${data["req_age"]}.</li>
              <li>Takes ${data["req_recording_hours"]} recording hours.</li>
              <li>You are currently not recording this show.
              </li>
            </ol>
            `;
        $('#all-shows').append(newShow);
    });
};

// Get list of shows and propogate index page with them
function getShows(){
    console.log("Get Shows");

    // Empty div for get response
    $('#all-shows').empty();
    $.get( "/shows.json", function( shows ) {
        const showList = shows.data;
        console.log('Show data : ', showList);

        // showList.forEach(function(show) {
        //     let showData = `<ul id="show-${show.id}">
        //         <li><%= link_to ${show.name}, show_path(${show.id}) %></li>
        //         <ol>
        //           <li>Has <%= ${show.characters.count} %> characters.</li>
        //           <li>Age requirement is <%= ${show.req_age} %>.</li>
        //           <li>Takes <%= ${show.req_recording_hours} %> recording hours.</li>
        //           <li>You are currently 
        //             <% if !current_user.user_recording_show(show) %> not <% end %>
        //             recording this show.
        //           </li>
        //         </ol>
        //     </ul>`;
        //     $("#all-shows").append( showData );
        // });
    });
};

