/**
 * Created by Krasimir on 10/2/2016.
 */
module.exports = (io) => {
    io.allClients = {}
    io.allUsernames = {}
    io.activePlayers = {}
    // debugging purposes
    io.clientsCount = 0

    require('./connection_handlers/on_connection')(io)
    require('./game_handlers/update_emitter')(io)
}
