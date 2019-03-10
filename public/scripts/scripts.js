console.log("test");
var socket = io();
socket.emit('test', "hi");
socket.on('data', (data) => {
    data.forEach((value, name) => {
        
    });
})
