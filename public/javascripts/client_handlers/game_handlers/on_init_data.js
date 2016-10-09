/**
 * Created by Krasimir on 10/6/2016.
 */

// Receives the initial data a player needs
// to load himself and other players
client.on('init-data', (data) => {
  let activePlayers = data.activePlayers
  console.log('activePlayers')
  console.log(activePlayers)

  let id
  for (id in activePlayers) {
    players[id] = {}
    players[id].username = activePlayers[id].username
    players[id].posX = activePlayers[id].posX
    players[id].posY = activePlayers[id].posY
    players[id].rotation = activePlayers[id].rotation

    let newPlayerData = {
      id: id,
      width: 60,
      height: 40,
      top: players[id].posY,
      left: players[id].posX,
      angle: players[id].rotation,
      originX: 'center',
      originY: 'center'
    }

    let imgElement = document.getElementById('my-image')
    let newPlayer = new fabric.Image(imgElement, newPlayerData)

    players[id].gameObj = newPlayer
    canvas.add(players[id].gameObj)
  }
  let activeBullets = data.activeBullets
  for(shooterId in activeBullets){
      let bulletId
      for(bulletId in activeBullets[shooterId]){
        let bullet = activeBullets[shooterId][bulletId]
        let newBullet=new fabric.Circle({
          left:bullet['left'],
          top:bullet['top'],
          xOffset: bullet['xOffset'],
          yOffset: bullet['yOffset'],
          angle: bullet['angle'],
          radius:5,
          stroke:'red',
          strokeWidth:3,
          fill:'white',

        });
        if(!bullets[shooterId]){
          bullets[shooterId] = {}
        }
        bullets[shooterId][bulletId]['posX'] = bullet['left']
        bullets[shooterId][bulletId]['posY'] = bullet['top']
        bullets[shooterId][bulletId]['xOffset'] = bullet['xOffset']
        bullets[shooterId][bulletId]['yOffset'] = bullet['yOffset']
        bullets[shooterId][bulletId]['angle'] = bullet['angle']
        bullets[shooterId][bulletId]['gameObj'] = newBullet
        canvas.add(newBullet)
      }
  }
  canvas.renderAll()
})
