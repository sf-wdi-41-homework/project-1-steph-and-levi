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
// add the body-parser middleware to the server
app.use(bodyParser.urlencoded({ extended: true }));
// Setup middleware
app.use(morgan('dev'));
app.use(cookieParser());
// app.use(bodyParser());
app.use(ejsLayouts);
// app.use(express.static(__dirname + '/public'));
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

// serve the public directory as a static file directory
app.use(express.static('public'));

// require the models directory in server.js
var db = require('./models');

//express settings
app.set('view engine', 'ejs');
//hardcoded data for playing with
var ideasArray = [
  {
    title: 'pie delivery service',
    description: 'pie on command! Have a fresh pie delivered to your door within 2hrs.',
    id: 1
  },
  {
    title: 'hydration app',
    description: 'an app that syncs with your google calendar and reminds you to drink your daily water requirement',
    id: 2
  },
  {
    title: 'give me the science',
    description: 'an app that fundraises for access to publicly-funded scientific journals and sends you 3 articles weekly',
    id: 3
  }
]

//HTML endpoints
app.get('/', function(req, res){
  res.sendFile('views/index.html' , { root : __dirname});
})

app.get('/login', function(req, res){
  res.sendFile('views/login.html' , { root : __dirname});
})

app.get('/sign-up', function(req, res){
  res.sendFile('views/sign-up.html' , { root : __dirname});
})

app.get('/loggedin', function(req, res){
  res.sendFile('views/loggedin.html', { root : __dirname});
})

//TODO: JSON api endpoints
//view all IDEAS from the db on an api route
app.get('/api/ideas', function(req, res){
  console.log('in api/ideas route function')
  db.Idea.find({}, function(err, allIdeas){
    if(err){ console.log('there was an error getting ideas', err); }
    res.json(allIdeas)
  })
});

app.get('/api/ideas/:id', function(req, res){
  console.log('in api/ideas/:id route function')
  var index = req.params.id;
  var selection = ideasArray[index] || 'sorry, idea not found'
  res.send(selection)
})

app.get('/loggedin', function(req, res){
  //get all db seed ideas and render to loggedin page
  db.Idea.find({}, function(err, allIdeas){
    res.json(allIdeas)
  })
})

app.post('/loggedin', function(req, res){
  var inputIdea = req.body;
  db.Idea.create(inputIdea, function(err, idea){
    if(err) {console.log('error', err);}
    res.json(inputIdea)
  })
})

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
