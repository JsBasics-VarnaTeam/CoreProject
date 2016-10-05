/**
 * Created by Krasimir on 10/5/2016.
 */
let connectionTimeout = 500

module.exports = (io, client, data) => {
    if(io.activePlayers[client.username]) {

        io.activePlayers[client.username].posX = data.x
        io.activePlayers[client.username].posY = data.y
        io.activePlayers[client.username].rotation = data.rotation
        return true

    } else {

        setTimeout(() => {
            if(io.activePlayers[client.username]) {
                io.activePlayers[client.username].posX = data.x
                io.activePlayers[client.username].posY = data.y
                io.activePlayers[client.username].rotation = data.rotation

                return true

            } else {
                require('./kick').hardKick(io, client)

                return false
            }
        }, connectionTimeout)

    }
}