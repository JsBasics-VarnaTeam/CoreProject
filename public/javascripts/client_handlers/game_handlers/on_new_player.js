/**
 * Created by Krasimir on 10/5/2016.
 */

// receives data needed to add new player
// every time such joins
client.on('new-player', (data) => {
    if(data.id === clientId) {
        return
    }

    let newPlayerUsername = data.username
    let posX = data.posX
    let posY = data.posY
    let rotation = data.rotation

    players[data.id] = {username: newPlayerUsername, posX: posX, posY: posY, rotation: rotation}

    let newPlayerRectData = {
        id: data.id,
        fill: 'red',
        width: 20,
        height: 20,
        top: posY,
        left: posX,
        angle: rotation,
        originX: 'center',
        originY: 'center',}

    let newPlayerRect = new fabric.Rect(newPlayerRectData)

    players[data.id].gameObj = newPlayerRect

    console.log(newPlayerRect)

    canvas.add(players[data.id].gameObj)
})