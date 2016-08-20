var RidesCtrl = require('./ride-controller');
var Joi = require('joi');
exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/rides',
        config: {
            tags: ['api']
        },
        handler: RidesCtrl.list
    });

    server.route({
        method: 'GET',
        path: '/rides/{id}',
        config: {
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: RidesCtrl.show

    });

    server.route({
        method: 'POST',
        path: '/rides',
        config: {
            tags: ['api'],
            validate: {
                payload: {
                    rideSharer: Joi.string().required(),
                    destinationName: Joi.string().required(),
                    departureTime: Joi.date().required().iso(),
                    duration: Joi.date().required().min(Joi.ref('departureTime')).iso(),
                    community: Joi.string().required(),
                    availableSeats: Joi.number().positive().min(1),
                    rideAlongs: Joi.array().max(2).items(Joi.string()),
                    loc: Joi.object({
                        type: Joi.string().required(),
                        coordinates: Joi.array().items(Joi.number().required())
                    })
                },
                failAction: function (request, reply, source, error) {
                    server.log(error);
                    reply(error);
                }


            }
        },
        handler: RidesCtrl.post

    });

    server.route({
        method: 'POST',
        path: '/rides/nearby',
        config: {
            tags: ['api'],
            validate: {
                payload: {
                    communityId: Joi.string().required(),
                    currentTime: Joi.date().iso()
                },
                failAction: function (request, reply, source, error) {
                    server.log(error);
                    reply(error);
                }
            }
        },
        handler: RidesCtrl.nearby
    });

    server.route({
        method: 'PUT',
        path: '/rides/{id}',
        config: {
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: {
                    departureTime: Joi.date().iso(),
                    duration: Joi.date().min(Joi.ref('departureTime')).iso(),
                    communities: Joi.string().required(),
                    availableSeats: Joi.number(),
                    rideAlongs: Joi.array().items(Joi.string())
                }
            }
        },
        handler: RidesCtrl.put

    });

    server.route({
        method: 'DELETE',
        path: '/rides/{id}',
        config: {
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        },
            handler: RidesCtrl.delete
        });

    return next();
};

exports.register.attributes = {
    name: 'ride-routes'
};