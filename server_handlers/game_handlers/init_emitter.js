/**
 * Created by Krasimir on 10/6/2016.
 */
module.exports = (io, client) => {
  io.to(client.id).emit('init-data', {activePlayers: io.activePlayers})
}
