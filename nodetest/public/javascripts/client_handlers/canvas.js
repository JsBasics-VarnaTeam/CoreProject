//left = 37
// up = 38
// right = 39
// down = 40
var canvas = new fabric.StaticCanvas('canvas', { width: 1200, height: 600 });
canvas.backgroundColor = 'rgb(100,100,200)'

// create a rectangle object
var rect = new fabric.Rect({
    left: 200,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
});

// "add" rectangle onto canvas
canvas.add(rect);

