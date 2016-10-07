/**
 * Created by Krasimir on 10/6/2016.
 */

// Receives the initial data a player needs
// to load himself and other players
client.on('init-data', (data) => {
    let activePlayers = data.activePlayers
    console.log(activePlayers)

    let id
    for(id in activePlayers) {
        players[id] = {}
        players[id].username = activePlayers[id].username
        players[id].posX = activePlayers[id].posX
        players[id].posY = activePlayers[id].posY
        players[id].rotation = activePlayers[id].rotation

        let newPlayerRectData = {
            id: id,
            fill: 'red',
            width: 20,
            height: 20,
            top: players[id].posY,
            left: players[id].posX,
            angle: players[id].rotation,
            originX: 'center',
            originY: 'center',
        }

        let newPlayerRect = new fabric.Rect(newPlayerRectData)

        players[id].gameObj = newPlayerRect

        console.log(newPlayerRect)

        canvas.add(players[id].gameObj)
    }

    canvas.renderAll()
})