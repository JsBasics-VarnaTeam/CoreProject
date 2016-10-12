/**
 * Created by Krasimir on 10/6/2016.
 */

// Receives the initial data a player needs
// to load himself and other players
client.on('init-data', (data) => {
  let id
  for (id in data.activePlayers) {
    let para = document.createElement('p')
    para.setAttribute('id', id)
    para.innerText = data.activePlayers[id].username + ': ' + data.activePlayers[id].score
    document.getElementById('results-wrapper').appendChild(para)

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

    let newPlayerRectData = {
      id: id,
      width: 60,
      height: 40,
      top: data.activePlayers[id].y,
      left: data.activePlayers[id].x,
      angle: data.activePlayers[id].rotation,
      originX: 'center',
      originY: 'center'
    }

    let imgElement = document.getElementById('my-image')
    let gameObj = new fabric.Image(imgElement, newPlayerRectData)
    console.log(gameObj)
    players[id] = {
        username: data.activePlayers[id].username,
        bullets: bullets,
        x: data.activePlayers[id].x,
        y: data.activePlayers[id].y,
        rotation: data.activePlayers[id].rotation,
        gameObj: gameObj
    }

    canvas.add(players[id].gameObj)
    console.log(gameObj.oCoords.tl)
  }

  canvas.renderAll()
})
