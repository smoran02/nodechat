var socket = require('socket.io');
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

io.set('log level', 1);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){

    socket.on('join', function(name){
        socket.set('nickname', name);
        console.log(name + " has joined the chat.");
        io.sockets.emit('printname', name);
    });

    socket.on('messages', function(message){
        socket.get('nickname', function(err, name){
            io.sockets.emit('chat', name + ": " + message);
            console.log(name + ": " + message);
        });
    });
});

console.log('Application booting...');
server.listen(8080);