/**
 * Created by Krasimir on 10/10/2016.
 */
client.on('new-bullet', (data) => {
    if(!players[data.id]) {
        return
    }

    setTimeout(() => {
        let offset = new Date().getTime() - (data.time  + avglat / 2 + serverTimeOffset)

        let moves = offset / 30
        moves = moves < 1 ? 1 : moves
        // console.log('moves: ' + moves)
        let speed = moves * 5

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
    }, 0, data)
})