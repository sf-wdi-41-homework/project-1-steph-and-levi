var db = require('./models');

var seedIdeas = [
  {
    title: "best idea ever",
    description: "really cool idea"
  },
  {
    title: "DoggieDrone",
    description: "have a drone walk your dog"
  },
  {
    title: "Birthday Surprise",
    description: "order a birthday surprise and get a random performance at your birthday party!"
  },
  {
    title: "No, man",
    description: "Have someone tell you no to your bad ideas"
  },
  {
    title: "babysat",
    description: "share your experiences as a babysitter and rate families on kid behavior, reliability and more"
  }
]

db.Idea.remove({}, function(err, ideas){
  // code in here runs after all albums are removed
  db.Idea.create(seedIdeas, function(err, ideas){
    // code in here runs after all ideas are created
    if (err) { return console.log('ERROR', err); }
    console.log("all ideas:", ideas);
    console.log("created", ideas.length, "ideas");
    process.exit();
  });
});