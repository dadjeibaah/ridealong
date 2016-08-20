var CommunitiesCtrl = require('./communities-controller');
var Joi = require('joi');
exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/communities',
        config:{
            tags:['api']
        },
        handler: CommunitiesCtrl.list
    });

    server.route({
        method: 'GET',
        path: '/communities/{id}',
        config:{
            tags:['api'],
            validate:{
                params:{
                    id:Joi.string().required()
                }
            }
        },
        handler: CommunitiesCtrl.show

    });

    server.route({
        method: 'PUT',
        path: '/communities/{id}',
        config:{
            tags:['api'],
            validate:{
                params:{
                    id:Joi.string().required()
                },
                payload:{
                    communityName:Joi.string().required()
                }
            }
        },
        handler: CommunitiesCtrl.put

    });

    server.route({
        method: 'POST',
        path: '/communities',
        config:{
            tags:['api'],
            validate:{
                payload:{
                    communityName:Joi.string().required()
                }

            }
        },
        handler: CommunitiesCtrl.post

    });

    return next();
};

exports.register.attributes = {
    name: 'communities-routes'
};