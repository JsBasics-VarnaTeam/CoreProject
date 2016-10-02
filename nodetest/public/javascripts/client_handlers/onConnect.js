/**
 * Created by Krasimir on 10/2/2016.
 */
var client = io();

// Handshake request between server and client
client.on('connect', function () {
    // Callback on successful connection
    let accepted = false;

    console.log(username)
    // send the server username for """"authentication"""" testing
    client.emit('username', {username: username})

    // if username was accepted fire callback
    client.on('accepted', function (data) {
        accepted = true;
        console.log(data)
        console.log('i am connected wohoo')
    })

    // client side disconnect after 5 sec
    // if client is not accepted
    setTimeout(
        () => {
        if(!accepted) {
            client.disconnect()
        }
        }, 5000)

    // action events here


    // receive time from server for teting purposes
    client.on('time', function (data) {
        console.log(data.time)
    })

    // client will be kicked by server after 6 sec
    // if he does not have username
    client.on('kick', function (data) {
        console.log(data)
    })
})