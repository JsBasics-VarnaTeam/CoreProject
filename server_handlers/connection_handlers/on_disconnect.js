/**
 * Created by Krasimir on 10/5/2016.
 */
module.exports = (io, client) => {
    console.log('client ' + io.activePlayers[client.id].username + ' disconnected')

    require('../game_handlers/disconnected_player_emitter')(io, client.id)

    delete io.activePlayers[client.id]
}