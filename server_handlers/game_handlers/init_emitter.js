/**
 * Created by Krasimir on 10/6/2016.
 */
module.exports = (io, client) => {
  console.log(io.activePlayers)
  io.to(client.id).emit('init-data', {activePlayers: io.activePlayers})
}
