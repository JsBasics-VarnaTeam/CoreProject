/**
 * Created by Krasimir on 10/10/2016.
 */
module.exports = (io, client, data) => {
    let offset = new Date().getTime() - (data.time  + (data.lat * 1000) / 2)

    let moves = offset / 30
    moves = moves < 1 ? 1 : moves
    // console.log('moves: ' + moves)
    let speed = 2 * moves
    data.x -= data.xOffset * speed
    data.y -= data.yOffset * speed
    let bullet = {x: data.x, y: data.y, xOffset: data.xOffset, yOffset: data.yOffset}
    // console.log(bullet)
    client.broadcast.emit('new-bullet', {id: client.id, bullet: bullet, time: new Date().getTime()})
    io.activePlayers[client.id].bullets.push(bullet)
}