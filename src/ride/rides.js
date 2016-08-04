const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RideSchema = new Schema({
    rideSharer: {type: Schema.Types.ObjectId, ref: 'User'},
    riders: [{type: Schema.Types.ObjectId, ref: 'User'}],
    availableSeats: Number,
    loc: {
        'type': {type: String, enum: "Point", default: "Point"},
        coordinates: {type: [Number], default: [0, 0]}
    },
    duration: Date,
    destinationName: String,
    departureTime: Date,
    community:{type:Schema.Types.ObjectId, ref:'Community'}
});

var Ride = mongoose.model('Ride', RideSchema);
module.exports = Ride;