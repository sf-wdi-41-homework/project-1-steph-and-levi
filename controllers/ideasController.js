var db = require('../models')

//get all ideas
function index(req, res){
  console.log('in api/ideas route function')
  db.Idea.find({}, function(err, allIdeas){
    if(err){ console.log('there was an error getting ideas', err); }
    res.json(allIdeas)
  })
}

// create an idea
function create(req, res){
  var inputIdea = req.body;
  db.Idea.create(inputIdea, function(err, idea){
    if(err) {console.log('error', err);}
    res.json(idea)
  })
}

//update an idea
function update(req, res){
  db.Idea.findById(req.params.id, function(err, foundIdea){
    if(err) { console.log('error updating idea', err); }
    foundIdea.title = req.body.title;
    foundIdea.description = req.body.description;
    foundIdea.save(function(err, savedIdea){
      if(err) { console.log("error saving idea", err); }
      res.json(savedIdea);
    })
  })
}

//delete an idea
function destroy(req, res){
  console.log('want to delete an idea!')
  db.Idea.findByIdAndRemove(req.params.id, function(err, deletedIdea){
    if(err) {console.log('error deleting idea', err);}
    res.json(deletedIdea)
  })
}

module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy
}