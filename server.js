var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//set-up user auth
var passport       = require('passport');
var flash          = require('connect-flash');
var ejsLayouts     = require("express-ejs-layouts");
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var methodOverride = require('method-override');



// Setup middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
// use express.session() before passport.session() to ensure that the login session is restored in the correct order
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
// passport.initialize() middleware is required to initialize Passport.
app.use(passport.initialize());
// If your application uses persistent login sessions, passport.session()
app.use(passport.session());
app.use(flash());
app.use(methodOverride(function(request, response) {
  if(request.body && typeof request.body === 'object' && '_method' in request.body) {
    var method = request.body._method;
    delete request.body._method;
    return method;
  }
}));





// HTML endpoints
// app.get('/', function(req, res){
//   res.sendFile('views/index.html' , { root : __dirname});
// })




// app.get('/loggedin', function(req, res){
//   res.sendFile('views/loggedin.html', { root : __dirname});
// })

var db = require('./models')
//TODO: JSON api endpoints
//view all IDEAS from the db on an api route
app.get('/api/ideas', function(req, res){
  console.log('in api/ideas route function')
  db.Idea.find({}, function(err, allIdeas){
    if(err){ console.log('there was an error getting ideas', err); }
    res.json(allIdeas)
  })
});

//Get an idea
app.get('/api/ideas/:id', function(req, res){
  console.log('in api/ideas/:id route function')
  var index = req.params.id;
  var selection = ideasArray[index] || 'sorry, idea not found'
  res.send(selection)
})

//Create an idea
app.post('/loggedin', function(req, res){
  var inputIdea = req.body;
  db.Idea.create(inputIdea, function(err, idea){
    if(err) {console.log('error', err);}
    res.json(idea)
  })
})

//Update an idea
app.put('/api/ideas/:id', function(req, res){
  db.Idea.findById(req.params.id, function(err, foundIdea){
    if(err) { console.log('error updating idea', err); }
    foundIdea.title = req.body.title;
    foundIdea.description = req.body.description;
    foundIdea.save(function(err, savedIdea){
      if(err) { console.log("error saving idea", err); }
      res.json(savedIdea);
    })

  })
})
//Delete an idea
app.delete('/api/ideas/:id', function(req, res){
  console.log('want to delete an idea!')
  db.Idea.findByIdAndRemove(req.params.id, function(err, deletedIdea){
    if(err) {console.log('error deleting idea', err);}
    res.json(deletedIdea)
  })
})
// Express settings
app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

require('./config/passport')(passport);

app.use(function(req, res, next){
  global.currentUser = req.user;
  next();
});

var routes = require(__dirname + "/config/routes");
app.use(routes);


// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('Server running on http://localhost:3000');
});
