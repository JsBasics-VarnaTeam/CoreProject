/**
 * Created by Krasimir on 10/10/2016.
 */
module.exports = (io) => {
    setInterval(() => {
        if(Object.keys(io.activePlayers).length === 0) return

        for(let id in io.activePlayers) {
            if(io.activePlayers[id].bullets.length === 0) continue

            let i = io.activePlayers[id].bullets.length
            while(i--) {
                let bullet = {
                        x: io.activePlayers[id].bullets[i].x,
                        y: io.activePlayers[id].bullets[i].y,
                        xOffset: io.activePlayers[id].bullets[i].xOffset,
                        yOffset: io.activePlayers[id].bullets[i].yOffset,
                        life: io.activePlayers[id].bullets[i].life
                    }

                bullet.x -= bullet.xOffset
                bullet.y -= bullet.yOffset
                bullet.life -= 30

                if(bullet.life <= 0) {
                    io.activePlayers[id].bullets.splice(i, 1)
                    continue
                }

                let mc = checkCollisionMap(io, bullet)
                let pk = checkCollisionPlayers(io, bullet)
                if(pk) {
                    console.log(pk)
                    io.activePlayers[id].bullets.splice(i, 1)
                    require('./generate_positions')(io, pk)
                    io.activePlayers[pk].deaths++
                    io.emit('death', {id: pk, player: io.activePlayers[pk]})
                } else if(mc === 'v') {
                    bullet.xOffset = -bullet.xOffset
                    bullet.x -= bullet.xOffset
                    io.activePlayers[id].bullets[i] = bullet
                } else if(mc === 'h') {
                    bullet.yOffset = -bullet.yOffset
                    bullet.y -= bullet.yOffset
                    io.activePlayers[id].bullets[i] = bullet
                } else {
                    io.activePlayers[id].bullets[i] = bullet
                }
            }
        }
    }, 30)
}

function checkCollisionPlayers(io, bullet) {
    let id
    for(id in io.activePlayers) {
        let player = io.activePlayers[id]

        let radians = Math.getAngleInRadians(player.rotation)

        let rect = {x: player.x, y: player.y, rotation: radians}

        if(collideCircleWithRotatedRectangle(bullet, rect)) {
            return id
        }
    }

    return false
}

function checkCollisionMap(io, bullet) {
    if(interceptCircleLineSeg(bullet, {x1: 0, y1: 0, x2: 1200, y2: 0})) {
        return 'h'
    } else if (interceptCircleLineSeg(bullet, {x1: 1200, y1: 0, x2: 1200, y2: 600})) {
        return 'v'
    } else if (interceptCircleLineSeg(bullet, {x1: 1200, y1: 600, x2: 0, y2: 600})) {
        return 'h'
    } else if (interceptCircleLineSeg(bullet, {x1: 0, y1: 600, x2: 0, y2: 0})) {
        return 'v'
    }

    let l
    for(l of io.map) {
        if(interceptCircleLineSeg(bullet, l)) {
            if(l.vertical) {
                return 'v'
            } else {
                return 'h'
            }
        }
    }

    return false
}

function interceptCircleLineSeg(circle, line){
    var a, b, c, d, u1, u2, v1, v2;
    v1 = {};
    v2 = {};
    v1.x = line.x2 - line.x1;
    v1.y = line.y2 - line.y1;
    v2.x = line.x1 - circle.x;
    v2.y = line.y1 - circle.y;
    b = (v1.x * v2.x + v1.y * v2.y);
    c = 2 * (v1.x * v1.x + v1.y * v1.y);
    b *= -2;
    d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - 4 * 4));
    if(isNaN(d)){ // no intercept
        return false;
    }

    u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
    u2 = (b + d) / c;

    if((u1 <= 1 && u1 >= 0) || (u2 <= 1 && u2 >= 0)) {  // add point if on the line segment
        return true
    }

    return false;
}

function collideCircleWithRotatedRectangle (circle, rect) {
    var rectCenterX = rect.x;
    var rectCenterY = rect.y;

    var rectX = rectCenterX - 25;
    var rectY = rectCenterY - 15;

    var rectReferenceX = rectX;
    var rectReferenceY = rectY;

    // Rotate circle's center point back
    var unrotatedCircleX = Math.cos( rect.rotation ) * ( circle.x - rectCenterX ) - Math.sin( rect.rotation ) * ( circle.y - rectCenterY ) + rectCenterX;
    var unrotatedCircleY = Math.sin( rect.rotation ) * ( circle.x - rectCenterX ) + Math.cos( rect.rotation ) * ( circle.y - rectCenterY ) + rectCenterY;

    // Closest point in the rectangle to the center of circle rotated backwards(unrotated)
    var closestX, closestY;

    // Find the unrotated closest x point from center of unrotated circle
    if ( unrotatedCircleX < rectReferenceX ) {
        closestX = rectReferenceX;
    } else if ( unrotatedCircleX > rectReferenceX + 50 ) {
        closestX = rectReferenceX + 50;
    } else {
        closestX = unrotatedCircleX;
    }

    // Find the unrotated closest y point from center of unrotated circle
    if ( unrotatedCircleY < rectReferenceY ) {
        closestY = rectReferenceY;
    } else if ( unrotatedCircleY > rectReferenceY + 30 ) {
        closestY = rectReferenceY + 30;
    } else {
        closestY = unrotatedCircleY;
    }

    // Determine collision
    var distance = getDistance( unrotatedCircleX, unrotatedCircleY, closestX, closestY );
    return distance < 4;
}

function getDistance( fromX, fromY, toX, toY ) {
    var dX = Math.abs( fromX - toX );
    var dY = Math.abs( fromY - toY );

    return Math.sqrt( ( dX * dX ) + ( dY * dY ) );
}