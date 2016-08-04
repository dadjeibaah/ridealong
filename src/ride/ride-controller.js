var Ride = require('./rides');
var Boom = require('boom');
module.exports = {
    list: function (request, reply) {
        Ride.find({}, function (err, Rides) {
            if (err) {
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            }
            else {
                reply(Rides);
            }
        });
    },
    show: function (request, reply) {
    },
    put: function (request, reply) {
        Ride.findByIdAndUpdate(request.params.id, {$set:request.payload}, function(err, ride){
            if(err){
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            }else{
                reply(ride);
            }
        });
    },
    nearby: function (request, reply) {
        var communityId = request.payload.communityId;
        var now = request.payload.currentTime;
        var dateQuery = new Date(now.toISOString());


        Ride.find({'community':communityId,'departureTime':{$gte:dateQuery}})
            .exec(function (err, rides) {
                if (err) {
                    reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
                } else {
                    reply(rides);
                }
            });
    },
    post: function (request, reply) {
        var newRide = new Ride(request.payload);
        newRide.save(function (err, ride) {
            if (err) {
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            }
            else {
                reply(ride);
            }
        });
    }

};