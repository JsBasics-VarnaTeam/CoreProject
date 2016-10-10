/**
 * Created by Krasimir on 10/5/2016.
 */
module.exports = (io, client, username) => {
  if (!username) {
    io.to(client.id).emit('rejected', 'You did not provide username!')
    client.disconnect()
    return false
  }

  let x = getRandomInt(100, 1100)
  let y = getRandomInt(100, 500)
  let rotation = getRandomInt(0, 360)

  io.activePlayers[client.id] = {
    username: username,
    bullets: [],
    x: x,
    y: y,
    rotation: rotation}

  io.to(client.id).emit('accepted')

  console.log('client ' + username + ' connected')

  return true
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
