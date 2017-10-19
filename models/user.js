var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Idea = require('./idea.js')
var bcrypt   = require('bcrypt-nodejs');
var Idea = require('./idea')
var Like = require('./like')

var UserSchema = new Schema ({
  name: String,
  local: {
    email: String,
    password: String,
  },
  ideas: [ Idea.schema ],
  favorites: [ Like.schema ]
})

UserSchema.statics.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

var User = mongoose.model('User', UserSchema);
module.exports = User;