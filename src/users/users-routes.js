var UsersCtrl = require('./users-controller');
var Joi = require('joi');
exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/users',
        config:{
            tags:['api']
        },
        handler: UsersCtrl.list
    });

    server.route({
        method: 'GET',
        path: '/users/{id}',
        config:{
            tags:['api'],
            validate:{
                params:{
                    id:Joi.string().required()
                }
            }
        },
        handler: UsersCtrl.show

    });

    server.route({
        method: 'PUT',
        path: '/users/{id}',
        config:{
            tags:['api'],
            validate:{
                params:{
                    id:Joi.string().required()
                },
                payload:{
                    firstName:Joi.string(),
                    lastName:Joi.string(),
                    email:Joi.string(),
                    communities:Joi.array().items(Joi.string()).max(4)
                }
            }
        },
        handler: UsersCtrl.put

    });

    server.route({
        method: 'POST',
        path: '/users',
        config:{
            tags:['api'],
            validate:{
                payload:{
                    firstName:Joi.string(),
                    lastName:Joi.string(),
                    email:Joi.string().required(),
                    communities:Joi.array().items(Joi.string()).max(4)
                }

            }
        },
        handler: UsersCtrl.post

    });

    

    return next();
};

exports.register.attributes = {
    name: 'users-routes'
};