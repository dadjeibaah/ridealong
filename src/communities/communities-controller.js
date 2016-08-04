var Communities = require('./communities');
var Boom = require('boom');

module.exports = {
    list: function(request, reply){
        Communities.find({},function(err, communities){
            if(err){
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            }
            else{
                reply(communities);
            }
        });
    },
    show: function(){},
    put: function(request, reply){
        Communities.findByIdAndUpdate(request.params.id, {$set:request.payload}, function(err, community){
            if(err){
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            }else{
                reply(community);
            }
        });
    },
    post: function(request, reply){
        var newCommunity = new Communities(request.payload);
        newCommunity.save(function(err, community){
            if(err){
                reply(Boom.badImplementation('An Unexpected Error occured trying to read data'));
            }
            else{
                reply(community);
            }
        });
    }
};