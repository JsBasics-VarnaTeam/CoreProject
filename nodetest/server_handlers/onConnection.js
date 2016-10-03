module.exports = (io) => {
    var clientCount = 0;
    // var messages = [];


    var clients = [];
    var usernamesToIds = [];

    // for each client there will be separate keep alive connection
    io.on('connection', function (client) {
        let accepted = false;
        clientCount++
        client.on('username', (data) => {
            console.log('<debug>');
            console.log(usernamesToIds);
            if(typeof(usernamesToIds[data.username]) != 'undefined'){
                console.log('tuk sme')
                io.to(client.id).emit('rejected','Username already in use!')
                return
            }
            console.log('</debug>');
            console.log('');
            usernamesToIds[data.username] = client.id
            clients[client.id] = data.username
            console.log(client.id + ' ' + data.username)
            io.to(client.id).emit('accepted', 'welcome')
            accepted = true;
            console.log('client with id ' + client.id + ' and username ' + data.username + ' connected');

        });


        // Server side client kick after 6 sec
        // if client has no username
        setTimeout(
            () => {
                if(!accepted) {
                    if(client) {
                        io.to(client.id).emit('kick', 'You have been kicked cuz u have no username')
                        client.disconnect()
                    }
                }
            }, 6000
        )

        // main events should reside here


        // for example onPosReceived


        // or onAttack etc.


        client.on('disconnect', function() {
            //remove from clients list
            let username = clients[client.id]
            delete clients[client.id];
            delete usernamesToIds[username];


            console.log('clients : '+ clients + ' ' + clients.length)
            console.log('usernamesToIds : '+ usernamesToIds + ' ' + usernamesToIds.length)
            clientCount--
            console.log('client with id ' + client.id + ' disconnected')
        })
    });


    // Testing functions
    function sendTime () {
        io.emit('time', {time: new Date().toJSON()})
    }

    setInterval(sendTime, 5000)

    setInterval(function () {
        console.log(clientCount)
    }, 10000)
}
