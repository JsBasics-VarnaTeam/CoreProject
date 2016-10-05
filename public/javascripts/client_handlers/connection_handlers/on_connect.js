/**
 * Created by Krasimir on 10/2/2016.
 */
let client = io()
let players = {}

// Handshake request between server and client
client.on('connect', () => {
    // Callback on successful connection
    console.log(username)
    // send the server username for """"authentication"""" testing
    client.emit('username', {username: username})

    // receive time from server for teting purposes
    client.on('time', function (data) {
        console.log(data.time)
    })
})