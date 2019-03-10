const port = process.env.PORT || 8080;

const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let imgUpvoteMap = new Map();
imgUpvoteMap.set("a", { votes: 0, path: "images/attack.jpg", saved: "images/attack.jpg", sortPosition: 3 });
imgUpvoteMap.set("b", { votes: 0, path: "images/cat.jpg", saved: "images/cat.jpg", sortPosition: 2 });
imgUpvoteMap.set("c", { votes: 0, path: "images/coat.jpg", saved: "images/coat.jpg", sortPosition: 0 });
imgUpvoteMap.set("d", { votes: 0, path: "images/devil.jpeg", saved: "images/devil.jpeg", sortPosition: 0 });
imgUpvoteMap.set("e", { votes: 0, path: "images/flying.jpeg", saved: "images/flying.jpeg", sortPosition: 0 });
imgUpvoteMap.set("f", { votes: 0, path: "images/gosling.jpg", saved: "images/gosling.jpg", sortPosition: 0 });
imgUpvoteMap.set("g", { votes: 0, path: "images/iconic.JPG", saved: "images/iconic.JPG", sortPosition: 0 });
imgUpvoteMap.set("h", { votes: 0, path: "images/mrgoose.jpg", saved: "images/mrgoose.jpg", sortPosition: 0 });
imgUpvoteMap.set("i", { votes: 0, path: "images/plush.jpg", saved: "images/plush.jpg", sortPosition: 0 });
imgUpvoteMap.set("j", { votes: 0, path: "images/ryangosling.jpg", saved: "images/ryangosling.jpg", sortPosition: 0 });

const sorts = [["Normal", normalsort], ["Reverse", reversesort], ["Word Sort", wordsort], ["Last Digit", lastdigit], ["Just fuck my shit up bro", fuckmyshitup]];
let currentSort = 0;
// const favicon = require("serve-favicon");
// const path = require('path');
function normalsort(map) {
    map.forEach((value, key) => {
        value.sortPosition = value.votes;
    });
}
function reversesort(map) {
    map.forEach((value, key) => {
        value.sortPosition = -value.votes;
    });
}
function wordsort(map) {
    map.forEach((value, key) => {
        value.sortPosition = convert(value.votes).length;
    });
}

function lastdigit(map) {
    map.forEach((value, key) => {
        var currvotes = value.votes
        if (currvotes < 0) {
            currvotes *= -1;
        }
        value.sortPosition = currvotes % 10;
    });
}

function pictureupdates(map) {
    map.forEach((value, key) => {
        switch (value.votes) {
            case 69:
                value.path = "images/69.jpg";
                break;
            case -1:
                value.path = "images/vangry.png";
                break;
            case 420:
                value.path = "images/420.jpg";
                break;
            case 42:
                value.path = "images/42.jpeg";
                break;
            default:
                value.path = value.saved;
                break;
        }
    });
}

function sort() {
    pictureupdates(imgUpvoteMap);
    sorts[currentSort][1](imgUpvoteMap);
}
function fuckmyshitup(map) {
    map.forEach((value, key) => {
        value.sortPosition = Math.floor(Math.random() * 10);
    });
}
function is_numeric(mixed_var) {
    return (typeof mixed_var === 'number' || typeof mixed_var === 'string') && mixed_var !== '' && !isNaN(mixed_var);
}
function convert(number) {
    let isn = number < 0;
    if (number === 0) return "zero";
    number = Math.abs(number);
    if (!is_numeric(number)) {
        console.log("Not a number = " + number);
        return "";
    }

    var quintillion = Math.floor(number / 1000000000000000000); /* quintillion */
    number -= quintillion * 1000000000000000000;
    var quar = Math.floor(number / 1000000000000000); /* quadrillion */
    number -= quar * 1000000000000000;
    var trin = Math.floor(number / 1000000000000); /* trillion */
    number -= trin * 1000000000000;
    var Gn = Math.floor(number / 1000000000); /* billion */
    number -= Gn * 1000000000;
    var million = Math.floor(number / 1000000); /* million */
    number -= million * 1000000;
    var Hn = Math.floor(number / 1000); /* thousand */
    number -= Hn * 1000;
    var Dn = Math.floor(number / 100); /* Tens (deca) */
    number = number % 100; /* Ones */
    var tn = Math.floor(number / 10);
    var one = Math.floor(number % 10);
    var res = "";

    if (quintillion > 0) {
        res += ("n quintillion");
    }
    if (quar > 0) {
        res += ("n quadrillion");
    }
    if (trin > 0) {
        res += ("n trillion");
    }
    if (Gn > 0) {
        res += ("n billion");
    }
    if (million > 0) {
        res += (((res == "") ? "" : " ") + " million");
    }
    if (Hn > 0) {
        res += (((res == "") ? "" : " ") + " Thousand");
    }

    if (Dn) {
        res += (((res == "") ? "" : " ") + " hundred");
    }


    var ones = Array("", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eightteen", "Nineteen");
    var tens = Array("", "", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eigthy", "Ninety");

    if (tn > 0 || one > 0) {
        if (!(res == "")) {
            res += " and ";
        }
        if (tn < 2) {
            res += ones[tn * 10 + one];
        } else {

            res += tens[tn];
            if (one > 0) {
                res += ("-" + ones[one]);
            }
        }
    }

    if (res == "") {
        console.log("Empty = " + number);
        res = "";
    }
    if (isn) {
        res += "Negative"
    }
    return res;
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
sort();
let currentTime = 10;
setInterval(() => {
    currentTime--;

    if (currentTime <= 0) {
        currentSort++;
        if (currentSort >= sorts.length) {
            imgUpvoteMap.forEach((value, key) => {
                //  value.votes = 0;
                value.path = "images/jumpscare.jpg";
            });

            io.emit('data', JSON.stringify(Array.from(imgUpvoteMap)));
            io.emit('jumpscare', "hi");
            setTimeout(() => { io.emit('endJumpscare'); io.emit('data', JSON.stringify(Array.from(imgUpvoteMap))); }, 500);
        }
        currentSort = currentSort % sorts.length;
        currentTime = 10;
        sort();
        io.emit('data', JSON.stringify(Array.from(imgUpvoteMap)));
        io.emit('newcolor', getRandomColor());
    }
    io.emit('newsort', `New algorithm in ${currentTime}s`);
}, 1000);
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

io.on('connection', function (socket) {
    socket.emit('data', JSON.stringify(Array.from(imgUpvoteMap)));
    socket.on('voteChange', (name, votes) => {
        let r = Math.random();
        if (r < 0.01) {
            imgUpvoteMap.get("j").votes += 2000;
        }
        let obj = imgUpvoteMap.get(name);
        obj.votes = votes;
        imgUpvoteMap.set(name, obj);
        sort();
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