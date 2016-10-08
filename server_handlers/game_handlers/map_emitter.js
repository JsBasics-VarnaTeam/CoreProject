module.exports = (io) => {
  io.emit('new-map', {
    map: io.map
  })
}
