/**
 * Created by Krasimir on 10/5/2016.
 */
let updatesPerSecond = 35
let updateInterval = 1000 / updatesPerSecond

module.exports = (io) => {
  setInterval(() => {
    io.emit('update', {activePlayers: io.activePlayers})
  }, updateInterval)
}

