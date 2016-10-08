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

  let newPlayerData = {
    id: data.id,
    width: 60,
    height: 40,
    top: posY,
    left: posX,
    angle: rotation,
    originX: 'center',
    originY: 'center' }

  let imgElement = document.getElementById('my-image')
  let newPlayer = new fabric.Image(imgElement, newPlayerData)

  players[data.id].gameObj = newPlayer

  console.log(newPlayer)

  canvas.add(players[data.id].gameObj)
})
