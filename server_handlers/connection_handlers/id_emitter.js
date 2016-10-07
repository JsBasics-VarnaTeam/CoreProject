/**
 * Created by Krasimir on 10/7/2016.
 */
module.exports = (io, client) => {
    io.to(client.id).emit('my-id', {id: client.id})
}