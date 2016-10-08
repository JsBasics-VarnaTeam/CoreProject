fabric.Object.prototype.getAngleInRadians = function() {
    return this.getAngle() / 180 * Math.PI
}

function canvasGetById(id) {
    let object = null
    let objects = canvas.getObjects()

    for (let obj of objects) {
        if (obj.id === id) {
            return obj
        }
    }
}

let width = 1200
let height = 600
let canvas = null
// let rect = null

//get random int so every new player spawns on a random location
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min
// }
/**
 *
 * @param rect
 * @param top if left null, a random will be chosen
 * @param left if left null, a random will be chosen
 */
// function addPossitionPropertiesToRect(rect, top = null, left = null) {
//     rect['top'] = top || getRandomInt(0, height)
//     rect['left'] = left || getRandomInt(0, width)
// }

let canvasData = {
    width: width,
    height: height,
    backgroundColor : '#e9e9e9'}

// let rectData = {
//     fill: 'red',
//     width: 20,
//     height: 20,
//     originX: 'center',
//     originY: 'center',}

function initialRender(canvasData, rectData) {
    // console.log(canvasData)
    // console.log(rectData)

// create canvas object
    canvas = new fabric.StaticCanvas('canvas', canvasData)
// create a rectangle object
//     rect = new fabric.Rect(rectData)
//
//     addPossitionPropertiesToRect(rect)
//
// // "add" rectangle onto canvas
//     canvas.add(rect)
}

initialRender(canvasData)

// client.emit('ready', {x: rect.getLeft(), y: rect.getTop(), rotation: rect.getAngle()})
