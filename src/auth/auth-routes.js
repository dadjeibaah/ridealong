/**
 * Created by dennis on 7/23/16.
 */
var AuthCtrl = require('./auth-controller');

exports.register = function(server, options, next){
    server.route({
        method:'POST',
        path:"/oauth/token",
        handler:AuthCtrl.validate
    });

    server.route({
        method:'POST',
        path:"/register",
        handler:AuthCtrl.register
    });

    server.route({
        method:'GET',
        path:'/oauth/verify',
        handler:AuthCtrl.verify
    });

    return next();
};

exports.register.attributes = {
  name:'auth-routes'
};