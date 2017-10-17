var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// add the body-parser middleware to the server
app.use(bodyParser.urlencoded({ extended: true }));

// serve the public directory as a static file directory
app.use(express.static('public'));

//require the models directory in server.js
// var db = require('./models');


//HTML endpoints
app.get('/', function(req, res){
  res.sendFile('views/index.html' , { root : __dirname});
})

app.get('/login.html', function(req, res){
  res.sendFile('views/login.html' , { root : __dirname});
})

app.get('/sign-up.html', function(req, res){
  res.sendFile('views/sign-up.html' , { root : __dirname});
})

//TODO: JSON api endpoints

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
