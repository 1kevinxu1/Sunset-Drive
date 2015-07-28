(function () {
  if(typeof Util === "undefined") {
    window.Util = {};
  };

  Util.project = function(game, worldX, worldY, worldZ) {
    var cameraX    = worldX - game.playerX;
    //camera height is essentially 'playerY'
    var cameraY    = worldY - game.cameraHeight;
    var cameraZ    = worldZ - game.playerZ;
    var scale      = game.cameraDepth/cameraZ;
    var x          = Math.round((game.width/2)  + (scale * cameraX  * game.width/2));
    var y          = Math.round((game.height/2) - (scale * cameraY  * game.height/2));
    var w          = Math.round((scale * game.roadWidth * game.width/2));
    return [x, y, w]
  };

  Util.polygon = function(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  };

  Util.drawSegment = function(game, start, end, color, grassColor) {
    var start = Util.project(game, 0, 0, start);
    var end   = Util.project(game, 0, 0, end);

    var x1 = start[0];
    var y1 = start[1];
    var w1 = start[2];
    var x2 = end[0];
    var y2 = end[1];
    var w2 = end[2];
    Util.polygon(game.ctx, 0, y1, x1-w1, y1, x2-w2, y2, 0, y2, grassColor);
    Util.polygon(game.ctx, game.width, y1, x1+w1, y1, x2+w2, y2, game.width, y2, grassColor);
    Util.polygon(game.ctx, x1-w1, y1, x1+w1, y1, x2+w2, y2, x2-w2, y2, '#696969');
    Util.polygon(game.ctx, x1-(w1/25), y1, x1+(w1/25), y1, x2+(w2/25), y2, x2-(w2/25), y2, color);
  };
})();
