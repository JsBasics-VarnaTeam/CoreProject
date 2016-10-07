/**
 * Created by Krasimir on 10/7/2016.
 */
module.exports = (io, id) => {
    io.activePlayers[id].posX = getRandomInt(0, 1100)
    io.activePlayers[id].posY  = getRandomInt(0, 500)
    io.activePlayers[id].rotation  = getRandomInt(0, 360)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}