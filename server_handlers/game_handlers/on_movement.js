/**
 * Created by Krasimir on 10/5/2016.
 */
module.exports = (io, client, data) => {
    io.activePlayers[client.username].posX = data.x
    io.activePlayers[client.username].posY = data.y
    io.activePlayers[client.username].rotation = data.angle
}