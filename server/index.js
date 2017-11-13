const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));

io.on('connection', (socket) => {
    socket.on('draw', data => {
        socket.broadcast.emit("draw", data);
    });

    socket.on('message', msg => {
        socket.broadcast.emit("message", msg);
    });
});

http.listen(port, () => console.log('Listening on port ' + port));