const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UsersSchema = new Schema({
    firstName:String,
    lastName:String,
    email:String,
    communities:[{type:Schema.Types.ObjectId, ref:'Community'}]
});

var User = mongoose.model('User', UsersSchema);

module.exports = User;