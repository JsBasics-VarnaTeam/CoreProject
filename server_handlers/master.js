/**
 * Created by Krasimir on 10/2/2016.
 */
module.exports = (io) => {
  io.activePlayers = {}

  require('./connection_handlers/on_connection')(io)
  require('./game_handlers/update_emitter')(io)
}
