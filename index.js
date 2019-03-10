const port = process.env.PORT || 8080;

const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let imgUpvoteMap = new Map();
imgUpvoteMap.set("a", { votes: 0, path: "images/attack.jpg", sortPosition: 3 });
imgUpvoteMap.set("b", { votes: 0, path: "images/cat.jpg", sortPosition: 2 });
imgUpvoteMap.set("c", { votes: 0, path: "images/coat.jpg", sortPosition: 0 });
imgUpvoteMap.set("d", { votes: 0, path: "images/devil.jpeg", sortPosition: 0 });
imgUpvoteMap.set("e", { votes: 0, path: "images/flying.jpeg", sortPosition: 0 });
imgUpvoteMap.set("f", { votes: 0, path: "images/gosling.jpg", sortPosition: 0 });
imgUpvoteMap.set("g", { votes: 0, path: "images/iconic.JPG", sortPosition: 0 });
imgUpvoteMap.set("h", { votes: 0, path: "images/mrgoose.jpg", sortPosition: 0 });
imgUpvoteMap.set("i", { votes: 0, path: "images/plush.jpg", sortPosition: 0 });
imgUpvoteMap.set("j", { votes: 0, path: "images/ryangosling.jpg", sortPosition: 0 });
// const favicon = require("serve-favicon");
// const path = require('path');
function simplesort(map) {
    let arr = Array.from(map);
    arr.sort((a, b) => {
        return a[1].votes > b[1].votes;
    });
    arr.forEach((el, index) => {
        map.get(el[0]).sortPosition = index;
    });
}
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

io.on('connection', function (socket) {
    socket.emit('data', JSON.stringify(Array.from(imgUpvoteMap)));
    socket.on('voteChange', (name, votes) => {
        let obj = imgUpvoteMap.get(name);
        obj.votes = votes;
        imgUpvoteMap.set(name, obj);
        simplesort(imgUpvoteMap);
        socket.broadcast.emit('data', JSON.stringify(Array.from(imgUpvoteMap)));
        socket.emit('data', JSON.stringify(Array.from(imgUpvoteMap)));
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