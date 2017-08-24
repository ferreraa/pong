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

/*    if ((x+r >= 250 && r+x <= 300) || (x-r <=300 && x-r >= 250))
    {
        if((y+r <= 150 && y-r >= 100)) {
            velocidad[0] *= -1;
        }
    }
*/    
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
    if( RectCircleColliding({x:x,y:y,r:r}, {x:250,y:100,w:50,h:50}) ) {
        velocidad[0] *=-1;
        velocidad[1] *=-1;
    }

}


/*
var circle={x:100,y:290,r:10};
var rect={x:100,y:100,w:40,h:100};
*/
// return true if the rectangle and circle are colliding
function RectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
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

