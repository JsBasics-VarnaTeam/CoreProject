/**
 * Created by Krasimir on 10/7/2016.
 */
module.exports = (io, client, data) => {
    client.broadcast.emit('pre-update', {id: client.id, up: data.up, down: data.down, left: data.left, right: data.right, time: new Date().getTime()})

    let offset = new Date().getTime() - (data.time  + data.lat / 2)

    let moves = offset / 30
    moves = moves < 1 ? 1 : moves
    // console.log('moves: ' + moves)
    let speed = 3

    let i
    for(i = 0; i < moves; i++) {
        let player = {
            x: io.activePlayers[client.id].x,
            y: io.activePlayers[client.id].y,
            rotation: io.activePlayers[client.id].rotation,
        }

        if(data.left) {
            player.rotation -= speed
        }
        if(data.right) {
            player.rotation += speed
        }
        if(data.up) {
            player.x -= Math.cos(Math.getAngleInRadians(player.rotation)) * speed
            player.y -= Math.sin(Math.getAngleInRadians(player.rotation)) * speed
        }
        if(data.down) {
            player.x += Math.cos(Math.getAngleInRadians(player.rotation)) * speed
            player.y += Math.sin(Math.getAngleInRadians(player.rotation)) * speed
        }

        if(checkCollisions(player, io, client))
            return

        io.activePlayers[client.id].x = player.x
        io.activePlayers[client.id].y = player.y
        io.activePlayers[client.id].rotation = player.rotation
    }
}

function doPolygonsIntersect (a, b) {
    var polygons = [a, b];
    // console.log(polygons)
    var minA, maxA, projected, i, i1, j, minB, maxB;

    for (i = 0; i < polygons.length; i++) {
        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        // console.log(polygons)
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1++) {

            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % polygon.length;
            var p1 = polygon[i1];
            var p2 = polygon[i2];

            // find the line perpendicular to this edge
            var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

            minA = maxA = undefined;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            for (j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if (minA === undefined || projected < minA) {
                    minA = projected;
                }
                if (maxA === undefined || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = undefined;
            for (j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if (minB === undefined || projected < minB) {
                    minB = projected;
                }
                if (maxB === undefined || projected > maxB) {
                    maxB = projected;
                }
            }

            if (maxA < minB || maxB < minA) {
                return false;
            }
        }
    }
    return true;
};

function rotatePoint(pivot, point, angle) {
    // Rotate clockwise, angle in radians
    let x = Math.round((Math.cos(angle) * (point[0] - pivot[0])) -
            (Math.sin(angle) * (point[1] - pivot[1])) +
            pivot[0]),
        y = Math.round((Math.sin(angle) * (point[0] - pivot[0])) +
            (Math.cos(angle) * (point[1] - pivot[1])) +
            pivot[1]);
    return [x, y];
}

function checkCollisions(player, io, client) {
    let tl = {x: player.x - 30, y: player.y - 20}
    let tr = {x: tl.x + 60, y: tl.y}
    let br = {x: tl.x + 60, y: tl.y + 40}
    let bl = {x: tl.x, y: tl.y + 40}

    let radians = Math.getAngleInRadians(player.rotation)

    let rtl = rotatePoint([player.x, player.y], [tl.x, tl.y], radians)
    let rtr = rotatePoint([player.x, player.y], [tr.x, tr.y], radians)
    let rbr = rotatePoint([player.x, player.y], [br.x, br.y], radians)
    let rbl = rotatePoint([player.x, player.y], [bl.x, bl.y], radians)

    let id
    for(id in io.activePlayers) {
        if(id === client.id) continue
        let playerf = {
            x: io.activePlayers[id].x,
            y: io.activePlayers[id].y,
            rotation: io.activePlayers[id].rotation,
        }

        let tlf = {x: playerf.x - 30, y: playerf.y - 20}
        let trf = {x: tlf.x + 60, y: tlf.y}
        let brf = {x: tlf.x + 60, y: tlf.y + 40}
        let blf = {x: tlf.x, y: tlf.y + 40}

        let radiansf = Math.getAngleInRadians(playerf.rotation)

        let rtlf = rotatePoint([playerf.x, playerf.y], [tlf.x, tlf.y], radiansf)
        let rtrf = rotatePoint([playerf.x, playerf.y], [trf.x, trf.y], radiansf)
        let rbrf = rotatePoint([playerf.x, playerf.y], [brf.x, brf.y], radiansf)
        let rblf = rotatePoint([playerf.x, playerf.y], [blf.x, blf.y], radiansf)


        if(doPolygonsIntersect([{x: rtl[0] ,y: rtl[1]}, {x: rtr[0], y: rtr[1]}, {x: rbr[0], y: rbr[1]}, {x: rbl[0], y: rbl[1]}],
                [{x: rtlf[0] ,y: rtlf[1]}, {x: rtrf[0], y: rtrf[1]}, {x: rbrf[0], y: rbrf[1]}, {x: rblf[0], y: rblf[1]}])) {
            return true
        }
    }

    if(rtl[0] > 1200 || rtl[1] > 600 || rtl[0] < 0 || rtl[1] < 0
        || rtr[0] > 1200 || rtr[1] > 600 || rtr[0] < 0 || rtr[1] < 0
        || rbr[0] > 1200 || rbr[1] > 600 || rbr[0] < 0 || rbr[1] < 0
        || rbl[0] > 1200 || rbl[1] > 600 || rbl[0] < 0 || rbl[1] < 0)
        return true

    let l
    for(l of io.map) {
        if(doPolygonsIntersect([{x: rtl[0] ,y: rtl[1]}, {x: rtr[0], y: rtr[1]}, {x: rbr[0], y: rbr[1]}, {x: rbl[0], y: rbl[1]}],
                [{x: l.x1, y: l.y1},{x: l.x2, y: l.y2}])) {
            return true
        }
    }
}


