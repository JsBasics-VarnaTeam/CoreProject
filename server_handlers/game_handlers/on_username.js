/**
 * Created by Krasimir on 10/5/2016.
 */
module.exports = (io, client, username) => {
    if(io.allUsernames[username]) {
        io.to(client.id).emit('rejected','Username already in use!')
        io.clientsCount--
        client.disconnect()
        return false
    }

    client.username = username
    io.activePlayers[username] = {}

    io.allUsernames[username] = true
    io.allClients[client.id] = {username: username}

    io.to(client.id).emit('accepted')

    console.log('client ' + username + ' connected')
    return true
}