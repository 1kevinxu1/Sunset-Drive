// var width         = canvasEl.width;
// var height        = canvasEl.height;
// var cameraHeight  = 50;
// var cameraDepth   = 15;
// var playerX       = 0;
// var playerZ       = 0;
// var roadWidth     = 60;
// var segments      = [];
// var speed         = 10;
// var acceleration  = .2;
//
// for(var n = 0 ; n < 500 ; n++) {
//   var color =  Math.floor(n)%2 ? '#696969' : 'white';
//   segments.push([n*200, (n+1)*200, color]);
// };
//
// function project (worldX, worldY, worldZ) {
//   var cameraX    = worldX - playerX;
//   var cameraY    = worldY - cameraHeight;
//   var cameraZ    = worldZ - playerZ;
//   var scale      = cameraDepth/cameraZ;
//   var x          = Math.round((width/2)  + (scale * cameraX  * width/2));
//   var y          = Math.round((height/2) - (scale * cameraY  * height/2));
//   var w          = Math.round((scale * roadWidth * width/2));
//   return [x, y, w]
// };
//
// function polygon (ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
//   ctx.fillStyle = color;
//   ctx.beginPath();
//   ctx.moveTo(x1, y1);
//   ctx.lineTo(x2, y2);
//   ctx.lineTo(x3, y3);
//   ctx.lineTo(x4, y4);
//   ctx.closePath();
//   ctx.fill();
// };
//
// function drawSegment (start, end, color) {
//   var start = project(0, 0, start);
//   var end   = project(0, 0, end);
//
//   var x1 = start[0];
//   var y1 = start[1];
//   var w1 = start[2];
//   var x2 = end[0];
//   var y2 = end[1];
//   var w2 = end[2];
//   polygon(context, x1-w1, y1, x1+w1, y1, x2+w2, y2, x2-w2, y2, color);
// };
//
// var decelerate = false;
// var right = true;
// // debugger;
