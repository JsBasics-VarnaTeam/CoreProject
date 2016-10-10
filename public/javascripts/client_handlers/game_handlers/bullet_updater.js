/**
 * Created by Krasimir on 10/10/2016.
 */
// setInterval(() => {
//     let id
//     for(id in players) {
//         if(!players[id]) return
//         if(players[id].bullets.length === 0) continue
//
//         let i = players[id].bullets.length
//         while(i--) {
//             players[id].bullets[i].x -= players[id].bullets[i].xOffset
//             players[id].bullets[i].y -= players[id].bullets[i].yOffset
//             players[id].bullets[i].gameObj
//                 .set({
//                     'left': players[id].bullets[i].x,
//                     'top': players[id].bullets[i].y
//                 })
//
//             if(players[id].bullets[i].x < 0
//                 || players[id].bullets[i].y < 0
//                 || players[id].bullets[i].x > 1200
//                 || players[id].bullets[i].y > 600) {
//
//                 canvas.remove(players[id].bullets[i].gameObj)
//
//                 players[id].bullets.splice(i, 1)
//             }
//         }
//     }
// }, movementInterval)