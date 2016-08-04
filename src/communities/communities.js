const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CommunitiesSchema = new Schema({
    communityName:String
});

var Communities = mongoose.model('Community', CommunitiesSchema);
module.exports = Communities;
