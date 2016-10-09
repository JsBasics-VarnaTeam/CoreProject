// player must click on canvas before key presses are registered
let canvasWrapper = document.getElementById('canvas-wrapper')
canvasWrapper.tabIndex = 1000
canvasWrapper.addEventListener('keydown', onKeyDown, false)
canvasWrapper.addEventListener('keyup', onKeyUp, false)
canvasWrapper.style.outline = 'none'

let pressed = {}
let movementInterval = 33
// TODO find a way to init these with accurate values
// eg.
// Math.cos(angleInRadians(angle)) * speed
// Math.sin(angleInRadians(angle)) * speed
let shouldInitOffsets = true
let xOffset = 0;
let yOffset = 0;


setInterval(() => {
  if (players[clientId] && Object.keys(pressed).length > 0) {

      client.emit('movement', {
          up: pressed[38],
          down: pressed[40],
          left: pressed[37],
          right: pressed[39],
          time: new Date().getTime(),
          lat: avglat
      })

    let speed = 3
    let turningSpeed = 3

    if(shouldInitOffsets){
      xOffset = Math.cos(angleInRadians(players[clientId].rotation)) * speed
      yOffset = Math.sin(angleInRadians(players[clientId].rotation)) * speed
      shouldInitOffsets = false
    }

    let key = null
    for (key in pressed) {
            // fabric rect obj works with angles in degrees
      let angle = players[clientId].rotation
            // x is left in fabric
      let x = players[clientId].posX
            // y is top in fabric
      let y = players[clientId].posY

      let shouldUpdateOffsets = false;
            // Left key
      if (key == 37) {
        angle -= turningSpeed
        shouldUpdateOffsets = true;

      }
            // Right key
      if (key == 39) {
        angle += turningSpeed
        shouldUpdateOffsets = true
      }
      //if angle is changed => update offsets
      // further optimisation possible if condition is true only when
      // up or down key pressed ( thats the only time we need to update offsets )
      if(shouldUpdateOffsets){
        xOffset = Math.cos(angleInRadians(angle)) * speed
        yOffset = Math.sin(angleInRadians(angle)) * speed
        shouldUpdateOffsets = false
      }
          // Up key
      if (key == 38) {
        console.log(xOffset)
        console.log(yOffset)
        x -= xOffset
        y -= yOffset
      }
          // Down key
      if (key == 40) {
        x += xOffset
        y += yOffset
      }
      players[clientId].posX = x
      players[clientId].posY = y
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

  if (code === 32) {
        // space key registered
        // logic for space (#puckane maika)
        // don't return! (or you will disallow chaining movement and shooting)
    e.preventDefault()
    client.emit('fire')
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

function angleInRadians (angle) {
  return angle / 180 * Math.PI
}
