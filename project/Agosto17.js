var canvas = document.getElementById('canvas');



//context
var c = canvas.getContext('2d');

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

    if ((x+r >= 250 && r+x <= 300) || (x-r <=300 && x-r >= 250))
    {
        if((y+r <= 150 && y-r >= 100)) {
            velocidad[0] *= -1;
        }
    }
    if(y-r <= 0 || y+r >= canvas.height) {
        velocidad[1] *= -1;
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

