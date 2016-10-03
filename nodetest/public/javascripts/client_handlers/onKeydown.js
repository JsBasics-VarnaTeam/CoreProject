
window.addEventListener('keydown',this.check,false);
function check(e) {
    let leftOffset = 0;
    let topOffset = 0;
    var code = e.keyCode;
    //if arrow key pressed prevent default (scroll)
    if(code==37 || code == 38 || code == 39 || code == 40){
        e.preventDefault();
    }
    switch (code) {
        //Left key
        case 37:
            leftOffset-=10;
            break;
        //Up key
        case 38:
            topOffset-=10;
            break;
        //Right key
        case 39:
            leftOffset+=10;
            break;
        //Down key
        case 40:
            topOffset+=10;
            break;
    }
    rect.set({'left': rect.getLeft() + leftOffset, 'top': rect.getTop() + topOffset});
    canvas.renderAll();
}