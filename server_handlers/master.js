/**
 * Created by Krasimir on 10/2/2016.
 */
module.exports = (io) => {
  io.activePlayers = {}
  io.map = []

  require('./connection_handlers/on_connection')(io)
  require('./game_handlers/map_generator')(io)
  require('./game_handlers/update_emitter')(io)
}
