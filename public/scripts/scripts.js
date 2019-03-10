console.log("test");
var socket = io();
socket.emit('test', "hi");
socket.on('data', (data) => {
    data = new Map(JSON.parse(data));
    data.forEach((value, name) => {
        var el = document.getElementById(name);
        console.log(el);
        el.childNodes.getElementsByTagName("img")[0].src = value.path;
        el.childNodes.getElementsByClassName("vote roundrect")[0].getElementsByClassName("count")[0].body = value.votes;
    });
})