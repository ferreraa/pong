//World class, contains every object and takes care of making them interact.
var World = new function() {
    //list of balls
    var balls = new Array();

    //list of paddles
    var paddles = new Array();

    var that = this;

    this.addBall = function(ball) {
        balls[balls.length] = ball;
    }

    this.addPaddle = function(paddle){
        paddles[paddles.length] = paddle;
    }

    function checkBallPaddleCollisions () {
        for(var i = 0 ; i < balls.length ; i++) {
            for(var j = 0 ; j < paddles.length ; j++) {
                BallPaddleColliding(balls[i], paddles[j])
            }
        }
    }

    this.evolve = function() {
        evolveBalls();
        evolvePaddles();

        checkBallPaddleCollisions();
    }

    function evolveBalls() {
        for (var i = balls.length - 1; i >= 0; i--) {
            balls[i].move();
            balls[i].draw();
        }
    }

    function evolvePaddles() {
        for (var i = paddles.length - 1; i >= 0; i--) {
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
function RectBallColliding(ball,rect){
    var distX = Math.abs(ball.x - rect.x-rect.w/2);
    var distY = Math.abs(ball.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + ball.r)) { return false; }
    if (distY > (rect.h/2 + ball.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(ball.r*ball.r));
}

function BallPaddleColliding(ball, paddle) {

    //array of rectangles (Rectangle : {x,y,w,h}). left&right sides: 0&1. top&bottom: 2&3
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
}

/*
world.addBall ( new Ball(x,y,r, style...));
*/