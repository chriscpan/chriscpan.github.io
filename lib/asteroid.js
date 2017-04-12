(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    options.color = Asteroid.COLOR;
    options.radius = Asteroid.RADIUS - 10;
    options.pos = options.pos;
    options.vel = Asteroids.Util.randomVec(1);
    this.imgNum = options.imgNum;
    Asteroids.MovingObject.call(this, options);
  };
  Asteroid.imgChoice = [
    'img/blue-candy.png',
    'img/sprinkles.png',
    'img/red-stripe-candy.png',
    'img/orange-candy.png',
    'img/yellow-candy.png',
    'img/red-candy.png'
  ];
  Asteroid.COLOR = '#FF47A3';
  Asteroid.RADIUS = 40;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
      window.livesLost += 1;
    } else if (otherObject instanceof Asteroids.Bullet) {
      window.candiesShot += 1;
    }
  };

  Asteroid.prototype.draw = function(ctx){
    var halfRadius = Asteroid.RADIUS / 2;
    var image = new Image();
    var source = Asteroid.imgChoice[this.imgNum];
    image.src = source;
    ctx.drawImage(
          image,
          this.pos[0] - halfRadius,
          this.pos[1] - halfRadius,
          Asteroid.RADIUS,
          Asteroid.RADIUS
        );
  };
})();
