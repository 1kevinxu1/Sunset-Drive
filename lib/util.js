(function () {
  if(typeof Util === "undefined") {
    window.Util = {};
  };

  Util.COLORS = {
    STOP: '#FF0000',
    GO:   '#00FF00',
    DEAD: '#000000',
    WIN:  '#FFFFFF'
  }

  Util.project = function(game, worldX, worldY, worldZ, objectWidth) {
    var cameraX    = worldX - game.playerX;
    //camera height is essentially 'playerY'
    var cameraY    = worldY - game.cameraHeight;
    var cameraZ    = worldZ - game.playerZ;
    var scale      = game.cameraDepth/cameraZ;
    var x          = Math.round((game.width/2)  + (scale * cameraX  * game.width/2));
    var y          = Math.round((game.height/2) - (scale * cameraY  * game.height/2));
    var w          = Math.round((scale * objectWidth * game.width/2));
    return [x, y, w];
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

  Util.drawSprites = function(game) {
    for (i = 0; i < game.numberOfSprites; i++) {
      var currentSprite = game.sprites[i];
      var x = currentSprite[0];
      var y = currentSprite[1];
      var z = currentSprite[2];
      var color = currentSprite[3];
      if (game.playerZ <= z && z - game.playerZ < game.segmentLength*game.drawDistance) {
        Util.renderSprite(game, x, y, z, color);
        Util.detectCollisions(game, x, z, color);
      };
    };
    Util.checkForFinish(game);
  };

  Util.checkForFinish = function(game) {
    var z = (game.numOfSegments-100)*game.segmentLength;
    if (game.playerZ < z && z - game.playerZ < game.segmentLength*game.drawDistance) {
      var start = Util.project(game, 0, 0, z, game.roadWidth);
      var end = Util.project(game, 0, 0, z+game.spriteLength, game.roadWidth);
      var x1 = start[0];
      var y1 = start[1];
      var w1 = start[2];
      var x2 = end[0];
      var y2 = end[1];
      var w2 = end[2];
      Util.polygon(game.ctx, x1-w1, y1, x1+w1, y1, x2+w2, y2, x2-w2, y2, Util.COLORS.WIN);
    };
    if (game.playerZ > z) {
      game.collisionDetected(Util.COLORS.WIN);
    }
  };

  Util.renderSprite = function(game, x, y, z, color) {
    var start = Util.project(game, x, y, z, game.spriteWidth);
    var end   = Util.project(game, x, y, z+game.spriteLength, game.spriteWidth);

    var x1 = start[0];
    var y1 = start[1];
    var w1 = start[2];
    var x2 = end[0];
    var y2 = end[1];
    var w2 = end[2];
    Util.polygon(game.ctx, x1-w1, y1, x1+w1, y1, x2+w2, y2, x2-w2, y2, color);
  };

  Util.loadImages = function(game) {
    game.sunset = new Image();
    game.car = new Image();
    game.sunset.src = './photos/sunset.jpg';
    game.car.src = './photos/porsche.png';
  };

  Util.generateSprites = function(game) {
    for (i = 0; i < game.numberOfSprites; i++) {
      var x = Util.getRandomInt(
        -game.roadWidth + game.spriteWidth,
        game.roadWidth - game.spriteWidth
      );
      var y = 0;
      var z = (game.numOfSegments-200)*game.segmentLength*i/game.numberOfSprites + 10000;
      if (i % 5 === 0) {
        var color = Util.COLORS.DEAD;
      } else {
        var color = (i % 2 === 1) ? Util.COLORS.STOP : Util.COLORS.GO;
      }

      game.sprites.push([x, y, z, color]);
    }
  };

  Util.generateSegments = function(game) {
    for (var n = 0 ; n < game.numOfSegments ; n++) {
      var color =  Math.floor(n)%3 ? '#696969' : 'white';
      var grassColor = Math.floor(n)%2 ? '#007700' : '#006600'
      game.segments.push([n*game.segmentLength, (n+1)*game.segmentLength, color, grassColor]);
    };
  }

  Util.detectCollisions = function(game, x, z, color) {
    if ((game.playerZ > z-400 && game.playerZ < z-400+game.spriteLength) &&
        (game.playerX > x-(game.spriteWidth) && game.playerX < x+(game.spriteWidth))) {
      game.collisionDetected(color);
    };
  };

  Util.drawSegment = function(game, start, end, color, grassColor) {
    var start = Util.project(game, 0, 0, start, game.roadWidth);
    var end   = Util.project(game, 0, 0, end, game.roadWidth);

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

  Util.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

})();
