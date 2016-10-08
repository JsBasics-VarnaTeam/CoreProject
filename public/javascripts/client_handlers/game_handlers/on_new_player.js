/**
 * Created by Krasimir on 10/5/2016.
 */

// receives data needed to add new player
// every time such joins
client.on('new-player', (data) => {
  if (data.id === clientId) {
    return
  }

  let newPlayerUsername = data.username
  let posX = data.posX
  let posY = data.posY
  let rotation = data.rotation

  players[data.id] = {username: newPlayerUsername, posX: posX, posY: posY, rotation: rotation}

  let newPlayerRectData = {
    id: data.id,
    width: 80,
    height: 60,
    top: posY,
    left: posX,
    angle: rotation,
    originX: 'center',
    originY: 'center' }

  let imgElement = document.getElementById('my-image')
  let newPlayerRect = new fabric.Image(imgElement, newPlayerRectData)

  players[data.id].gameObj = newPlayerRect

  console.log(newPlayerRect)

  canvas.add(players[data.id].gameObj)
})
