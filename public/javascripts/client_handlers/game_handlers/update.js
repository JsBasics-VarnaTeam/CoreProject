/**
 * Created by Krasimir on 10/5/2016.
 */
// assumed emit rate from server
let assumedUpdateRateMs = 50

// frame buffer
// let buffer = []

// receives update ticks
setTimeout(() => {
    client.on('update', (data) => {
        setTimeout((data) => {
        // time difference between server update emit and client data receive
        // takes into consideration the difference in clocks between server computer and client computer
        // (serverTimeOffset)
        let timeDiff = new Date().getTime() - (data.time + avglat - serverTimeOffset)
        // assumes updates rate is 22 (every 45 ms)
        // value must be between 0 and 1 or it will be considered
        // hyper interpolation (bad for us)
        // let tdPercentage = timeDiff / assumedUpdateRateMs > 1 ? 1 : timeDiff / assumedUpdateRateMs
        //
        // // buffer.push({data: data, tdP: tdPercentage})
        let moves = timeDiff / assumedUpdateRateMs
        moves = moves < 1 ? 1 : moves
        // console.log('moves: ' + moves)
        // let speed = 3 * moves
        let bulletSpeed = 5 * moves

        // let data = buffer.pop()
        // let tdPercentage = data.tdP
        // data = data.data
        let id
        for(id in data.activePlayers) {
            // if(isNaN(players[id].x) || isNaN(players[id].y) || isNaN(players[id].rotation)) {
            //     console.log('NAN')
            //     players[id].x = data.activePlayers[id].x
            //     players[id].y = data.activePlayers[id].y
            //     players[id].rotation = data.activePlayers[id].rotation
            // } else {
                // position and rotation interpolation (frame of 45 ms)
                // less 'teleporting'
            players[id].x = data.activePlayers[id].x
            players[id].y = data.activePlayers[id].y
            players[id].rotation = data.activePlayers[id].rotation
                // - Math.cos(Math.getAngleInRadians(data.activePlayers[id].rotation)) * speed
                // - Math.sin(Math.getAngleInRadians(data.activePlayers[id].rotation)) * speed
                // players[id].rotation + tdPercentage * (data.activePlayers[id].rotation - players[id].rotation)
            // }

            players[id]
                .gameObj
                .set({
                    'left': players[id].x,
                    'top': players[id].y,
                    'angle': players[id].rotation
                })

            setTimeout((id, bulletSpeed, data) => {
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
            }, 0, id, bulletSpeed, data)
        }
        }, 0, data)
    })
}, 1000)

setInterval(() => {
  canvas.renderAll()
}, 20)

setInterval(() => {
    console.log(canvas.getObjects().length)
}, 1000)
