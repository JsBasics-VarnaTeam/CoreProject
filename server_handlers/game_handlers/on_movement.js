/**
 * Created by Krasimir on 10/7/2016.
 */
module.exports = (io, client, data) => {
    io.activePlayers[client.id].posX = data.x
    io.activePlayers[client.id].posY = data.y
    io.activePlayers[client.id].rotation = data.rotation
}