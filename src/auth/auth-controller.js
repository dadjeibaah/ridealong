/**
 * Created by dennis on 7/23/16.
 */
const stormpath = require('stormpath');
const nJwt = require('njwt');
const auth = require('./ridealongauth');
const Boom = require('boom');
module.exports = {
    validate: function (request, reply) {
        var grantType = request.payload.grant_type;
        auth.client.getApplication(auth.appHref, function (err, application) {
            if (grantType === "password") {
                var authenticator = new stormpath.OAuthAuthenticator(application);
                authenticator.authenticate({
                    body: {
                        grant_type: request.payload.grant_type,
                        username: request.payload.username,
                        password: request.payload.password
                    }
                }, function (err, result) {
                    if (err) {
                        if (err.code === 7104) {
                            reply(Boom.notFound("user account could not be found"))
                        }
                    } else {
                        reply(result.accessTokenResponse);
                    }

                });


            }

            if(grantType === 'refresh_token'){
                var authenticator = new stormpath.OAuthAuthenticator(application);
                authenticator.authenticate({
                    body: {
                        grant_type: request.payload.grant_type,
                        refresh_token: request.payload.refresh_token
                    }
                }, function (err, result) {
                    if (err) {
                        if (err.code === 7104) {
                            reply(Boom.notFound("user account could not be found"))
                        }
                    } else {
                        reply(result.accessTokenResponse);
                    }

                });

            }


        });

    },
    register: function (request, reply) {
        var account = request.payload;

        auth.client.getApplication(auth.appHref, function (err, application) {
            application.createAccount(account, function (err, account) {
                var newAccount = account;
                if (err) throw err;
                reply(newAccount);
            });
        });
    },
    verify:function(request, reply){
        var accessToken = request.headers.authorization;
        nJwt.verify(accessToken, process.env["STORMPATH_API_KEY_SECRET"], function(err, verifiedJwt){
            if(err){
                reply(Boom.notFound({message:"token expired"}));
            }else{
                console.log(verifiedJwt);
                reply(verifiedJwt);
            }
        });
    }
};
