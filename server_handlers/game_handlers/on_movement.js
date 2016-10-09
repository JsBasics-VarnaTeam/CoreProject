/**
 * Created by Krasimir on 10/7/2016.
 */
let shouldInitOffsets = true
let xOffset = 0;
let yOffset = 0;
module.exports = (io, client, data) => {
    let offset = new Date().getTime() - (data.time  + (data.lat * 1000) / 2)
    let moves = offset / 15
    moves = moves < 1 ? 1 : moves
    // console.log('moves: ' + moves)
    let speed = 3 * moves
    let turningSpeed = 3 * moves
    //update offsets initially
    if(shouldInitOffsets){
        xOffset = Math.cos(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
        yOffset = Math.sin(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
        shouldInitOffsets = false
    }
    //if left or right is pressed => update offsets
    let shouldUpdateOffsets = false

    if(data.left) {
        io.activePlayers[client.id].rotation -= turningSpeed
        shouldUpdateOffsets = true

    }
    if(data.right) {
        io.activePlayers[client.id].rotation += turningSpeed
        shouldUpdateOffsets = true;
    }
    if(shouldUpdateOffsets){
        xOffset = Math.cos(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
        yOffset = Math.sin(Math.getAngleInRadians(io.activePlayers[client.id].rotation)) * speed
        shouldUpdateOffsets = false;
    }
    if(data.up) {
        io.activePlayers[client.id].posX -= xOffset
        io.activePlayers[client.id].posY -= yOffset
    }
    if(data.down) {
        io.activePlayers[client.id].posX += xOffset
        io.activePlayers[client.id].posY += yOffset
    }
}


