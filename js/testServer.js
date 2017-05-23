var socketPort = 999;

var io = require("socket.io").listen(socketPort);
console.log('webserver running on port' + serverPort);

io.sockets.on("connection", function (socket) {
    console.log("a user connected");
    socket.emit('message', 'web server connected');

    socket.on("Save", function (data) {
        console.log(data);
    })
});