/**
 * Created by dennis on 7/23/16.
 */
var stormpath = require('stormpath');
var apiKey = new stormpath.ApiKey(
    process.env['STORMPATH_CLIENT_APIKEY_ID'],
    process.env['STORMPATH_CLIENT_APIKEY_SECRET']
);

var client = new stormpath.Client({apiKey: apiKey});
var applicationHref = process.env['STORMPATH_APPLICATION_HREF'];
var application;
module.exports = {client:client, appHref: applicationHref};
