//Ball class
function Ball(x, y, r, style = 'blue', dx = 0, dy = 0) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.style = style;

    this.velocity = [dx, dy];

    this.colliding = new Array ();

    var that = this;

    var old_x = x;
    var old_y = y;

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
        old_x = this.x;
        old_y = this.y;

        this.x+=this.velocity[0];
        this.y+=this.velocity[1];

         //change direction when there is a collision
        checkWallCollisions();

    }

    this.lastPos = function() {
        this.x = old_x;
        this.y = old_y;
    }

    //check the collisions with the top and bottom walls
    var checkWallCollisions = function() {

        //This one won't be necessary in the final version since the ball should only bounce on the top/bottom of screen
        if (that.x-that.r <= 0 ){
          scored(1)

        }
        else if (that.x+that.r >= canvas.width) {
          scored(0)
        }


        if(that.y-that.r <= 0 || that.y+that.r >= canvas.height) {
            that.velocity[1] *= -1;
        }
    }
    var checkBallCollisions = function(ball){
      let Distance = sqrt((this.x - ball.x)^2 + (this.y - ball.y)^2)
      if (Distance <= this.r + ball.r){
          this.velocity[0] *= -1
          this.velocity[1] *= -1
          ball.velocity[0] *= -1
          ball.velocity[1] *= -1
          var vect = [this.x - ball.x, this.y - ball.y];
          let overlappingDistance = this.r +ball.r - Distance
          let sumDistance = (vect * overlappingDistance)/2
      }



    }

    this.getOutOf = function(paddle) {
        if(this.y > paddle.y + paddle.height/2) {
            this.y = paddle.y + paddle.height + this.r
        }
        else {
            this.y = paddle.y - this.r
        }
    }
    function scored(winner){
      console.log(this.x)

      World.score[winner]++;
      that.x = middle[0]
      that.y = middle[1]

    }

}

/*example
var ball1 = new Ball(x,y r, style, dx, dy);

ball.draw();

ball.move();

var ball2 = new Ball()
*/
