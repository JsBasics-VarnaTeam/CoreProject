/**
 * Created by Krasimir on 10/6/2016.
 */

// Receives the initial data a player needs
// to load himself and other players
client.on('init-data', (data) => {
  let id
  for (id in data.activePlayers) {
    let bullets = []
    for(let bullet of data.activePlayers[id].bullets) {
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

    data.activePlayers[id].x = Math.floor(data.activePlayers[id].x)
    data.activePlayers[id].y = Math.floor(data.activePlayers[id].y)
    data.activePlayers[id].rotation = Math.floor(data.activePlayers[id].rotation)

    let newPlayerRectData = {
      width: 60,
      height: 40,
      top: data.activePlayers[id].y,
      left: data.activePlayers[id].x,
      angle: data.activePlayers[id].rotation,
      originX: 'center',
      originY: 'center'
    }

    console.log('RECT DATA')
    console.log(newPlayerRectData)

    let imgElement = document.getElementById('my-image')
    let gameObj = new fabric.Image(imgElement, newPlayerRectData)

    newPlayer = {
        username: data.activePlayers[id].username,
        bullets: bullets,
        x: data.activePlayers[id].x,
        y: data.activePlayers[id].y,
        rotation: data.activePlayers[id].rotation,
        gameObj: gameObj
    }

    console.log(isNaN(newPlayer.x))
    console.log(newPlayer)
    console.log(newPlayer.x)

    players[id] = newPlayer
    console.log(players[id])

    canvas.add(players[id].gameObj)
  }

  canvas.renderAll()
})
