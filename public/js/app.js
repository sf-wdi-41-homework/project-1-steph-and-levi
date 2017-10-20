
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

        $.post('/api/ideas', formData, function(idea) {
            console.log(idea)
            renderIdea(idea);
        })

        // reset form input values after formData has been captured
        $(this).trigger("reset");
    });

    $('.ideaSpace').on('click', '.edit', handleIdeaEditClick);
    $('.ideaSpace').on('click', '.save-idea', handleIdeaSaveClick);


    $(".ideaSpace").on('click', ".delete", function(e) {
        var result = confirm("Want to delete?");
        if (result) {

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
        }
    })
    var likes = 0;
    var liked = false;
    $('.ideaSpace').on('click', '.like', function() {
        if (!liked) {
            likes++;
            $(this).closest('.like').text("Likes " + likes)
            liked = true;
        } else {
            likes--;
            $(this).closest('.like').text("Likes " + likes)
            liked = false;
        }

    })
});

//edit post
function handleIdeaEditClick(ideaUpdate) {
    console.log("you clicked edit!")
    console.log(this)
    var $idea = $(this).closest('#fun-facts')
    var $ideaId = $idea.data('idea-id')
    console.log($ideaId)
        //display save-idea and cancel-edit buttons
    $idea.find(".save-idea").toggleClass('hidden');
    $idea.find('.cancel-edit').toggleClass('hidden');
    //hide edit, like and delete buttons
    $idea.find('.edit').toggleClass('hidden');
    $idea.find('.like').toggleClass('hidden');
    $idea.find('.delete').toggleClass('hidden');
    // get idea title and replace its field with an input element
    var ideaTitle = $idea.find(".title").text();
    console.log(ideaTitle)
    $idea.find('p.title').html('<input class="edit-idea-title" value="' + ideaTitle + '"></input>');
    //get idea description and replace its field with an input element
    var ideaDesc = $idea.find('.description').text();
    $idea.find('p.description').html('<textarea class="edit-idea-description" cols="30" rows="5" value="' + ideaDesc + '"></textarea>');
}

// Takes new post and sends it to handleIdeaUpdateResponse
function handleIdeaSaveClick() {
    var $idea = $(this).closest('#fun-facts')
        // console.log(this).closest('#fun-facts').data('idea-id');
    var ideaId = $($idea).data('idea-id');
    var $idea = $('[data-idea-id=' + ideaId + ']');

    var data = {
        title: $idea.find('.edit-idea-title').val(),
        description: $idea.find('.edit-idea-description').val(),
    };



    $.ajax({
        method: 'PUT',
        url: '/api/ideas/' + ideaId,
        data: data,
        success: handleIdeaUpdatedResponse
    });
}



function handleIdeaUpdatedResponse(data) {
    console.log('response to update', data);

    var ideaId = data._id;

    // remove this album from the page, re-draw with updated data
    $('[data-idea-id=' + ideaId + ']').remove();
    renderIdea(data);
}

//displays the post that was entered into the form
function renderIdea(ideaData) {
    console.log(ideaData)
    $(".ideaSpace").prepend(`
        <div class="container ideabox" data-idea-id=${ideaData._id}>
              <div class="service-item first-item" >
                  <div class="icon"></div>
                  <div id="fun-facts" data-idea-id=${ideaData._id}>
                          <div id="idea">
                         <h4>Name:</h4>
                          <p class="title">${ideaData.title}</p>
                          <h4>Description:</h4>
                          <p class="description">${ideaData.description}</p>
                          <button type="button" class="btn btn-primary like">Like</button>
                          <button type="button" class="btn btn-info edit">Edit Post</button>
                          <button type="button" class="btn delete">Delete</button>
                          <button type="button" class='btn btn-info save-idea hidden'>Save Changes</button>
                          <button type="button" class='btn btn-danger cancel-edit hidden'>Cancel</button>

                      </div>
                  </div>
              </div>
          </div>
    </div>`);

    $('.cancel-edit').on('click', function() {
        document.location.reload(true);
        $('.ideabox').remove();

        $(".ideaSpace").prepend(`
          <div class="container ideabox" data-idea-id=${ideaData._id}>
                <div class="service-item first-item" >
                    <div class="icon"></div>
                    <div id="fun-facts" data-idea-id=${ideaData._id}>
                            <div id="idea">
                           <h4>Name:</h4>
                            <p class="title">${ideaData.title}</p>
                            <h4>Description:</h4>
                            <p class="description">${ideaData.description}</p>
                            <button type="button" class="btn btn-primary like">Like</button>
                            <button type="button" class="btn btn-info edit">Edit Post</button>
                            <button type="button" class="btn delete">Delete</button>
                            <button type="button" class='btn btn-info save-idea hidden'>Save Changes</button>
                            <button type="button" class='btn btn-danger cancel-edit hidden'>Cancel</button>
                          </div>
                    </div>
                </div>
            </div>
      </div>`);

    })
}




function onSuccess(json) {
    console.log(json);
    json.forEach(function(ideas) {
        renderIdea(ideas)
    })
}

function onError(xhr, status, errorThrown) {
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}
