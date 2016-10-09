/**
 * Created by ivans on 09-Oct-16.
 */

let updatesPerSecond = 66
let updateInterval = 1000 / updatesPerSecond
let pixelPerStep = 6
let speed = 6/updateInterval

module.exports = (io) => {
    setInterval(() => {
        let activeBullets = io.activeBullets
        let shooterId
        for(shooterId in activeBullets) {
            let bullet
            for (bullet of activeBullets[shooterId]) {
                bullet['left'] += bullet['xOffset']/updateInterval;
                bullet['top'] += bullet['yOffset']/updateInterval;
            }
        }
    }, updateInterval)
}
