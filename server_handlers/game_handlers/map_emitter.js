module.exports = (io, client) => {
  io.to(client.id).emit('new-map', {
    map: io.map
  })
}
