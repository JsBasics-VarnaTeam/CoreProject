/**
 * Created by Krasimir on 10/5/2016.
 */

module.exports.hardKick = (io, client) => {
    io.to(client.id).emit('kick', 'You have been kicked because your connection was too slow')
    client.disconnect()
}