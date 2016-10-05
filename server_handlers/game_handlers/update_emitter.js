/**
 * Created by Krasimir on 10/5/2016.
 */
let fps = 20
let updateInterval = 1000 / fps

module.exports = (io) => {
    setInterval(() => {
        io.emit('update', {allPlayers: io.activePlayers})
    }, 10)
}



