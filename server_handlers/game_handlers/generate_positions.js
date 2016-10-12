/**
 * Created by Krasimir on 10/12/2016.
 */
module.exports = (io, client) => {
    while(true) {
        let collides = false

        let x = getRandomInt(100, 1100)
        let y = getRandomInt(100, 500)
        let rotation = getRandomInt(0, 360)

        let player = {
            x: x,
            y: y,
            rotation: rotation,
        }

        let tl = {x: player.x - 30, y: player.y - 20}
        let tr = {x: tl.x + 60, y: tl.y}
        let br = {x: tl.x + 60, y: tl.y + 40}
        let bl = {x: tl.x, y: tl.y + 40}

        let radians = Math.getAngleInRadians(player.rotation)

        let rtl = rotatePoint([player.x, player.y], [tl.x, tl.y], radians)
        let rtr = rotatePoint([player.x, player.y], [tr.x, tr.y], radians)
        let rbr = rotatePoint([player.x, player.y], [br.x, br.y], radians)
        let rbl = rotatePoint([player.x, player.y], [bl.x, bl.y], radians)

        let l
        for (l of io.map) {
            if (doPolygonsIntersect([{x: rtl[0], y: rtl[1]}, {x: rtr[0], y: rtr[1]}, {x: rbr[0], y: rbr[1]}, {
                        x: rbl[0],
                        y: rbl[1]
                    }],
                    [{x: l.x1, y: l.y1}, {x: l.x2, y: l.y2}])) {
                collides = true
                break
            }
        }

        if(!collides) {
            io.activePlayers[client.id].x = player.x
            io.activePlayers[client.id].y = player.y
            io.activePlayers[client.id].rotation = player.rotation
            io.activePlayers[client.id].bullets = []
            break
        }
    }
}

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


function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}