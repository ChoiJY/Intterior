var express = require("express"),
    users = require("./routes/users");

var serverPort = 3000;
var socketPort = 999;

var io = require("socket.io").listen(socketPort);
var app = express();

app.get('/users', users.findAll);
app.post('/users',users.addUser);


//web 서버 port설정필요
app.listen(serverPort);

console.log('webserver running on port' + serverPort);

io.sockets.on("connection", function (socket) {
    console.log("a user connected");
    socket.emit('message', 'web server connected');
    socket.on('open', function (data) {
        io.sockets.emit('rMsg', data);
    })
});