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



var paddleWidths = 30;
var paddleHeights = 100;


//var ball = new Ball(50, 50, 20, 'blue', 3, 3)
World.add(new Ball(50, 50, 20, 'blue', 3, 3));
World.add(new Paddle(1,1, paddleWidths, paddleHeights, 'red' ,38, 40 ));


var botPaddle = new Paddle(canvas.width - paddleWidths, 1 , paddleWidths, paddleHeights, 'green');

//World.addPaddle(botPaddle);
animate();

