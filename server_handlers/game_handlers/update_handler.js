/**
 * Created by ivans on 09-Oct-16.
 */

let updatesPerSecond = 66
let updateInterval = 1000 / updatesPerSecond
let pixelPerStep = 6

module.exports = (io) => {
    setInterval(() => {
        let activeBullets = io.activeBullets
        let shooterId
        for(shooterId in activeBullets) {
            let bulletId
            let forDeletion = [];
            for (bulletId in activeBullets[shooterId]) {
                let bullet = activeBullets[shooterId][bulletId]
                let posX = bullet['left'] += bullet['xOffset']/updateInterval;
                let posY = bullet['top'] += bullet['yOffset']/updateInterval;
                //simple check if we are out of bounds of canvas
                if(posX<0 || posX>1200 || posY < 0 || posY > 600){
                    console.log('pushing id')
                    console.log(bulletId)
                    forDeletion.push(bulletId)
                }
            }
            let deletion
            for(deletion in forDeletion){
                activeBullets[shooterId].splice(deletion,1)
                if(activeBullets[shooterId].length==0){
                    delete activeBullets[shooterId]
                }
            }
        }
    }, updateInterval)
}

