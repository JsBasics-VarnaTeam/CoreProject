/**
 * Created by Krasimir on 10/5/2016.
 */
setTimeout(() => {
    client.on('update', (data) => {
        let allPlayers = data.allPlayers
        let p
        for(p in allPlayers) {
            if(players[p]) {
                players[p].posX = allPlayers[p].posX
                players[p].posY = allPlayers[p].posY
                players[p].rotation = allPlayers[p].rotation

                canvasGetById(p)
                    .set({  'left': players[p].posX,
                        'top': players[p].posY,
                        'angle': players[p].rotation})
            } else if(p !== username) {
                let obj = canvasGetById(p)
                if(obj) {
                    canvas.remove(canvasGetById(p))
                }
            }
        }

        canvas.renderAll()
    })
}, 1000)