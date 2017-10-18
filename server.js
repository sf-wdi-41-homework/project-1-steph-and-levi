var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// add the body-parser middleware to the server
app.use(bodyParser.urlencoded({ extended: true }));

// serve the public directory as a static file directory
app.use(express.static('public'));

// require the models directory in server.js
var db = require('./models');

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

app.get('/api/ideas', function(req, res){
  console.log('in api/ideas route function')
  res.send(ideasArray)
});

app.get('/api/ideas/:id', function(req, res){
  console.log('in api/ideas/:id route function')
  var index = req.params.id;
  var selection = ideasArray[index] || 'sorry, idea not found'
  res.send(selection)
})

app.post('/loggedin', function(req, res){
  var inputIdea = req.body;
  db.Idea.create(inputIdea, function(err, idea){
    if(err) {console.log('error', err);}
    res.json(inputIdea)
  })
})

//TODO: WIP
// app.post('/api/ideas' function(req, res){
//   console.log("in api/ideas post function")
//   console.log(req.body)
//   res.send(req.body)
// })


// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
