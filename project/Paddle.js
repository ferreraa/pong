//Paddle class
function Paddle(x, y, width, height, upKey, downKey, style = 'blue') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.style = style;

    //speed of the bar
    var dy = 3;

    //indicates how the bar must move (1 = down, 0 = don't move, -1 = up)
    this.direction = 0;

    //needed in private functions.
    var that = this;


    //codes of the keys allowing player to go up/down
    this.upKey = upKey;
    this.downKey = downKey;



    //if a ball collides with this paddle, it must stop the paddle so the ball can't enter it.
    var stopNextMove = false;

    this.stopPaddle = function() {
        stopNextMove = true;
    }

    //move the bar according to the key pressed. Doesn't move if the user tries to get out of the canvas or if no key is pressed
    this.move = function() {
        if(stopNextMove) {
            stopNextMove = false;
            return;
        }

        var futureY = this.y + dy*this.direction;
        if(futureY > 0 && futureY + this.height < canvas.height) {
            this.y = futureY;
        }
    }

    this.draw = function() {
        c.beginPath();
        c.fillStyle = this.style;
        c.rect(this.x, this.y, this.width, this.height);
        c.stroke();
        c.fill();

    }



    /**

        USELESS!!!

        function returning the rectangles representing the hitbox of the paddle (if a ball gets inside => collision)
        result: array[left, right, top, bottom].
        The structure of a rectangle is: {x,y, w,h}.
        The thickness of the rectangles depend on the ball's speed
    **/
    this.getHitBoxes = function(ball) {
        //retrieve the ball's speed
        var ballDX = ball.velocity[0];
        var ballDY = ball.velocity[1];

        var result = new Array();
        result[0] = {   
            x:this.x,
            y:this.y,
            w:ballDX,
            h:this.height
        };

        result[1] = {
            x:this.x + this.width - ballDX,
            y:this.y,
            w:ballDX,
            h:this.height
        };


        result[2] = {
            x:this.x,
            y:this.y,
            w:this.width,
            h:ballDY
        };


        result[3] = {
            x:this.x,
            y:this.y + this.height - ballDY,
            w:this.width,
            h:ballDY
        };

        return result;
    }
}
