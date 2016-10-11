/**
 * Created by Krasimir on 10/10/2016.
 */
client.on('new-bullet', (data) => {
    if(!players[data.id]) {
        return
    }

    let offset = new Date().getTime() - (data.time  + avglat / 2 + serverTimeOffset)

    let moves = offset / 30
    moves = moves < 1 ? 1 : moves
    // console.log('moves: ' + moves)
    let speed = moves * 5

    if(players[data.id].bullets.length > 3) {
        players[data.id].bullets[0].x = data.bullet.x - data.bullet.xOffset * speed
        players[data.id].bullets[0].y = data.bullet.y - data.bullet.yOffset * speed
        players[data.id].bullets[0]
            .gameObj
            .set({
                'left': players[data.id].bullets[0].x,
                'top': players[data.id].bullets[0].y
            })
    } else {
        data.bullet.x -= data.bullet.xOffset * speed
        data.bullet.y -=  data.bullet.yOffset * speed

        let bullet = {x: data.bullet.x, y: data.bullet.y, xOffset: data.bullet.xOffset, yOffset: data.bullet.yOffset}
        let bulletData = {
            radius: 4,
            fill: 'black',
            left: bullet.x,
            top: bullet.y,
            originX: 'center',
            originY: 'center'
        }

        bullet.gameObj = new fabric.Circle(bulletData)

        players[data.id].bullets.push(bullet)
        canvas.add(bullet.gameObj)
    }
})