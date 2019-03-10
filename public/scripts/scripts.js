console.log("test");
var socket = io();
socket.emit('test', "hi");
socket.on('data', (data) => {
    if (!isScared) {
        console.log("new");
        data = new Map(JSON.parse(data));
        data.forEach((value, name) => {
            var el = document.getElementById(name);
            //   console.log(el);
            //   el = el.getElementById(name);
            el.childNodes[1].src = value.path;
            el.style.order = value.sortPosition;
            el.childNodes[3].childNodes[5].innerHTML = value.votes;
        });
    }
});
let isScared = false;
socket.on('jumpscare', () => { console.log("scared"); isScared = true });
socket.on('endJumpscare', () => isScared = false);
socket.on('newsort', (time) => {
    console.log(time);
    document.getElementById("num").innerHTML = time;
});
function send(name, votes) {
    socket.emit("voteChange", name, votes);
}
$(function () {
    $(".increment").click(function () {
        var count = parseInt($("~ .count", this).text());

        if ($(this).hasClass("up")) {
            count = count + 1;

            $("~ .count", this).text(count);
        } else {
            count = count - 1;
            $("~ .count", this).text(count);
        }
        send($(this).parent().parent().attr('id'), count);

        $(this).parent().addClass("bump");

        setTimeout(function () {
            $(this).parent().removeClass("bump");
        }, 400);
    });
});