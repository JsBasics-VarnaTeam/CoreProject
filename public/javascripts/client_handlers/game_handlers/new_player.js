/**
 * Created by Krasimir on 10/5/2016.
 */
client.on('new-player', (data) => {
    let playerUsername = data.username

    if(playerUsername === username) {
        return
    }

    let posX = data.posX
    let posY = data.posY
    let rotation = data.rotation

    players[playerUsername] = {posX: posX, posY: posY, rotation: rotation}

    let newPlayerRectData = {
        id: playerUsername,
        fill: 'red',
        width: 20,
        height: 20,
        top: posY,
        left: posX,
        angle: rotation,
        originX: 'center',
        originY: 'center',}

    let newPlayerRect = new fabric.Rect(newPlayerRectData)

    console.log(newPlayerRect)

    canvas.add(newPlayerRect)
})