const port = process.env.PORT || 8080;

const express = require("express");
const app = express();

// const favicon = require("serve-favicon");
// const path = require('path');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* serves main page */
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));
app.listen(port, function () {
    console.log("Listening on " + port);
});