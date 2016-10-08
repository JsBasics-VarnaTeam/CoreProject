/**
 * Created by Krasimir on 10/7/2016.
 */
module.exports = (io, id) => {
  io.emit('disconnected-player', {id: id})
}
