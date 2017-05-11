'use strict';

var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var pixelRatio = window.devicePixelRatio || 1;
var mouse = { x: 0, y: 0, updated: Date.now(), angle: 0, velocity: 0 };

var distanceBetween = function distanceBetween(ax, bx, ay, by) {
  return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
};

var setDimensions = function setDimensions() {
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
};

var onMouseMove = function onMouseMove(_ref) {
  var layerX = _ref.layerX,
      layerY = _ref.layerY;
  return mouse = {
    x: layerX * pixelRatio,
    y: layerY * pixelRatio,
    velocity: distanceBetween(mouse.x, layerX * pixelRatio, mouse.y, layerY * pixelRatio),
    angle: Math.atan2(layerX * pixelRatio - mouse.x, layerY * pixelRatio - mouse.y)
  };
};

window.addEventListener('resize', setDimensions);
canvas.addEventListener('mousemove', onMouseMove);

setDimensions();

var areal = 40 * pixelRatio;
var padding = 2 * pixelRatio;
var lineWidth = 0;

var draw = function draw() {
  ctx.fillStyle = '#111';
  ctx.strokeStyle = '#eee';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = lineWidth;

  for (var x = 0; x < Math.ceil(canvas.width / areal); x++) {
    for (var y = 0; y < Math.ceil(canvas.height / areal); y++) {
      var centerX = x * areal + areal / 2;
      var centerY = y * areal + areal / 2;

      var distanceFromMouse = distanceBetween(mouse.x, centerX, mouse.y, centerY);

      ctx.save();
      ctx.translate(x * areal, y * areal);

      // ctx.font = "30px Helvetica"
      // ctx.textAlign = 'center'
      // ctx.fillStyle = '#222'
      // ctx.fillText(Math.round(1 - (distanceFromMouse / (areal * 3))), areal / 2, areal / 2)

      // Rotate
      ctx.translate(areal / 2, areal / 2);
      ctx.rotate(-mouse.angle);
      ctx.lineWidth = (1 - distanceFromMouse / (areal * 5)) * 10;
      ctx.translate(-areal / 2, -areal / 2);

      // Draw line
      ctx.beginPath();
      ctx.moveTo(areal / 2, padding);
      ctx.lineTo(areal / 2, areal - padding);
      ctx.stroke();

      // ctx.fillStyle = '#eee'
      // ctx.fillRect(areal / 2, areal / 2, (1 - distanceFromMouse / (areal * 5)) * 10, (1 - distanceFromMouse / (areal * 5)) * 10)

      ctx.restore();
    }
  }

  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, 300, 160);
  ctx.font = "30px Helvetica";
  ctx.fillStyle = '#111';
  ctx.fillText('velocity: ' + mouse.velocity.toFixed(2), 15, 40);
  ctx.fillText('angle: ' + mouse.angle.toFixed(2), 15, 40 * 2);

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
