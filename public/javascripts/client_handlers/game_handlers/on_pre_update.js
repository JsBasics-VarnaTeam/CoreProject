/**
 * Created by Krasimir on 10/10/2016.
 */
client.on('pre-update', (data) => {
    if(!players[data.id]) {
        return
    }

    setTimeout((data) => {
        let offset = new Date().getTime() - (data.time  + avglat / 2 + serverTimeOffset)

        let moves = offset / 15
        moves = moves < 1 ? 1 : moves
        // console.log('moves: ' + moves)
        let speed = 3 * moves

        if(data.left) {
            players[data.id].rotation -= speed
        }
        if(data.right) {
            players[data.id].rotation += speed
        }
        if(data.up) {
            players[data.id].x -= Math.cos(Math.getAngleInRadians(players[data.id].rotation)) * speed
            players[data.id].y -= Math.sin(Math.getAngleInRadians(players[data.id].rotation)) * speed
        }
        if(data.down) {
            players[data.id].x += Math.cos(Math.getAngleInRadians(players[data.id].rotation)) * speed
            players[data.id].y += Math.sin(Math.getAngleInRadians(players[data.id].rotation)) * speed
        }

        players[data.id]
            .gameObj
            .set({
                'left': players[data.id].x,
                'top': players[data.id].y,
                'angle': players[data.id].rotation
            })
    }, 0, data)
})
