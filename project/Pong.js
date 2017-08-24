var canvas = document.getElementById('canvas');
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//context
var c = canvas.getContext('2d');




function keyDownHandler(e) {
    World.keyInputInteraction(e.keyCode);
}

function keyUpHandler(e) {
    World.keyReleasedInteraction(e.keyCode);
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






function animate(time) {

    c.clearRect(0,0 , canvas.width, canvas.height);

    //TODO DELETE THESE
//    movement(); //moves the ball
//    grow(); //makes the ball grow (or reduce)

    World.evolve();
    
    window.requestAnimationFrame(animate);
}



//var ball = new Ball(50, 50, 20, 'blue', 3, 3)
World.addBall(new Ball(50, 50, 20, 'blue', 1, 3));
World.addPaddle(new Paddle(100,100, 30, 100, 38, 40, 'red'));
animate();

