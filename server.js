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

// Require the models directory in server.js
var db = require('./models')
var controllers = require('./controllers')
//ROUTES

//JSON api endpoints

//view all IDEAS from the db on an api route
app.get('/api/ideas', controllers.ideas.index);

//Create an idea
app.post('/api/ideas', controllers.ideas.create);

//Update an idea
app.put('/api/ideas/:id', controllers.ideas.update);

//Delete an idea
app.delete('/api/ideas/:id', controllers.ideas.destroy)

//Get an idea: using only sample data right now
app.get('/api/ideas/:id', function(req, res){
  console.log('in api/ideas/:id route function')
  var index = req.params.id;
  var selection = ideasArray[index] || 'sorry, idea not found'
  res.send(selection)
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
