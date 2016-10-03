/**
 * Created by Krasimir on 10/3/2016.
 */
var canvas = new fabric.StaticCanvas('canvas', { width: 1200, height: 800 });
canvas.backgroundColor = 'rgb(100,100,200)'

// create a rectangle object
var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
});

// "add" rectangle onto canvas
canvas.add(rect);