/**
 * Created by Krasimir on 10/5/2016.
 */
// assumed emit rate from server
let assumedUpdateRateMs = 50

// frame buffer
// let buffer = []

// receives update ticks
client.on('update', (data) => {
    setTimeout((data) => {

    let id
    for(id in data.activePlayers) {
        setTimeout((id, data) => {
            if(!players[id]) return

            players[id].x = data.activePlayers[id].x
            players[id].y = data.activePlayers[id].y
            players[id].rotation = data.activePlayers[id].rotation

            players[id]
                .gameObj
                .set({
                    'left': players[id].x,
                    'top': players[id].y,
                    'angle': players[id].rotation
                })
        }, 0, id, data)

        setTimeout((id, data) => {
            if(!players[id]) return

            let i = players[id].bullets.length
            while (i--) {
                canvas.remove(players[id].bullets[i].gameObj)
            }

            let bullets = []
            for(let bullet of data.activePlayers[id].bullets) {
                bullet.x -= bullet.xOffset
                bullet.y -= bullet.yOffset
                let bulletData = {
                    radius: 4,
                    fill: 'black',
                    left: bullet.x,
                    top: bullet.y,
                    originX: 'center',
                    originY: 'center'
                }
                bullet.gameObj = new fabric.Circle(bulletData)
                bullets.push(bullet)
                canvas.add(bullet.gameObj)
            }

            players[id].bullets = bullets
        }, 0, id, data)
    }
    }, 0, data)
})

setInterval(() => {
  canvas.renderAll()
}, 20)
