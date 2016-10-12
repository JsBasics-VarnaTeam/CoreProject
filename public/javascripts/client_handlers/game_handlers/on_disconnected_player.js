/**
 * Created by Krasimir on 10/7/2016.
 */
client.on('disconnected-player', (data) => {
  let cObj = canvasGetById(data.id)
  if (cObj) {
    canvas.remove(cObj)
  }

  if(document.getElementById(data.id)) {
    document.getElementById('results-wrapper').removeChild(document.getElementById(data.id))
  }

  if (players[data.id]) {
    for(let bullet of players[data.id].bullets) {
      canvas.remove(bullet.gameObj)
    }
    delete players[data.id]
  }
})
