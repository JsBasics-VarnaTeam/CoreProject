module.exports = (io) => {
    // for each client there is separate keep alive connection
    io.on('connection', (client) => {
        require('./id_emitter')(io, client)

        client.on('username', (data) => {
            if (Object.keys(io.activePlayers).length === 0) {
                require('./../game_handlers/map_generator')(io)
            }
            let received = require('./../game_handlers/on_username')(io, client, data.username)
            if(received) {
                require('./../game_handlers/map_emitter')(io, client)
                require('./../game_handlers/init_emitter')(io, client)
                require('./../game_handlers/new_player_emitter')(io, client)
            }
        })

        client.on('latency', (startTime, cb) => {
            cb(startTime)
            io.to(client.id).emit('time', {time: new Date().getTime()})
        })

        client.on('bullet', (data) => {
            setImmediate((io, client, data) => {
                require('../game_handlers/on_bullet')(io, client, data)
            }, io, client, data)
        })

        client.on('movement', (data) => {
            setImmediate((io, client, data) => {
                require('../game_handlers/on_movement')(io, client, data)
            }, io, client, data)
        })

        client.on('disconnect', () => {
            require('./on_disconnect')(io, client)
        })
    })
}
