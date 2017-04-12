(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(options) {
    this.vel = [0, 0];
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.pos = options.pos;
    this.game = options.game;
    this.vertices = [[20, 0], [-4, -9], [-4, 9]];
    this.rot = (Math.PI/2);
    this.speed = 0;
  };


  Ship.RADIUS = 15;
  Ship.COLOR = '#333';

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomShipPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    var middle = this.vertices[0];
    var bulletPos = [this.pos[0] + middle[0], this.pos[1] + middle[1] ];
    var norm = Asteroids.Util.dist(this.pos, bulletPos);

    var bulletSpeed = 1;

    var bulletVel = [
        norm * Math.sin(this.rot) * bulletSpeed,
        norm * Math.cos(this.rot) * bulletSpeed
      ];
    var bullet = new Asteroids.Bullet({
      game: this.game,
      pos: bulletPos,
      vel: bulletVel
    });
    this.game.add(bullet);
  };

  Ship.prototype.draw = function(ctx) {
    var middle = this.vertices[0];
    var sideOne = this.vertices[1];
    var sideTwo = this.vertices[2];
    ctx.strokeStyle = this.color;
    ctx.lineWidth="4";
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + middle[0], this.pos[1] + middle[1]);
    ctx.lineTo(this.pos[0] + sideOne[0], this.pos[1] + sideOne[1]);
    ctx.lineTo(this.pos[0] + (sideTwo[0]), this.pos[1] + (sideTwo[1]));
    ctx.lineTo(this.pos[0] + middle[0], this.pos[1] + middle[1]);
    ctx.stroke();
  };

  Ship.prototype.rotateLeft = function() {
    var angle = (2 * Math.PI) / 24;
    this.rot += angle;
    this.rotate(angle);
  };

  Ship.prototype.rotateRight = function() {
    var angle = -1 * (2 * Math.PI) / 24;
    this.rot += angle;
    this.rotate(angle);
  };

  Ship.prototype.rotate = function(angle) {
    this.vertices = this.vertices.map(function(coords){
      var x = Math.cos(angle)*coords[0] + Math.sin(angle) * coords[1];
      var y = -Math.sin(angle)*coords[0] + Math.cos(angle) * coords[1];
      return [x, y];
    }.bind(this));
  };

  Ship.prototype.move = function() {

    var dist = Asteroids.Util.dist([0,0], this.vel);
    this.pos[0] += dist * Math.sin(this.rot);
    this.pos[1] += dist * Math.cos(this.rot);
  };


})();
