//radians are needed for movement
fabric.Object.prototype.getAngleInRadians = function() {
    return this.getAngle() / 180 * Math.PI;
};
let canvas = null;
let rect = null;

function initialRender(canvasData, rectData) {
    console.log(canvasData);
    console.log(rectData);
// create canvas object
    canvas = new fabric.StaticCanvas('canvas', canvasData);
// create a rectangle object
    rect = new fabric.Rect(rectData);

// "add" rectangle onto canvas
    canvas.add(rect);
}


