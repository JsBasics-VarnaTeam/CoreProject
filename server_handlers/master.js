/**
 * Created by Krasimir on 10/2/2016.
 */
Math.getAngleInRadians = function (angle) {
  return angle / 180 * Math.PI
}

module.exports = (io) => {
  io.activePlayers = {}
  io.map = []
  io.activeBullets = {}

  require('./connection_handlers/on_connection')(io)
  require('./game_handlers/map_generator')(io)
  require('./game_handlers/update_emitter')(io)
}
