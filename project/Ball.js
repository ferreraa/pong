//Ball class
function Ball(x, y, radius, style = 'blue', dx = 0, dy = 0) {
    this x = x;
    this.y = y;
    this.r = r;
    this.style = style;

    this.velocity = [dx, dy];


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
        x+=velocity[0];
        y+=velocity[1];
        
         //change direction when there is a collision
        checkWallCollisions();    

    }

    //check the collisions with the top and bottom walls
    this.checkWallCollisions = function() {

        if(y-r <= 0 || y+r >= canvas.height) {
            velocity[1] *= -1;
        }
    }


    //check if the ball collides with a given Bar rectangle
    this.checkBarCollision(bar) {
        if(this.x+ this.r >= bar.x || this.x -)
    }
}
