//World class, contains every object and takes care of making them interact.
var World = new function() {
    //list of balls
    var balls = new Array();

    //list of paddles
    var paddles = new Array();


    var that = this;


    this.add = function(object) {
        if( object instanceof Ball) {
            balls.push(object);
        }
        else if ( object instanceof Paddle ) {
            paddles.push(object);
        }
    }

    this.addBall = function(ball) {
        balls[balls.length] = ball;
    }

    this.addPaddle = function(paddle){
        paddles[paddles.length] = paddle;
    }

    function checkBallPaddleCollisions () {
        for(var i = 0 ; i < balls.length ; i++) {
            for(var j = 0 ; j < paddles.length ; j++) {
                if (typeof balls[i].colliding[j] === 'undefined' ) {
                  console.log("ups")
                  balls[i].colliding[j] = false;
                }
                console.log(balls[i].colliding[j]);

                if( RectBallColliding(balls[i], paddles[j]) ) {
                    paddles[j].stopPaddle();
                    console.log("if1");

                    if( balls[i].colliding[j] ) {
                        balls[i].getOutOf(paddles[j]);
                        console.log("if2");
                    } else {
                        balls[i].colliding[j] = true;
                        console.log("else first collision");
                    }

                } else {
                    balls[i].colliding[j] = false;
                    console.log("not colliding");


                }


/*
                switch (collision) {
                    case 0:
                        return;
                    case 1:
                        balls[i].velocity[1] *= -1;
                        break;
                    case 2:
                        balls[i].velocity[0] *= -1;
                        break;
                    case 3:
                        balls[i].velocity[1] *= -1;
                        balls[i].velocity[0] *= -1;
                }
*/
            }
        }
    }

    this.evolve = function() {
        evolveBalls();

        checkBallPaddleCollisions();

        evolvePaddles();

    }

    function evolveBalls() {
        for (var i = balls.length - 1; i >= 0; i--) {
            balls[i].move();
            balls[i].draw();
        }
    }

    function evolvePaddles() {
        for (var i = paddles.length - 1; i >= 0; i--) {

            if(paddles[i].upKey == -1) {
                paddles[i].automaticChoice();
            }

            paddles[i].move();
            paddles[i].draw();


        }
    }

    this.keyInputInteraction = function(key) {
        for (var i = paddles.length - 1; i >= 0; i--) {
            if(paddles[i].upKey == key) {
                paddles[i].direction = -1;
            }
            else if (paddles[i].downKey == key) {
                paddles[i].direction = 1;
            }
        }

    }

    this.keyReleasedInteraction = function(key) {
        for (var i = paddles.length - 1; i >= 0; i--) {
            if(paddles[i].upKey == key || paddles[i].downKey == key) {
                paddles[i].direction = 0;
            }
        }
    }
}

// return true if the rectangle and ball are colliding
//return 0 if no collision, 1 if left/right collision, 2 if top/bottom collision 3 if corner collision
function RectBallColliding(ball,paddle){
    var distX = Math.abs(ball.x - paddle.x-paddle.width/2);
    var distY = Math.abs(ball.y - paddle.y-paddle.height/2);

    if (distX > (paddle.width/2 + ball.r)) { return false; }
    if (distY > (paddle.height/2 + ball.r)) { return false; }

    if (distX <= (paddle.width/2)) {
        ball.velocity[1] *= -1;
        return true;
    }

    if (distY <= (paddle.height/2)) {
        ball.velocity[0] *= -1;
        return true;
    }

    var dx=distX-paddle.width/2;
    var dy=distY-paddle.height/2;
    if (dx*dx+dy*dy<=(ball.r*ball.r)) {
        ball.velocity[0] *= -1;
        ball.velocity[1] *= -1;
        return true;
    }

}

function BallPaddleColliding(ball, paddle) {
/*    //array of rectangles (Rectangle : {x,y,w,h}). left&right sides: 0&1. top&bottom: 2&3
    var paddleHitBoxes = paddle.getHitBoxes(ball);

    //if the ball collides with the left/right side, dx*-1
    if(RectBallColliding(ball, paddleHitBoxes[0])
        || RectBallColliding(ball, paddleHitBoxes[1])) {
        ball.velocity[0] *= -1;
    }

    //if the ball collides with the top/bottom side, dy*-1
    if(RectBallColliding(ball, paddleHitBoxes[2])
        || RectBallColliding(ball, paddleHitBoxes[3])) {
        ball.velocity[1] *= -1;
    }
*/
}

/*
world.addBall ( new Ball(x,y,r, style...));
*/
