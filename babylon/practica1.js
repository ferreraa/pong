
var rotationSpeed = 0.01;
//var ground.rotation.y = 0;

var objects = Array();

var box;
var sphere;
var cylinder;


var ground;

//array
var originalPositions = Array();

// Get the canvas element from our HTML below
var canvas = document.querySelector("#renderCanvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);

// -------------------------------------------------------------
// Here begins a function that we will 'call' just after it's built
var createScene = function () {
    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);
    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    // This creates and positions a free camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 20, 0), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);
    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount
    light.intensity = .5;


    var boxSize = 2.0;
    box = BABYLON.Mesh.CreateBox("box", boxSize, scene, false, BABYLON.Mesh.DEFAULTSIDE);
    box.position = new BABYLON.Vector3(5,boxSize/2,0);

    objects.push(box);
    originalPositions.push(new BABYLON.Vector3(box.position.x, box.position.y, box.position.z));

    cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene, false, BABYLON.Mesh.DEFAULTSIDE);
    cylinder.position = new BABYLON.Vector3(2, 1.5, 0);

    objects.push(cylinder);
    originalPositions.push(new BABYLON.Vector3(cylinder.position.x, cylinder.position.y, cylinder.position.z));

    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    sphere = BABYLON.Mesh.CreateSphere("sphere1", 6, 2, scene, false, BABYLON.Mesh.DEFAULTSIDE);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;
    sphere.position.z = 0;
    
    objects.push(sphere);
    originalPositions.push(new BABYLON.Vector3(sphere.position.x, sphere.position.y, sphere.position.z));

/*    var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 60, 30, 1, 1, scene, false, BABYLON.Mesh.DEFAULTSIDE);
    knot.position.x = -2;
    knot.position.z = 0.5;
    knot.position.y = 1;

    objects.push(knot);
    originalPositions.push(new BABYLON.Vector3(knot.position.x, knot.position.y, knot.position.z));
*/
    // Let's try our built-in 'ground' shape. Params: name, width, depth, subdivisions, scene
    ground = BABYLON.Mesh.CreateGround("ground1", 12, 12, 2, scene);
    // Leave this function
    return scene;
    }; // End of createScene function

// -------------------------------------------------------------
// Now, call the createScene function that you just finished creating
var scene = createScene();
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();

    ground.rotation.y +=rotationSpeed;
    
/*    for (var i = objects.length - 1; i >= 0; i--) {
        rotateObject(objects[i],i);
    }
*/
    rotateObject(box,0);
    inverseRotateObject(cylinder,1);

    

});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});



function rotateObject(object, i) {
    var oldPos = originalPositions[i];

    console.log(i);
    console.log(oldPos);

    object.position.z = 0;
    object.position.x = 0;
    object.rotation.y += rotationSpeed;

//    object.position.x = (oldPos.x*Math.cos(ground.rotation.y));
//    object.position.z = (oldPos.z*Math.sin(ground.rotation.y));

    object.position.x = (oldPos.x*Math.cos(ground.rotation.y) + oldPos.z*Math.sin(ground.rotation.y));
    object.position.z = (oldPos.x*Math.sin(-ground.rotation.y) + oldPos.z*Math.cos(ground.rotation.y));


}

function inverseRotateObject(object, i) {
    var oldPos = originalPositions[i];

    console.log(i);
    console.log(oldPos);

    object.position.z = 0;
    object.position.x = 0;
    object.rotation.y -= rotationSpeed;

//    object.position.x = (oldPos.x*Math.cos(ground.rotation.y));
//    object.position.z = (oldPos.z*Math.sin(ground.rotation.y));

    object.position.x = (oldPos.x*Math.cos(ground.rotation.y) - oldPos.z*Math.sin(ground.rotation.y));
    object.position.z = (oldPos.x*Math.sin(ground.rotation.y) + oldPos.z*Math.cos(ground.rotation.y));


}
