/**
 * Created by Krasimir on 10/5/2016.
 */
module.exports = (io, client, data) => {
    io.emit('new-player', {username: client.username, posX: data.x, posY: data.y, rotation: data.rotation})
}