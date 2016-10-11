/**
 * Created by Krasimir on 10/10/2016.
 */
module.exports = (io) => {
    setInterval(() => {
        if(Object.keys(io.activePlayers).length === 0) return

        for(let id in io.activePlayers) {
            if(io.activePlayers[id].bullets.length === 0) continue

            let i = io.activePlayers[id].bullets.length
            while(i--) {
                let bullet = io.activePlayers[id].bullets[i]
                // for(let l of io.map) {
                //     if(l.x1 >= )
                // }
                bullet.x -= bullet.xOffset
                bullet.y -= bullet.yOffset

                if(bullet.x < 0
                    || bullet.y < 0
                    || bullet.x > 1200
                    || bullet.y > 600) {

                    io.activePlayers[id].bullets.splice(i, 1)
                }
            }
        }
    }, 30)
}