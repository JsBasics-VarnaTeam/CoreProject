let pressed = {}
let movementInterval = 30

let speed = 3
let turningSpeed = 3

setTimeout(() => {
// player must click on canvas before key presses are registered
let canvasWrapper = document.getElementById('canvas-wrapper')
canvasWrapper.tabIndex = 1000
canvasWrapper.addEventListener('keydown', onKeyDown, false)
canvasWrapper.addEventListener('keyup', onKeyUp, false)
canvasWrapper.style.outline = 'none'



setInterval(() => {
    if (players[clientId] && Object.keys(pressed).length > 0) {
        client.emit('movement', {
            up: pressed[38],
            down: pressed[40],
            left: pressed[37],
            right: pressed[39],
            time: new Date().getTime() - serverTimeOffset,
            lat: avglat
        })

        let key
        for (key in pressed) {
            // fabric rect obj works with angles in degrees
            let angle = players[clientId].rotation
            // x is left in fabric
            let x = players[clientId].x
            // y is top in fabric
            let y = players[clientId].y
            // Up key
            if (key == 38) {
                x -= Math.cos(angleInRadians(angle)) * speed
                y -= Math.sin(angleInRadians(angle)) * speed
            }
            // Down key
            if (key == 40) {
                x += Math.cos(angleInRadians(angle)) * speed
                y += Math.sin(angleInRadians(angle)) * speed
            }
            // Left key
            if (key == 37) {
                angle -= turningSpeed
            }
            // Right key
            if (key == 39) {
                angle += turningSpeed
            }

            players[clientId].x = x
            players[clientId].y = y
            players[clientId].rotation = angle

            players[clientId]
                .gameObj
                .set({'left': x,
                    'top': y,
                    'angle': angle})
        }
    }
}, movementInterval)


// spacebar and enter are independent
// and their logic should be out of the interval callback
function onKeyDown (e) {
    e = e || window.event
    let code = e.keyCode

    if (code === 13) {
        // enter key registered
        // logic for enter
        e.preventDefault()
    }

    if (code === 88 && players[clientId].bullets.length < 3) {
        // x key registered
        // logic for x (#puckane maika)
        // don't return! (or you will disallow chaining movement and shooting)
        let xOffset = Math.cos(angleInRadians(players[clientId].rotation)) * 5
        let yOffset = Math.sin(angleInRadians(players[clientId].rotation)) * 5
        let startX = players[clientId].x - xOffset * 6
        let startY = players[clientId].y - yOffset * 6

        client.emit('bullet', {
            x: startX,
            y: startY,
            xOffset: xOffset,
            yOffset: yOffset,
            time: new Date().getTime() - serverTimeOffset,
            lat: avglat})


        let bullet = {x: startX, y: startY, xOffset: xOffset, yOffset: yOffset}
        let bulletData = {
            radius: 4,
            fill: 'black',
            left: startX,
            top: startY,
            originX: 'center',
            originY: 'center'
        }

        bullet.gameObj = new fabric.Circle(bulletData)
        players[clientId].bullets.push(bullet)
        canvas.add(bullet.gameObj)
    }

    if (!(code > 36 && code < 41)) {
        return
    }

    e.preventDefault()
    pressed[code] = true
}

function onKeyUp (e) {
    e = e || window.event

    if (pressed[e.keyCode]) {
        delete pressed[e.keyCode]
    }
}

}, 1000)

function angleInRadians (angle) {
  return angle / 180 * Math.PI
}
