var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// add the body-parser middleware to the server
app.use(bodyParser.urlencoded({ extended: true }));

// serve the public directory as a static file directory
app.use(express.static('public'));

//require the models directory in server.js
// var db = require('./models');
var ideasArray = [
  {
    title: 'pie delivery service',
    description: 'pie on command! Have a fresh pie delivered to your door within 2hrs.'
  },
  {
    title: 'hydration app',
    description: 'an app that syncs with your google calendar and reminds you to drink your daily water requirement'
  },
  {
    title: 'give me the science',
    description: 'an app that fundraises for access to publicly-funded scientific journals and sends you 3 articles weekly'
  }
]

//HTML endpoints
app.get('/', function(req, res){
  res.sendFile('views/index.html' , { root : __dirname});
})
//TODO: JSON api endpoints

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});