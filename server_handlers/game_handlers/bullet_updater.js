/**
 * Created by Krasimir on 10/10/2016.
 */
let cc = 0
module.exports = (io) => {
    setInterval(() => {
        if(Object.keys(io.activePlayers).length === 0) return

        for(let id in io.activePlayers) {
            if(io.activePlayers[id].bullets.length === 0) continue

            let i = io.activePlayers[id].bullets.length
            while(i--) {
                io.activePlayers[id].bullets[i].x -= io.activePlayers[id].bullets[i].xOffset
                io.activePlayers[id].bullets[i].y -= io.activePlayers[id].bullets[i].yOffset

                if(io.activePlayers[id].bullets[i].x < 0
                    || io.activePlayers[id].bullets[i].y < 0
                    || io.activePlayers[id].bullets[i].x > 1200
                    || io.activePlayers[id].bullets[i].y > 600) {

                    io.activePlayers[id].bullets.splice(i, 1)
                }
            }
        }
    }, 25)
}