 /* global $ jQuery */

$(document).ready(function(){
    console.log('Show Index Page');

    // Automatically display shows
    // getShows();
    
    // Attach Event Listeners
    

});


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

