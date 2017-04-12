// Kill spacerocks with this. Also a MovingObject subclass.
(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options){
    this.color = Bullet.COLOR;
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = Bullet.RADIUS;
    this.game = options.game;
  };

  Bullet.COLOR = "#FF5930";
  Bullet.RADIUS = 5;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      // debugger
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  }
})();
