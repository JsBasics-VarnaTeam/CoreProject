/**
 * Created by Krasimir on 10/5/2016.
 */
// assumed emit rate from server
let assumedUpdateRateMs = 15

// frame buffer
let buffer = []

// receives update ticks
setTimeout(() => {
  client.on('update', (data) => {
        // time difference between server update emit and client data receive
        // takes into consideration the difference in clocks between server computer and client computer
        // (serverTimeOffset)
        let timeDiff = Math.abs(new Date().getTime() - (data.time + serverTimeOffset))

            // assumes updates rate is 66 (every 15 ms)
            // value must be between 0 and 1 or it will be considered
            // hyper interpolation (bad for us)
        let tdPercentage = timeDiff / assumedUpdateRateMs > 1 ? 1 : timeDiff / assumedUpdateRateMs

        // buffer.push({data: data, tdP: tdPercentage})

          // let data = buffer.pop()
          // let tdPercentage = data.tdP
         // data = data.data
          let id
          for (id in players) {
              // position and rotation interpolation (frame of 15 ms)
              // less 'teleporting'
              players[id].posX = players[id].posX + tdPercentage * (data.activePlayers[id].posX - players[id].posX)
              players[id].posY = players[id].posY + tdPercentage * (data.activePlayers[id].posY - players[id].posY)
              players[id].rotation = players[id].rotation + tdPercentage * (data.activePlayers[id].rotation - players[id].rotation)

              // no position / rotation interpolation (if any player lags in the frame he 'teleports' to his next position)
              // players[id].posX = data.activePlayers[id].posX
              // players[id].posY = data.activePlayers[id].posY
              // players[id].rotation = data.activePlayers[id].rotation
              // update player object on canvas
              players[id]
                  .gameObj
                  .set({
                      'left': players[id].posX,
                      'top': players[id].posY,
                      'angle': players[id].rotation
                  })


          }

          let shooterId

      for(shooterId in data.activeBullets) {
          if(!bullets[shooterId]){
              bullets[shooterId] = {}
          }
          let bulletId
          for (bulletId in data.activeBullets[shooterId]) {
              if(!bullets[shooterId][bulletId]){
                  let bullet = bullets[shooterId][bulletId] = data.activeBullets[shooterId][bulletId]
                  let newBullet=new fabric.Circle({
                      left:bullet['left'],
                      top:bullet['top'],
                      xOffset: bullet['xOffset'],
                      yOffset: bullet['yOffset'],
                      angle: bullet['angle'],
                      radius:5,
                      stroke:'red',
                      strokeWidth:3,
                      fill:'white',

                  });
                  if(!bullets[shooterId]){
                      bullets[shooterId] = {}
                  }
                  bullets[shooterId][bulletId]['posX'] = bullet['left']
                  bullets[shooterId][bulletId]['posY'] = bullet['top']
                  bullets[shooterId][bulletId]['xOffset'] = bullet['xOffset']
                  bullets[shooterId][bulletId]['yOffset'] = bullet['yOffset']
                  bullets[shooterId][bulletId]['angle'] = bullet['angle']
                  bullets[shooterId][bulletId]['gameObj'] = newBullet
                  canvas.add(newBullet)
              }

              let bullet = bullets[shooterId][bulletId]
              bullet.posX = bullet.posX + tdPercentage * (data.activeBullets[shooterId][bulletId].posX - bullet.posX)
              bullet.posY = bullet.posY + tdPercentage * (data.activeBullets[shooterId][bulletId].posY - bullet.posY)

              bullets[shooterId][bulletId]
                  .gameObj
                  .set({
                      'left': bullets[shooterId][bulletId].posX,
                      'top': bullets[shooterId][bulletId].posY
                  })

          }
      }

          // keep frame buffer limited to 6 frames of 15ms (~100 ms)
          // if (buffer.length > 6) {
          //     buffer.shift()
          //     // console.log(buffer.length)
          //     // pops frame from buffer (6 frames of 15 ms)
          //     // and draws it (6 frames behind actual data received from server)
          //     let data = buffer.pop()
          //     let tdPercentage = data.tdP
          //     data = data.data
          //
          //     let id
          //     for (id in players) {
          //         // position and rotation interpolation (frame of 15 ms)
          //         // less 'teleporting'
          //         players[id].posX = players[id].posX + tdPercentage * (data.activePlayers[id].posX - players[id].posX)
          //         players[id].posY = players[id].posY + tdPercentage * (data.activePlayers[id].posY - players[id].posY)
          //         players[id].rotation = players[id].rotation + tdPercentage * (data.activePlayers[id].rotation - players[id].rotation)
          //
          //         // no position / rotation interpolation (if any player lags in the frame he 'teleports' to his next position)
          //         // players[id].posX = data.activePlayers[id].posX
          //         // players[id].posY = data.activePlayers[id].posY
          //         // players[id].rotation = data.activePlayers[id].rotation
          //         // update player object on canvas
          //         players[id]
          //             .gameObj
          //             .set({
          //                 'left': players[id].posX,
          //                 'top': players[id].posY,
          //                 'angle': players[id].rotation
          //             })
          //     }
          // }
  })
}, 100)

setInterval(() => {
  canvas.renderAll()
}, 10)
