/**
 * Created by Krasimir on 10/5/2016.
 */
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
            let k = data.activePlayers[id].bullets.length

            if(i > k) {
                while (i--) {
                    let bullet = data.activePlayers[id].bullets[i]
                    if (!bullet) {
                        canvas.remove(players[id].bullets[i].gameObj)
                        players[id].bullets.splice(i, 1)
                        continue
                    }
                    bullet.x -= bullet.xOffset
                    bullet.y -= bullet.yOffset
                    players[id].bullets[i].x = bullet.x
                    players[id].bullets[i].y = bullet.y
                    players[id].bullets[i]
                        .gameObj
                        .set({
                            'left': bullet.x,
                            'top': bullet.y
                        })
                }
            } else if(i === k) {
                while (i--) {
                    let bullet = data.activePlayers[id].bullets[i]
                    bullet.x -= bullet.xOffset
                    bullet.y -= bullet.yOffset

                    players[id].bullets[i].x = bullet.x
                    players[id].bullets[i].y = bullet.y
                    players[id].bullets[i]
                        .gameObj
                        .set({
                            'left': bullet.x,
                            'top': bullet.y
                        })
                }
            } else if(i < k) {
                while (k--) {
                    let bullet = players[id].bullets[k]
                    let bulletToAdd = data.activePlayers[id].bullets[k]
                    bulletToAdd.x -= bulletToAdd.xOffset
                    bulletToAdd.y -= bulletToAdd.yOffset
                    if(!bullet) {
                        let bulletData = {
                            radius: 4,
                            fill: 'black',
                            left: bulletToAdd.x,
                            top: bulletToAdd.y,
                            originX: 'center',
                            originY: 'center'
                        }

                        bulletToAdd.gameObj = new fabric.Circle(bulletData)
                        players[id].bullets[k] = bulletToAdd
                        canvas.add(bulletToAdd.gameObj)
                        continue
                    }

                    players[id].bullets[k].x = bulletToAdd.x
                    players[id].bullets[k].y = bulletToAdd.y
                    players[id].bullets[k]
                        .gameObj
                        .set({
                            'left': bulletToAdd.x,
                            'top': bulletToAdd.y
                        })
                }
            }
        }, 0, id, data)
    }
    }, 0, data)
})

setInterval(() => {
  canvas.renderAll()
}, 20)
