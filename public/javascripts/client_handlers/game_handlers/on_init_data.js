/**
 * Created by Krasimir on 10/6/2016.
 */
client.on('init-data', (data) => {
    let activePlayers = data.activePlayers
    let p
    for(p in activePlayers) {
        if(p !== username) {
            players[p] = {}
            players[p].posX = activePlayers[p].posX
            players[p].posY = activePlayers[p].posY
            players[p].rotation = activePlayers[p].rotation


            let newPlayerRectData = {
                id: p,
                fill: 'red',
                width: 20,
                height: 20,
                top: players[p].posY,
                left: players[p].posX,
                angle: players[p].rotation,
                originX: 'center',
                originY: 'center',}

            let newPlayerRect = new fabric.Rect(newPlayerRectData)

            console.log(newPlayerRect)

            canvas.add(newPlayerRect)
        }
    }

    canvas.renderAll()
})