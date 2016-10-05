/**
 * Created by Krasimir on 10/5/2016.
 */
let kickTimeoutNoUsername = 6000

module.exports.intervalKick = (io, client) => {
    setTimeout(
        () => {
            if (!client.username) {
                io.to(client.id).emit('kick', 'You have been kicked cuz u have no username')
                client.disconnect()
            }
        }, kickTimeoutNoUsername)
}

module.exports.hardKick = (io, client) => {
    io.to(client.id).emit('kick', 'You have been kicked because your connection was too slow')
    client.disconnect()
}