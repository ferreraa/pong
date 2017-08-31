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
var middle = [canvas.width/2 , canvas.height/2]

//var ball = new Ball(50, 50, 20, 'blue', 3, 3)
World.add(new Ball(middle[0], middle[1], 20, 'blue', 3, 3));
World.add(new Paddle(1,1, paddleWidths, paddleHeights, 'red' ,38, 40 ));


var botPaddle = new Paddle(canvas.width - paddleWidths, middle[1] - paddleHeights/2 , paddleWidths, paddleHeights, 'green');

World.add(botPaddle);

World.add(new Paddle(middle[0] - paddleWidths/2 , 0 , paddleWidths, paddleHeights, 'yellow'));

animate();
