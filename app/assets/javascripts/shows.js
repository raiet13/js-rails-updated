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
    $.post('/shows', values).done(function(data) {
        console.log(data);
        const show = data;
        show.info = function() {
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
        
        // const newShow = `
        //     <li><a href="shows/${show["id"]}">${show["name"]}</a></li>
        //     <ol>
        //       <li>Has ${show["name"]["characters"].length} characters.</li>
        //       <li>Age requirement is ${show["req_age"]}.</li>
        //       <li>Takes ${show["req_recording_hours"]} recording hours.</li>
        //       <li>You are currently not recording this show.
        //       </li>
        //     </ol>
        //     `;
        
        $('#all-shows').append(show.info);
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

