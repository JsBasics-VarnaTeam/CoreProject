/**
 * Created by Krasimir on 10/5/2016.
 */
let updatesPerSecond = 66
let updateInterval = 1000 / updatesPerSecond

module.exports = (io) => {
  setInterval(() => {
    io.emit('update', {activePlayers: io.activePlayers, activeBullets: io.activeBullets, time: new Date().getTime()})
  }, updateInterval)
}
