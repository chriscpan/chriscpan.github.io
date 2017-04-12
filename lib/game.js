(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  // NUM_ASTEROIDS = Math.floor(Math.floor(this.dim_x * this.dim_y / 10000) / 2)
  ASTEROID_VEC = 30;

  var Game = Asteroids.Game = function(options) {
    this.dim_x = options.width;
    this.dim_y = options.height;
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();

    this.ship = new Asteroids.Ship({
      pos: this.randomShipPosition(),
      game: this
    });
  };

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < Math.floor(Math.floor(this.dim_x * this.dim_y / 10000) / 2) ; i++ ) {
      this.asteroids.push(new Asteroids.Asteroid({
        pos: this.randomSidePosition(),
        vel: Asteroids.Util.randomVec(ASTEROID_VEC),
        imgNum: Math.floor(Math.random() * 6),
        game: this
      }));
    }
  };

  Game.prototype.randomPosition = function() {
    var x = Math.random() * this.dim_x;
    var y = Math.random() * this.dim_y;
    return [x, y];
  };

  Game.prototype.randomSidePosition = function() {
    var randOne = Math.random();
    var randTwo = Math.random();
    var x, y;
    if (randOne > 0.5) {
      x = Math.random() * (this.dim_x * 0.45);
    } else {
      x = (this.dim_x - (this.dim_x * 0.45 * Math.random() ));
    }

    if (randTwo > 0.5) {
      y = Math.random() * (this.dim_y * 0.45);
    } else {
      y = (this.dim_y - (Math.random() * this.dim_y * 0.45));
    }
    return [x,y];
  };

  Game.prototype.randomShipPosition = function() {
    // debugger
    var randOne = Math.random();
    var randTwo = Math.random();
    var x, y;
    if (randOne > 0.5) {
      x = (this.dim_x / 2 ) + (this.dim_x * 0.1);
    } else {
      x = (this.dim_x / 2 ) - (this.dim_x * 0.1);
    }

    if (randTwo > 0.5) {
      y = (this.dim_y / 2 ) + (this.dim_y * 0.1);
    } else {
      y = (this.dim_y / 2 ) - (this.dim_y * 0.1);
    }

    return [x, y];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);

    this.allObjects().forEach( function(objs) {
      objs.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    // debugger
    this.allObjects().forEach(function(objs) {
      if (objs.isWrappable) {
        objs.pos = this.wrap(objs.pos);
        objs.move();
      } else {
        if (this.isOutOfBounds(objs.pos)) {
          this.remove(objs);
        } else {
          objs.move();
        }
      }
    }.bind(this));
  };

  Game.prototype.wrap = function(pos) {
    // [0, y] --> [x_max, y]
    if (pos[0] < 0 ) {
      return [ this.dim_x, pos[1] ];
    } else if (pos[0] > this.dim_x) {
      // [x_max, y] --> [0, y]
      return [0, pos[1] ];
    } else if (pos[1] < 0) {
      // [x, 0] --> [x, y_max]
      return [pos[0], this.dim_y];
    } else if (pos[1] > this.dim_y){
      // [x, y_max] --> [x, 0]
      return [pos[0], 0];
    } else {
      return pos;
    }
  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.allObjects().forEach(function(objOne) {
      that.allObjects().forEach(function(objTwo) {
        if (objOne === objTwo) {
          return ;
        }

        if (objOne.isCollidedWith(objTwo)) {
          objOne.collideWith(objTwo);
        }
      });
    });
  };

  Game.prototype.step = function() {
    this.checkCollisions();
    this.moveObjects();
  };

  Game.prototype.remove = function(obj) {
    var idx;
    if (obj instanceof Asteroids.Asteroid) {
      idx = this.asteroids.indexOf(obj);
      this.asteroids.splice(idx, 1);
    } else if ( obj instanceof Asteroids.Bullet) {
      idx = this.bullets.indexOf(obj);
      this.bullets.splice(idx, 1);
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.prototype.add = function(obj) {
    // debugger
    if (obj instanceof Asteroids.Asteroid){
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

  Game.prototype.isOutOfBounds = function(pos) {
    var outBounds = pos[0] < 0 ||
                    pos[0] > this.dim_x ||
                    pos[1] < 0 ||
                    pos[1] > this.dim_y;
    if (outBounds) {
      return true;
    }
  };

  Game.prototype.isWon = function() {
    // debugger
    if (window.candiesShot >= Math.floor(Math.floor(this.dim_x * this.dim_y / 10000) / 2) ) {
      // console.log('win');
      // debugger
      return true;

    }
  };
})();
