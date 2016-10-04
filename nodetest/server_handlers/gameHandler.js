/**
 * Created by ivans on 04-Oct-16.
 */
//get random int so every new player spawns on a random location
let width = 1200
let height = 600
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 *
 * @param rect
 * @param top if left null, a random will be chosen
 * @param left if left null, a random will be chosen
 */
 function addPossitionPropertiesToRect(rect, top = null, left = null) {
    rect['top'] = top || getRandomInt(0, height);
    rect['left'] = left || getRandomInt(0, width);
}

let canvasPropertyObject = {
    width: width,
    height: height,
    backgroundColor : 'rgb(100,100,200)'};

let rectPropertyObject = {
    fill: 'red',
    width: 20,
    height: 20,
    originX: 'center',
    originY: 'center',};

module.exports.canvasPropertyObject = canvasPropertyObject;
module.exports.rectPropertyObject = rectPropertyObject;
module.exports.addPossitionPropertiesToRect = addPossitionPropertiesToRect;