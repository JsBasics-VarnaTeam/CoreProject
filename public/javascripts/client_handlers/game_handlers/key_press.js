// player must click on canvas before key presses are registered
let canvasWrapper = document.getElementById('canvas-wrapper')
canvasWrapper.tabIndex = 1000
canvasWrapper.addEventListener("keydown", onKeyDown, false)
canvasWrapper.addEventListener("keyup", onKeyUp, false)
canvasWrapper.style.outline = "none"

let pressed = []
let movementInterval = 15

// speed
let speed = 2
let turningSpeed = 2

setInterval(() => {
    let key = null
    for(key in pressed) {
        // fabric rect obj works with angles in degrees
        let angle = rect.getAngle()
        // x is left in fabric
        let x = rect.getLeft()
        // y is top in fabric
        let y = rect.getTop()

        //Up key
        if (key == 38) {
            x -= Math.cos(rect.getAngleInRadians()) * speed
            y -= Math.sin(rect.getAngleInRadians()) * speed
        }
        //Down key
        if (key == 40) {
            x += Math.cos(rect.getAngleInRadians()) * speed
            y += Math.sin(rect.getAngleInRadians()) * speed
        }
        //Left key
        if (key == 37) {
            angle -= turningSpeed
        }
        //Right key
        if (key == 39) {
            angle += turningSpeed
        }

        client.emit('movement', {x: x, y: y, angle: angle})

        rect.set({
            // left is x
            'left': x,
            // top is y
            'top': y,
            'angle': angle
        })



        canvas.renderAll()
    }
}, movementInterval)

// spacebar and enter are independent
// and their logic should be out of the interval callback
function onKeyDown(e) {
    e = e || window.event
    let code = e.keyCode

    if(code == 	13) {
        // enter key registered
        // logic for enter
        e.preventDefault()
    }

    if(code == 32) {
        // space key registered
        // logic for space (#puckane maika)
        // don't return! (or you will disallow chaining movement and shooting)
        e.preventDefault()
        client.emit('fire', {x: rect.getLeft, y: rect.getTop(), rotation: rect.getAngle()})
    }

    if(!(code > 36 && code < 41)){
        return
    }

    e.preventDefault()
    pressed[code] = true
}

function onKeyUp(e) {
    e = e || window.event

    if(pressed[e.keyCode]) {
        delete pressed[e.keyCode]
    }
}