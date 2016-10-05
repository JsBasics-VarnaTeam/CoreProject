module.exports = (io) => {
    // for each client there is separate keep alive connection
    io.on('connection', (client) => {
        io.clientsCount++
        let accepted = false
        client.on('username', (data) => {
            accepted = require('./../game_handlers/on_username')(io, client, data.username)
        })

        // main events should reside here
        client.on('ready', (data) => {
            let dataReceived = require('../game_handlers/ready_checker')(io, client, data)

            let waitTime = 700
            setTimeout(() => {
                if(dataReceived) {
                    require('../game_handlers/new_player_emitter')(io, client, data)
                    require('../game_handlers/init_emitter')(io, client, data)
                }
            }, waitTime)
        })


        client.on('movement', (data) => {
            require('./../game_handlers/on_movement')(io, client, data)
        })

        // Server side kick after 6 sec
        // if client has no username
        require('./kick').intervalKick(io, client)

        client.on('disconnect', () => {
            require('./on_disconnect')(io, client)
        })
    })
}
