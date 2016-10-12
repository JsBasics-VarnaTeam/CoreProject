/**
 * Created by Krasimir on 10/5/2016.
 */
module.exports = (io, client) => {
  let newPlayer = io.activePlayers[client.id]

  client.broadcast.emit('new-player', {
    id: client.id,
    username: newPlayer.username,
    x: newPlayer.x,
    y: newPlayer.y,
    rotation: newPlayer.rotation,
    bullets: newPlayer.bullets,
    score: newPlayer.score
  })
}
