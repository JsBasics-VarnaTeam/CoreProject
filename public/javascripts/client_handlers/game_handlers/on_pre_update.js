/**
 * Created by Krasimir on 10/10/2016.
 */
client.on('pre-update', (data) => {
    if(!players[data.id]) {
        return
    }

    let offset = new Date().getTime() - (data.time  + (avglat * 1000) / 2)

    let moves = offset / 15
    moves = moves < 1 ? 1 : moves
    // console.log('moves: ' + moves)
    let speed = 3 * moves
    let turningSpeed = 3 * moves

    if(data.left) {
        players[data.id].rotation -= turningSpeed
    }
    if(data.right) {
        players[data.id].rotation += turningSpeed
    }
    if(data.up) {
        players[data.id].x -= Math.cos(Math.getAngleInRadians(players[data.id].rotation)) * speed
        players[data.id].y -= Math.sin(Math.getAngleInRadians(players[data.id].rotation)) * speed
    }
    if(data.down) {
        players[data.id].x += Math.cos(Math.getAngleInRadians(players[data.id].rotation)) * speed
        players[data.id].y += Math.sin(Math.getAngleInRadians(players[data.id].rotation)) * speed
    }
})