var io = require("socket.io").listen(999);

io.sockets.on("connection", function (socket) {
    console.log("a user connected");
    io.socket.emit('message', 'hello world');
    socket.on('open', function (data) {
        io.sockets.emit('rMsg', data);
    })
})