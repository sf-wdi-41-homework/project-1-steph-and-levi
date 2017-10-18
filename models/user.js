var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Idea = require('./idea.js')
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new Schema ({
  username: String,
  password: String //TODO: establish secure db password settings
  // ideas: [ {title: "best idea", description: "coolest idea"} ]
  // favorites: [ favArray ] //TODO: create favorites model
})

UserSchema.statics.encrypt = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

var User = mongoose.model('User', UserSchema);
module.exports = User;