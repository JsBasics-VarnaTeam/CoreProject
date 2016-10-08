fabric.Object.prototype.getAngleInRadians = function () {
  return this.getAngle() / 180 * Math.PI
}

function canvasGetById (id) {
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

let canvasData = {
  width: width,
  height: height,
  backgroundColor: '#e9e9e9',
  borderWidth: 15
}

function initialRender (canvasData, rectData) {
    // console.log(canvasData)
    // console.log(rectData)

// create canvas object
  canvas = new fabric.StaticCanvas('canvas', canvasData)

  canvas.setBackgroundImage('/assets/background.jpg', canvas.renderAll.bind(canvas), {
    backgroundImageStretch: false
  })
}

initialRender(canvasData)
