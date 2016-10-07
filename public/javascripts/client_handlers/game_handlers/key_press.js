// player must click on canvas before key presses are registered
let canvasWrapper = document.getElementById('canvas-wrapper')
canvasWrapper.tabIndex = 1000
canvasWrapper.addEventListener("keydown", onKeyDown, false)
canvasWrapper.addEventListener("keyup", onKeyUp, false)
canvasWrapper.style.outline = "none"

let pressed = {}
let movementInterval = 33

setInterval(() => {
    if(players[clientId] && Object.keys(pressed).length > 0) {
        let speed = 3
        let turningSpeed = 3

        let key = null
        for (key in pressed) {
            // fabric rect obj works with angles in degrees
            let angle = players[clientId].rotation
            // x is left in fabric
            let x = players[clientId].posX
            // y is top in fabric
            let y = players[clientId].posY
            //Up key
            if (key == 38) {
                x -= Math.cos(angleInRadians(angle)) * speed
                y -= Math.sin(angleInRadians(angle)) * speed
            }
            //Down key
            if (key == 40) {
                x += Math.cos(angleInRadians(angle)) * speed
                y += Math.sin(angleInRadians(angle)) * speed
            }
            //Left key
            if (key == 37) {
                angle -= turningSpeed
            }
            //Right key
            if (key == 39) {
                angle += turningSpeed
            }

            players[clientId].posX = x
            players[clientId].posY = y
            players[clientId].rotation = angle

            players[clientId]
                .gameObj
                .set({'left': players[clientId].posX,
                        'top': players[clientId].posY,
                        'angle': players[clientId].rotation})

        }

        client.emit('movement', {
            x: players[clientId].posX,
            y: players[clientId].posY,
            rotation: players[clientId].rotation,
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
        client.emit('fire')
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

function angleInRadians(angle) {
    return angle / 180 * Math.PI
}