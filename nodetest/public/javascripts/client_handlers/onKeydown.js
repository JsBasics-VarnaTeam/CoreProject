
window.addEventListener('keydown',this.check,false);
function check(e) {
    let angleOffset = 0;
    let leftOffset = 0;
    let topOffset = 0;
    //pixel per step
    let speed = 1;
    var code = e.keyCode;

    //if arrow key pressed prevent default (scroll)
    if(code==37 || code == 38 || code == 39 || code == 40){
        e.preventDefault();
    }
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
        angleOffset -= 1;
    }
    //Right key
    if(code==39){
        angleOffset += 1
    }

    rect.set({'left': rect.getLeft() + leftOffset, 'top': rect.getTop() + topOffset, 'angle': rect.getAngle() + angleOffset});
    console.log(rect.getAngle());
    canvas.renderAll();
}