/**
 * Created by Krasimir on 10/5/2016.
 */
module.exports = (io, client) => {
  let newPlayer = io.activePlayers[client.id]

  io.emit('new-player', {
    id: client.id,
    username: newPlayer.username,
    posX: newPlayer.posX,
    posY: newPlayer.posY,
    rotation: newPlayer.rotation
  })
}
