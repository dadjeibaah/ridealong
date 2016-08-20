var Ride = require('./rides');
var Boom = require('boom');
const auth = require('../auth/ridealongauth');
const stormpath = require('stormpath');
module.exports = {
    delete: function (request, reply) {
        var id = request.params.id;
        Ride.findByIdAndRemove(id, function (err, doc, result) {
            if (err) {
                reply(Boom.badRequest('Delete has failed'));
            }else{
                reply({message:"delete"});
            }
        });
    }
    ,
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
        Ride.findByIdAndUpdate(request.params.id, {$set: request.payload}, function (err, ride) {
            if (err) {
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            } else {
                reply(ride);
            }
        });
    },
    nearby: function (request, reply) {
        var communityId = request.payload.communityId;
        var now = request.payload.currentTime;
        var dateQuery = new Date(now.toISOString());


        Ride.find({'community': communityId, 'departureTime': {$gte: dateQuery}})
            .exec(function (err, rides) {
                if (err) {
                    reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
                } else {
                    reply(rides);
                }
            });
    },
    post: function (request, reply) {
        var accessToken = request.headers.authorization;
        auth.client.getApplication(auth.appHref, function (err, application) {
            var authenticator = new stormpath.OAuthAuthenticator(application);
            authenticator.authenticate({headers: {authorization: 'Bearer: ' + accessToken}},
                function (err, result) {
                    if (err) {
                        reply(Boom.unauthorized());
                    } else {
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

                });
        });

    }

};