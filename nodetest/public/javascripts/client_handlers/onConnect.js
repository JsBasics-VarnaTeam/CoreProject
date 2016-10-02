/**
 * Created by Krasimir on 10/2/2016.
 */
var socket = io();

// Handshake request between server and client
socket.on('connect', function () {
    // Callback on successful connection
    // client = socket on the server

    console.log('i am connected wohoo')
    socket.on('welcome', function (data) {
        console.log(data.msg)
        console.log(data.msges)
        if(data.msges) {
            for (var i = 0; i < data.msges.length; i++) {
                var p = document.createElement('p')
                var msgContent = document.createTextNode('received ' + data.msges[i])
                p.appendChild(msgContent)
                var div = document.getElementById('testdiv')
                div.appendChild(p)
            }
        }
    })

    socket.on('new_msg', function (data) {
        console.log('received ' + data.text)
        if(data.id !== socket.id) {
            var p = document.createElement('p')
            var msgContent = document.createTextNode(data.id + ': ' + data.text)
            p.appendChild(msgContent)
            var div = document.getElementById('testdiv')
            div.appendChild(p)
        }
    })

    socket.on('time', function (data) {
        console.log(data.time)
    })
})