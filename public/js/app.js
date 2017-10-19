$(document).ready(function() {
    console.log('app.js loaded!');

    //get all db seed ideas and render to loggedin page
      $.ajax({
          method: 'GET',
          url: '/api/ideas',
          success: onSuccess,
          error: onError
      });

    $('.idea-form').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        console.log(formData)

        $.post('/loggedin', formData, function(idea) {
          console.log(idea)
          renderIdea(idea);
        })

        // reset form input values after formData has been captured
        $(this).trigger("reset");
    });

    $(".ideaSpace").on('click', ".delete", function(e){
      console.log("you clicked delete");
      var id = $(this).closest('#fun-facts').data('idea-id');
      console.log('id', id);

      $.ajax({
          url: '/api/ideas/' + id,
          type: 'DELETE',
          success: function(result) {
            $('[data-idea-id=' + id + ']').remove();
          }
      })
    })
    var likes = 0;
    var liked = false;

    $('.ideaSpace').on('click','.like', function(){
      if(!liked){
        likes ++;
        $(this).closest('.like').text(likes + " likes")
        liked = true;
      } else {
        likes --;
        $(this).closest('.like').text(likes + " likes")
        liked = false;
      }

    })
});



function renderIdea(ideaData){
    console.log(ideaData)
    $(".ideaSpace").prepend(`
        <div class="container ideabox" data-idea-id=${ideaData._id}>
              <div class="service-item first-item" >
                  <div class="icon"></div>
                  <div id="fun-facts" data-idea-id=${ideaData._id}>
                          <div id="idea">
                         <h4>Name:</h4>
                          <p id="singleIdea">${ideaData.title}</p>
                          <h4>Description:</h4>
                          <p id="singleIdea">${ideaData.description}</p>
                          <button type="button" class="btn button like">Like</button>
                          <button type="button" class="btn button delete">Delete</button>

                          </div>
                  </div>
              </div>
          </div>
    </div>`);

}
function onSuccess(json) {
    console.log(json);
    json.forEach(function(ideas){
      renderIdea(ideas)
    })
}

function onError(xhr, status, errorThrown) {
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}
