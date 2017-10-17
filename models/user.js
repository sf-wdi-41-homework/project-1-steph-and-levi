var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Idea = require('./idea.js')

var UserSchema = new Schema ({
  username: String,
  password: String //TODO: establish secure db password settings
  // ideas: [ Idea.Schema ],
  // favorites: [ favArray ] //TODO: create favorites model
})

var User = mongoose.model('User', UserSchema);
module.exports = User;