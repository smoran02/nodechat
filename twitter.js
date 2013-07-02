var express = require('express');
var app = express();
var request = require('request');
var url = require('url');

app.get('/', function(request, response){
    response.sendfile(__dirname + '/index.html');
});

app.listen(8080);

app.get('/tweets/:username', function(req, response){
    var username = req.params.username;

    options = {
        protocol: 'http:',
        host: 'api.twitter.com',
        pathname: '/1.1/statuses/user_timeline.json',
        query: {screen_name: username, count: 10},
        Authorization: 
            OAuth oauth_consumer_key="YyA7pTzzf0qnzeLKonWx5g",
                  oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
                  oauth_signature=""
    }

    var twitterUrl = url.format(options);
    request(twitterUrl).pipe(response);
});