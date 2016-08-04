var Users = require('./users');
var Boom = require('boom');

module.exports = {
    list: function(request, reply){
        Users.find({},function(err, users){
            if(err){
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            }
            else{
                reply(users);
            }
        });
    },
    show: function(request, reply){
        Users.findOne({"_id":request.params.id})
            .populate('communities', 'communityName')
            .exec(function(err, user){
                if(err){
                    reply(Boom.badImplementation("An Unexpected error occured"));
                }
                else{
                    reply(user);
                }
            });
    },
    put: function(request, reply){
        Users.findByIdAndUpdate(request.params.id, {$set:request.payload}, function(err, user){
            if(err){
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            }else{
                reply(user);
            }
        });
    },
    post: function(request, reply){
        var newUser = new Users(request.payload);
        newUser.save(function(err, user){
            if(err){
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            }
            else{
                reply(user);
            }
        });
    }

};