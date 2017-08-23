//Paddle class
function Paddle(x, y, width, height, upKey, downKey) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    var dy = 3;


    //codes of the keys allowing player to go up/down
    this.upKey = upKey;
    this.downKey = downKey;

    //indicates how the bar must move (1 = down, 0 = don't move, -1 = up)
    this.direction = 0;

    //move the bar according to the key pressed. Doesn't move if the user tries to get out of the canvas or if no key is pressed
    this.move() {
        if(/*keyUp pressed*/false && y > 0) {
            y-=dy;
        }
        if(/*keyDown pressed*/false && y+height < canvas.height) {
            y+=dy;
        }
    }
}
