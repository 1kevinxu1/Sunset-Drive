(function () {
  // Make a namespace `Assessment`.
  if(typeof Racer === "undefined") {
    window.Racer = {};
  };

 var Game = Racer.Game = function(context, xDim, yDim) {
    this.ctx = context;
    this.width = xDim;
    this.height = yDim;
    this.cameraHeight  = 30;
    this.cameraDepth   = 12;
    this.playerX       = 0;
    this.playerZ       = 0;
    this.roadWidth     = 80;
    this.segments      = [];
    this.speed         = 10;
    this.acceleration  = -.5;
    this.maxSpeed      = 120;
    this.dx            = 0;
    this.segments      = [];
    this.segmentLength = 200;
    for(var n = 0 ; n < 800 ; n++) {
      var color =  Math.floor(n)%3 ? '#696969' : 'white';
      var grassColor = Math.floor(n)%2 ? '#007700' : '#006600'
      this.segments.push([n*this.segmentLength, (n+1)*this.segmentLength, color, grassColor]);
    };
    this.loadSunset();
  };

  Game.prototype.loadSunset = function() {
    this.sunset = new Image();
    this.sunset.src = 'sunset.jpg';
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

  Game.prototype.keyPressed = function(event) {
    if (event.which === Game.KEYS.UP || event.which === Game.KEYS.W) {
      this.acceleration = 2;
    };
    if (event.which === Game.KEYS.RIGHT || event.which === Game.KEYS.D) {
      this.dx = 1/55;
    };
    if (event.which === Game.KEYS.LEFT || event.which === Game.KEYS.A) {
      this.dx = -1/55;
    };
  };

  Game.prototype.keyUnpressed = function(event) {
    if (event.which === Game.KEYS.UP || event.which === Game.KEYS) {
      this.acceleration = -.5;
    };
    if (event.which === Game.KEYS.RIGHT) {
      if (this.dx === 1/55) {
        this.dx = 0;
      }
    };
    if (event.which === Game.KEYS.LEFT) {
      if (this.dx === -1/55) {
        this.dx = 0;
      }
    };
  };

  Game.prototype.adjustPosition = function() {
    if (this.acceleration < 0) {
      this.speed += this.speed <= 0? 0 : this.acceleration;
    } else {
      this.speed += this.speed >= this.maxSpeed? 0 : this.acceleration;
    }
    this.playerX += this.speed*this.dx;
    this.playerZ += this.speed;
  };

  Game.prototype.drawRoad = function() {
    var currentSegment = Math.floor(this.playerZ/200) % this.segments.length;
    for(i = 0 ; i < 30 ; i++) {
      n = (i + currentSegment) % this.segments.length;
      if (this.segments[n][0] > this.playerZ) {
        Util.drawSegment(
          this,
          this.segments[n][0],
          this.segments[n][1],
          this.segments[n][2],
          this.segments[n][3]
        )
      }
    }
  };

  Game.prototype.drawBackground = function() {
    this.ctx.drawImage(
      this.sunset,
      (this.playerX*-.1) -this.width/2,
      -this.height/2 -50,
      this.width*2,
      this.height*2
    );
  }

  Game.prototype.render = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.adjustPosition();
    this.drawBackground();
    this.drawRoad();
  };

  Game.prototype.run = function() {
    setInterval(this.render.bind(this), 1000/60)
  };
})();
