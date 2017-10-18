$(document).ready(function() {
    console.log('app.js loaded!');


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
    $("#idea").prepend(`<p>${ideaData.title}</p>`)
}
function onSuccess(json) {
    console.log(json);
    for (i = 0; i < json.length; i++) {
        $("#idea").append(`<p>${json[i].title}</p>`);
    }
}

function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}