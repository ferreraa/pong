var canvas = document.getElementById('canvas');
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//context
var c = canvas.getContext('2d');




function keyDownHandler(e) {
    World.keyInputInteraction(e.keyCode);
//    console.log(e.keyCode.toString());
}

function keyUpHandler(e) {
    World.keyReleasedInteraction(e.keyCode);
}





function animate(time) {

    c.clearRect(0,0 , canvas.width, canvas.height);


    World.evolve();
    
    window.requestAnimationFrame(animate);
}



//var ball = new Ball(50, 50, 20, 'blue', 3, 3)
World.addBall(new Ball(50, 50, 20, 'blue', 1, 3));
World.addPaddle(new Paddle(100,100, 30, 100, 38, 40, 'red'));
animate();

