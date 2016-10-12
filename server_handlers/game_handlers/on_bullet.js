/**
 * Created by Krasimir on 10/10/2016.
 */
let defBulletLife = 8000

module.exports = (io, client, data) => {
    if(io.activePlayers[client.id].bullets.length > 3) return

    let bullet = {x: data.x, y: data.y, xOffset: data.xOffset, yOffset: data.yOffset, life: defBulletLife}

    let i = 8
    while(i--) {
        bullet.x -= bullet.xOffset
        bullet.y -= bullet.yOffset

        let mc = checkCollisionMap(io, bullet)

        if(mc === 'v') {
            bullet.xOffset = -bullet.xOffset
        } else if(mc === 'h') {
            bullet.yOffset = -bullet.yOffset
        }
    }

    io.activePlayers[client.id].bullets.push(bullet)
}

function interceptCircleLineSeg(circle, line){
    let a, b, c, d, u1, u2, v1, v2;
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