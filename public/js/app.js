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
          console.log('I am in app.js $.post')
          console.log(idea)
          renderIdea(idea);
        })

        // reset form input values after formData has been captured
        $(this).trigger("reset");
    });
});
function renderIdea(ideaData){
    console.log(ideaData.title)
    $(".ideaSpace").prepend(`
        <div class="container">
              <div class="service-item first-item">
                  <div class="icon"></div>
                  <div id="fun-facts">
                          <div id="idea">
                          <h4>Name:</h4>
                          <p id="singleIdea">${ideaData.title}</p>
                          <h4>Description:</h4>
                          <p id="singleIdea">${ideaData.description}</p>
                          </div>
                  </div>
              </div>
          </div>

    </div>`)
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
