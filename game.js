(function () {
  // Make a namespace `Assessment`.
  if(typeof Racer === "undefined") {
    window.Racer = {};
  };

 var Game = Racer.Game = function(context, xDim, yDim) {
    this.ctx = context;
    this.width = xDim;
    this.height = yDim;
    this.cameraHeight  = 50;
    this.cameraDepth   = 15;
    this.playerX       = 0;
    this.playerZ       = 0;
    this.roadWidth     = 60;
    this.segments      = [];
    this.speed         = 10;
    this.acceleration  = -.5;
    this.maxSpeed      = 120;
    this.dx            = 0;
    this.segments      = [];
    for(var n = 0 ; n < 500 ; n++) {
      var color =  Math.floor(n)%2 ? '#696969' : 'white';
      this.segments.push([n*200, (n+1)*200, color]);
    };
  };

  Game.KEYS = {
    LEFT:  37,
    UP:    38,
    RIGHT: 39,
    DOWN:  40,
    A:     65,
    D:     68,
    S:     83,
    W:     87
  };

  $(document).on('keydown', Game.keyPressed);
  $(document).on('keyup',  Game.keyUnpressed);

  Game.keyPressed = function(event) {
    if (event.which === Game.KEYS.UP || event.which === Game.KEYS.W) {
      this.acceleration = 2;
    };
    if (event.which === Game.KEYS.RIGHT || event.which === Game.KEYS.D) {
      console.log("DOWN");
      this.dx = 1/55;
    };
    if (event.which === Game.KEYS.LEFT || event.which === Game.KEYS.A) {
      this.dx = -1/55;
    };
  };

  Game.keyUnpressed = function(event) {
    if (event.which === Game.KEYS.UP || event.which === Game.KEYS) {
      this.acceleration = -.5;
    };
    if (event.which === Game.KEYS.RIGHT) {
      if (dx === 1/55) {
        this.dx = 0;
      }
    };
    if (event.which === Game.KEYS.LEFT) {
      if (dx === -1/55) {
        this.dx = 0;
      }
    };
  };

  Game.prototype.render = function() {
    if (this.acceleration < 0) {
      this.speed += this.speed <= 0? 0 : this.acceleration;
    } else {
      this.speed += this.speed >= this.maxSpeed? 0 : this.acceleration;
    }
    this.playerX += this.speed*this.dx;
    // this.ctx.clearRect(0, 0, this.width, this.height);
    this.playerZ += this.speed;

    var currentSegment = Math.floor(this.playerZ/200) % this.segments.length;
    for(i = 0 ; i < 20 ; i++) {
      n = i + currentSegment;
      if (this.segments[n][0] > this.playerZ) {
        debugger;
        Util.drawSegment(this, this.segments[n][0], this.segments[n][1], this.segments[n][2]);
      }
    }
  };

  Game.prototype.run = function() {
    setInterval(this.render.bind(this), 1000/60)
  };
})();
