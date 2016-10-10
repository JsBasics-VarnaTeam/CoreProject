/**
 * Created by Krasimir on 10/7/2016.
 */
module.exports = (io, client, data) => {
    client.broadcast.emit('pre-update', {id: client.id, up: data.up, down: data.down, left: data.left, right: data.right, time: new Date().getTime()})

    let offset = new Date().getTime() - (data.time  + (data.lat * 1000) / 2)

    let moves = offset / 15
    moves = moves < 1 ? 1 : moves
    // console.log('moves: ' + moves)
    let speed = 3 * moves
    let turningSpeed = 3 * moves

    if(data.left) {
        io.activePlayers[client.id].rotation -= turningSpeed
    }
    if(data.right) {
        io.activePlayers[client.id].rotation += turningSpeed
    }
    if(data.up) {
        io.activePlayers[client.id].x -= Math.cos(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
        io.activePlayers[client.id].y -= Math.sin(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
    }
    if(data.down) {
        io.activePlayers[client.id].x += Math.cos(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
        io.activePlayers[client.id].y += Math.sin(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
    }
}


