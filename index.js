const port = process.env.PORT || 8080;

const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let imgUpvoteMap = new Map();
imgUpvoteMap.set("a", { votes: 0, path: "/..", sortPosition: 0 });

// const favicon = require("serve-favicon");
// const path = require('path');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* serves main page */

io.on('connection', function (socket) {
    socketMap.set()
    socket.emit('data', imgUpvoteMap);
    socket.on('voteChange', (name, obj) => {
        imgUpvoteMap.set(name, obj);
        socket.broadcast.emit('data', imgUpvoteMap);
    });
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));
http.listen(port, function () {
    console.log("Listening on " + port);
});

