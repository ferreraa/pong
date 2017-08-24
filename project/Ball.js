//Ball class
function Ball(x, y, radius, style = 'blue', dx = 0, dy = 0) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.style = style;

    this.velocity = [dx, dy];

    var that = this;

    //draw the ball
    this.draw = function() {
        c.beginPath();
        c.fillStyle = this.style;
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI, true);
        c.fill();
    }

    //move the ball
    this.move = function() {
        //move the ball
        this.x+=this.velocity[0];
        this.y+=this.velocity[1];
        
         //change direction when there is a collision
        checkWallCollisions();    

    }

    //check the collisions with the top and bottom walls
    var checkWallCollisions = function() {

        //This one won't be necessary in the final version since the ball should only bounce on the top/bottom of screen
        if (that.x-that.r <= 0 || that.x+that.r >= canvas.width) {
            that.velocity[0] *= -1;
        }


        if(that.y-that.r <= 0 || that.y+that.r >= canvas.height) {
            that.velocity[1] *= -1;
        }
    }

}

/*example
var ball1 = new Ball(x,y r, style, dx, dy);

ball.draw();

ball.move();

var ball2 = new Ball()
*/