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
  console.log('activeBullets')
  console.log(activeBullets)
  for(shooterId in activeBullets){
      let bullet
      for(bullet of activeBullets[shooterId]){
        console.log('bullet')
        console.log(bullet)
        // let newBullet = new fabric.Circle({
        //     left:bullet.posX,
        //     top:bullet.posY,
        //     angle: bullet.angle,
        //     radius:5,
        //     stroke:'red',
        //     strokeWidth:3,
        //     fill:'white'
        // });
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
        console.log('newBullet')
        console.log(newBullet)
        console.log('top and left')
        console.log(newBullet.getTop())
        console.log(newBullet.getLeft())
        canvas.add(newBullet)
      }
  }
  canvas.renderAll()
})
