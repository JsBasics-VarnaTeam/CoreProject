/**
 * Created by Krasimir on 10/10/2016.
 */
module.exports = (io, client, data) => {
    if(io.activePlayers[client.id].bullets.length > 3) return

    data.x -= data.xOffset
    data.y -= data.yOffset
    let bullet = {x: data.x, y: data.y, xOffset: data.xOffset, yOffset: data.yOffset}
    client.broadcast.emit('new-bullet', {id: client.id, bullet: bullet, time: new Date().getTime()})
    io.activePlayers[client.id].bullets.push(bullet)
}