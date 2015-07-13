(function () {
  // Make a namespace `Assessment`.
  if(typeof Game === "undefined") {
    window.Util = {};
  };

  Game.width         = canvasEl.width;
  Game.height        = canvasEl.height;
  Game.cameraHeight  = 50;
  Game.cameraDepth   = 15;
  Game.playerX       = 0;
  Game.playerZ       = 0;
  Game.roadWidth     = 60;
  Game.segments      = [];
  Game.speed         = 10;
  Game.acceleration  = .2;

})();
