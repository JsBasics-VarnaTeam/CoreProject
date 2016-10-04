
var canvas = new fabric.StaticCanvas('canvas', { width: 1200, height: 600 });
canvas.backgroundColor = 'rgb(100,100,200)'
//radians are needed for movement
fabric.Object.prototype.getAngleInRadians = function() {
    return this.getAngle() / 180 * Math.PI;
};

// create a rectangle object
var rect = new fabric.Rect({
    left: 200,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20,
    originX: 'center',
    originY: 'center',
});

// "add" rectangle onto canvas
canvas.add(rect);

