/**
 * Created by Krasimir on 10/5/2016.
 */
module.exports = (io, client) => {
    let username = client.username

    if(username) {
        console.log('client ' + client.username + ' disconnected')
        delete io.allUsernames[username]
        delete io.activePlayers[username]
    }

    delete io.allClients[client.id]
}