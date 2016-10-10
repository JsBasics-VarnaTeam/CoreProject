/**
 * Created by Krasimir on 10/5/2016.
 */
// assumed emit rate from server
let assumedUpdateRateMs = 66

// frame buffer
// let buffer = []

// receives update ticks
client.on('update', (data) => {
    // time difference between server update emit and client data receive
    // takes into consideration the difference in clocks between server computer and client computer
    // (serverTimeOffset)
    let timeDiff = Math.abs(new Date().getTime() - (data.time + serverTimeOffset))

    // assumes updates rate is 22 (every 45 ms)
    // value must be between 0 and 1 or it will be considered
    // hyper interpolation (bad for us)
    let tdPercentage = timeDiff / assumedUpdateRateMs > 1 ? 1 : timeDiff / assumedUpdateRateMs

    // buffer.push({data: data, tdP: tdPercentage})
    let moves = timeDiff / 25
    moves = moves < 1 ? 1 : moves
    // console.log('moves: ' + moves)
    let bulletSpeed = 5 * moves


    // let data = buffer.pop()
    // let tdPercentage = data.tdP
    // data = data.data
    let id
    for(id in players) {
        // position and rotation interpolation (frame of 45 ms)
        // less 'teleporting'
        players[id].x = players[id].x + tdPercentage * (data.activePlayers[id].x - players[id].x)
        players[id].y = players[id].y + tdPercentage * (data.activePlayers[id].y - players[id].y)
        players[id].rotation = players[id].rotation + tdPercentage * (data.activePlayers[id].rotation - players[id].rotation)

        // no position / rotation interpolation (if any player lags in the frame he 'teleports' to his next position)
        // players[id].x = data.activePlayers[id].x
        // players[id].y = data.activePlayers[id].y
        // players[id].rotation = data.activePlayers[id].rotation
        // update player object on canvas
        players[id]
            .gameObj
            .set({
                'left': players[id].x,
                'top': players[id].y,
                'angle': players[id].rotation
            })

        setTimeout((id, bulletSpeed) => {
            // console.log(data.activePlayers[id].bullets)
            let i = players[id].bullets.length
            while(i--) {
                canvas.remove(players[id].bullets[i].gameObj)
            }

            let bullets = []
            for(let bullet of data.activePlayers[id].bullets) {
                bullet.x -= bullet.xOffset * bulletSpeed
                bullet.y -= bullet.yOffset * bulletSpeed

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
        }, 0, id, bulletSpeed)
    }
})


setInterval(() => {
  canvas.renderAll()
}, 20)

setInterval(() => {
    console.log(canvas.getObjects().length)
}, 1000)
