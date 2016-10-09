/**
 * Created by ivans on 09-Oct-16.
 */
let maxBulletsPerClient = 3
let speed = 6
module.exports = (io, client) => {
    let bulletXOffset = Math.cos(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
    let bulletYOffset = Math.sin(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
    let newBullet = {
        top: io.activePlayers[client.id].posY,
        left: io.activePlayers[client.id].posX,
        xOffset: bulletXOffset,
        yOffset: bulletYOffset,
        angle: io.activePlayers[client.id].rotation
    }
    console.log(io.activePlayers[client.id].rotation)
    if(!io.activeBullets[client.id]){
        io.activeBullets[client.id] = []
    }
    io.activeBullets[client.id].push(newBullet)
}

