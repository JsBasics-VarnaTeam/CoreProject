/**
 * Created by Krasimir on 10/12/2016.
 */
client.on('death', (data) => {
    document.getElementById(data.id).innerHTML = data.player.username + ' deaths: ' + data.player.deaths
})