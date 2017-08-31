
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var x0;
var y0;

//x0 & y0 for each of the polys on the vertices
var verticesPolys = [];

var th = Math.PI/16;
var th2 = Math.PI/16;

var nx = [];
var ny = [];

//nx & yx for each of the polys on the vertices
var nVerticesPolys = [];


var numPoints = 7;
var radius = 200;

var styles = ['red', 'pink', 'purple', 'blue', 'green', 'yellow', 'black' ];


window.onload = function()
{
  let xs;
  let ys;

  var xv;
  var yv;

  [xs, ys] = generatePoly(radius, numPoints);
  [x0, y0] = translate(xs, ys, 400, 400);
  drawPoly(x0, y0);


  [xs2, ys2] = generatePoly(radius/10, numPoints);

  for (var i = 0 ; i < numPoints ; i++) {
    let x02, y02;

    [x02, y02] = translate(xs2, ys2, x0[i], y0[i]);
    verticesPolys.push([x02, y02]);

//    drawPoly(x02,y02);
  }


  window.requestAnimationFrame(animate);
}




function animate(time)
{
  context.clearRect(0,0,canvas.width,canvas.height);

  th = th + 0.02;
  th2 = th2 - 0.08;

  let center = centroid(x0, y0);
  drawCentroid(center[0], center[1], 'grey');


  [nx, ny] = rotateAroundCentroid(x0, y0, th);
  drawPoly(nx, ny);

  //console.log(verticesPolys);
  for (var i = 0; i < verticesPolys.length ; i++) {


    var newPosX, newPosY;
    [newPosX, newPosY] = rotateAroundVertice(verticesPolys[i][0] , verticesPolys[i][1], th2, i);

    let center = centroid(newPosX, newPosY);
    drawCentroid(center[0], center[1], styles[i]);

    drawPoly(newPosX, newPosY);
  }



  window.requestAnimationFrame(animate);
}


function generatePoly(radius, numPoints)
{
  let xs = [];
  let ys = [];
  var x, y;
  var alpha = 2*Math.PI/numPoints;
  for(var i = 0 ; i < numPoints ; i++)
  {
    x = Math.floor(radius*Math.cos(i*alpha));
    y = Math.floor(radius*Math.sin(i*alpha));
    xs.push(x);
    ys.push(y);
  }
  return [xs, ys];
}

function drawPoly(xs, ys)
{
  //console.log(xs);
  context.beginPath();
  context.strokeStyle = "green";
  context.moveTo(xs[0], ys[0]);

  for (var i = 1 ; i < xs.length ; i++)
  {
    context.lineTo(xs[i], ys[i]);
  }

  context.lineTo(xs[0], ys[0]);
  context.stroke();
}


function rotar(xs, ys, theta)
{
  let nxs = [];
  let nys = [];

  let x, y;
  for(var i = 0 ; i < xs.length ; i++)
  {
    x = Math.floor(xs[i]*Math.cos(theta) - ys[i]*Math.sin(theta));
    y = Math.floor(xs[i]*Math.sin(theta) + ys[i]*Math.cos(theta));
    nxs.push(x);
    nys.push(y);
  }
  return [nxs, nys];
}

function translate(xs, ys, xm, ym)
{
  let n_xs = [];
  let n_ys = [];

  let x, y;
  for(var i = 0 ; i < xs.length ; i++)
  {
    x = xs[i] + xm;
    y = ys[i] + ym;
    n_xs.push(x);
    n_ys.push(y);
  }
  return [n_xs, n_ys];
}


function centroid(xs, ys)
{
  var xsuma = 0;
  var ysuma = 0;
  for (var i = 0; i < xs.length; i++)
  {
    xsuma = xsuma + xs[i];
    ysuma = ysuma + ys[i];
  }
  var xc, yc;
  xc = Math.floor(xsuma / xs.length);
  yc = Math.floor(ysuma / ys.length);
  return [xc, yc];
}

function drawCentroid(xc, yc, style)
{
  context.beginPath();
  context.fillStyle = style;
  context.arc(xc, yc, 5, 0, 2*Math.PI, false);
  context.fill();
}

function rotateAroundCentroid(xs, ys, theta)
{
  var xc, yc;
  [xc, yc] = centroid(xs, ys);

  //console.log(xs);

  let tx, ty, bx, by, new_x, new_y;
  [tx, ty] = translate(xs, ys, -xc, -yc);
  [bx, by] = rotar(tx, ty, theta);
  [new_x, new_y] = translate(bx, by, xc, yc);

  return [new_x, new_y];
}

function rotateAroundVertice(xs, ys, theta, i)
{
  var xc, yc;
//  [xc, yc] = centroid(nx, ny);
  [xc, yc] = [nx[i], ny[i]];


  let tx, ty, bx, by, new_x, new_y;
  [tx, ty] = translate(xs, ys, -x0[i], -y0[i]);
  [bx, by] = rotar(tx, ty, theta);
  [new_x, new_y] = translate(bx, by, nx[i], ny[i]);

  return [new_x, new_y];
}
