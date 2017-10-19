var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LikeSchema = new Schema({
  idealiked: String,
  userWhoLiked: String
})

var Like = mongoose.model('Like', LikeSchema)
module.exports = Like;