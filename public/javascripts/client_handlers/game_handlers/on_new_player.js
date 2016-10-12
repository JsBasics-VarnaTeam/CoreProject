/**
 * Created by Krasimir on 10/5/2016.
 */

// receives data needed to add new player
// every time such joins
client.on('new-player', (data) => {
  console.log(data)

  if (data.id === clientId) {
    return
  }

  let para = document.createElement('p')
    para.setAttribute('id', data.id)
    para.innerText = `${data.username}: ${data.score}`
  document.getElementById('results-wrapper').appendChild(para)

  let newPlayerUsername = data.username
  let posX = data.x
  let posY = data.y
  let rotation = data.rotation

  let bullets = []
  for(let bullet of data.bullets) {
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

  players[data.id] = {
    bullets: bullets,
    username: newPlayerUsername,
    x: posX,
    y: posY,
    rotation: rotation
  }

  let newPlayerRectData = {
    id: data.id,
    width: 60,
    height: 40,
    top: posY,
    left: posX,
    angle: rotation,
    originX: 'center',
    originY: 'center' }

  let imgElement = document.getElementById('tank-green')
  let newPlayerRect = new fabric.Image(imgElement, newPlayerRectData)

  players[data.id].gameObj = newPlayerRect

  canvas.add(players[data.id].gameObj)
})
