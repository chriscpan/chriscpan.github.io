(function () {
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var movingObject = Asteroids.MovingObject = function(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  movingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );
    ctx.fill();
  };

  movingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  movingObject.prototype.isCollidedWith = function(otherObject) {
    var distance = Asteroids.Util.dist(this.pos, otherObject.pos);
    return distance < (otherObject.radius + this.radius);
  };

  movingObject.prototype.collideWith = function(otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
  };

  movingObject.prototype.isWrappable = true;
})();
