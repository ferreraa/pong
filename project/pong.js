var canvas = document.getElementById('canvas');

//context
var c = canvas.getContext('2d');



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

function Bar(x, y, width, height, keyUp, keyDown) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    const this.dy = 3;

    this.keyUp = keyUp;
    this.keyDown = keyDown;


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



//position of the ball
var x = 50;
var y = 200;

//Radius
var r = 15;

//useless, decides if the ball goes bigger or smaller
var growth = -1


//speed vector [x,y] => modified when a wall is touched
var velocidad = [3,3]; 


function drawCircle(x, y, r, style) {
    c.beginPath();
    c.fillStyle = style;
    c.arc(x, y, r, 0, 2*Math.PI, true);
    c.fill();
}




// Movement functions

//change behaviour when the ball touchs the wall
function checkWallCollisions() {
    if (x-r <= 0 || x+r >= canvas.width) {
        velocidad[0] *= -1;
    }

    if(y-r <= 0 || y+r >= canvas.height) {
        velocidad[1] *= -1;
    }


    //rectangle in the middle
    if ((x+r >= 250 && r+x <= 300) || (x-r <=300 && x-r >= 250))
    {
        if((y+r <= 150 && y-r >= 100)) {
            velocidad[0] *= -1;
        }
    }
}

function movement() {


    //move the ball
    x+=velocidad[0];
    y+=velocidad[1];
    
    //change direction when there is a collision
    checkWallCollisions();    

}


// Growing functions (useless, make the ball bigger or smaller)
function grow() {
    if(r > 30 || r < 1) growth *=-1;

    r+=growth;

}




function animate(time) {

    c.clearRect(0,0 , canvas.width, canvas.height);

    movement(); //moves the ball
//    grow(); //makes the ball grow (or reduce)

    drawCircle(x,y, r, 'blue');
c.fillStyle = 'red';

c.rect(250,100,50,50);
c.stroke();
c.fill();
    
    window.requestAnimationFrame(animate);
}

animate();

