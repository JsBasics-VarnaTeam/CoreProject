var pressedKeys = [];
onkeydown = onkeyup = function(e){
    // to deal with IE
    console.log(e)
    e = e || event;
    var code = e.keyCode;

    //if any key we want to catch is pressed down => prevent default (scroll)
    if(e.type == 'keydown' && (code==37 || code == 38 || code == 39 || code == 40)) {
        e.preventDefault();
        pressedKeys[e.keyCode] = e.type == 'keydown';
    }
    else{
        delete pressedKeys[e.keyCode];
        return
    }

    console.log(pressedKeys);
    /* insert conditional here */
    console.log(pressedKeys.length);
    for (let code in pressedKeys) {
        console.log(code);
        let angleOffset = 0;
        let leftOffset = 0;
        let topOffset = 0;
        //pixel per step
        let speed = 2;
        //Up key
        if(code==38) {
            topOffset -= speed * Math.cos(rect.getAngleInRadians());
            leftOffset += speed * Math.sin(rect.getAngleInRadians());
        }
        //Down key
        if(code==40){
            topOffset += speed * Math.cos(rect.getAngleInRadians());
            leftOffset -= speed * Math.sin(rect.getAngleInRadians());
        }
        //Left key
        if(code==37) {
            angleOffset -= speed;
        }
        //Right key
        if(code==39){
            angleOffset += speed
        }

        rect.set({'left': rect.getLeft() + leftOffset, 'top': rect.getTop() + topOffset, 'angle': rect.getAngle() + angleOffset});

        canvas.renderAll();
    }

}
