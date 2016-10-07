/**
 * Created by Krasimir on 10/7/2016.
 */
client.on('disconnected-player', (data) => {
    let cObj = canvasGetById(data.id)
    if(cObj) {
        canvas.remove(cObj)
    }

    if(players[data.id]) {
        delete players[data.id]
    }
})