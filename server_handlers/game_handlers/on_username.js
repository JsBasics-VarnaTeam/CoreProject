/**
 * Created by Krasimir on 10/5/2016.
 */
module.exports = (io, client, username) => {
  if (!username) {
    io.to(client.id).emit('rejected', 'You did not provide username!')
    client.disconnect()
    return false
  }

  io.activePlayers[client.id] = {username: username}

  io.to(client.id).emit('accepted')

  console.log('client ' + username + ' connected')

  return true
}
