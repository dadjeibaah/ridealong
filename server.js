const Hapi = require('hapi');
const Joi = require('joi');
const _ = require('lodash');
const mongoose = require('mongoose');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Good = require("good");

const options = {

};

const server = new Hapi.Server();
var port = process.env.PORT || 8000;
mongoose.connect(process.env['MONGODB_URI']);

server.connection({
    host: '0.0.0.0',
    port: port
});

server.register([
    Inert,
    Vision,
    require('./src/ride/ride-routes'),
    require('./src/users/users-routes'),
    require('./src/communities/communities-routes'),
    require('./src/auth/auth-routes'),
    {
     register:Good,
        options:{
            reporters:{
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ log: '*', response: '*' }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    },
    {
        register: HapiSwagger,
        options: {
            info: {
                'title': 'RideAlong API Documentation'
            }
        }
    }], function (err) {
    if (err) {
        server.log(['error'], 'hapi-swagger load error: ' + err)
    } else {
        server.log(['start'], 'hapi-swagger interface loaded')
    }

    server.start(function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Server running at:', server.info.uri);
        }
    });
});


