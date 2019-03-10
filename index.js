const port = process.env.PORT || 8080;

const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let imgUpvoteMap = new Map();
imgUpvoteMap.set("a", { votes: 0, path: "https://download.ams.birds.cornell.edu/api/v1/asset/59953191/1800", sortPosition: 0 });
imgUpvoteMap.set("b", { votes: 0, path: "https://download.ams.birds.cornell.edu/api/v1/asset/59953191/1800", sortPosition: 0 });
imgUpvoteMap.set("c", { votes: 0, path: "/..", sortPosition: 0 });
imgUpvoteMap.set("d", { votes: 0, path: "/..", sortPosition: 0 });
imgUpvoteMap.set("e", { votes: 0, path: "/..", sortPosition: 0 });
imgUpvoteMap.set("f", { votes: 0, path: "/..", sortPosition: 0 });
imgUpvoteMap.set("g", { votes: 0, path: "/..", sortPosition: 0 });
imgUpvoteMap.set("h", { votes: 0, path: "/..", sortPosition: 0 });
imgUpvoteMap.set("i", { votes: 0, path: "/..", sortPosition: 0 });
imgUpvoteMap.set("j", { votes: 0, path: "/..", sortPosition: 0 });
// const favicon = require("serve-favicon");
// const path = require('path');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

io.on('connection', function (socket) {
    socket.emit('data', JSON.stringify(Array.from(imgUpvoteMap)));
    socket.on('voteChange', (name, votes) => {
        let obj = imgUpvoteMap.get(name);
        obj.votes = votes;
        imgUpvoteMap.set(name, obj);
        socket.broadcast.emit('data', JSON.stringify(Array.from(imgUpvoteMap)));
    });
});


/* serves main page */
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));
http.listen(port, function () {
    console.log("Listening on " + port);
});