GameControl.InGame = function(game) {
	this.game;
	this.add;
	this.camera;
	this.cache;
	this.input;
	this.load;
	this.math;
	this.sound;
	this.stage;
	this.time;
	this.tweens;
	this.state;
	this.world;
	this.particles;
	this.physics;

	this.facingLeft = false;
	this.onGround = false;
	this.pointerRot = 0;
	this.maxVol = 0.55;
	this.objTile;
	this.firstGameClick = false;

	// Indexes and factors of carriable objects. Must be in the same order.
	this.carriableObjs = [10, 11];
	this.carriableObjsFactors = [0.85, 0.7];
};

GameControl.InGame.prototype = {
	create: function() {
		// GENERAL settings
		this.TILE_WIDTH = 32;
		this.TILE_HEIGHT = 32;

		this.GRAVITY = 1200;
		this.JUMP_SPEED = -430;
		this.MAX_SPEED = 150;
		this.ACCELERATION = 1500;
		this.DRAG = 1400;

		this.THROW_DELAY = 700;
		this.MOLOTOV_SPEED = 800;
		this.NUMBER_OF_MOLOTOVS = 10;

		this.HIT_DELAY = 700;

		this.NUMBER_OF_GENDARMES = 10;
		this.lastGendarmeAddedAt = 0;

		this.stage.backgroundColor = '#2e2d2d';
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.A, Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.SPACEBAR]);
		this.time.advancedTiming = true;

		// MAP settings - BACKGROUND
    	this.map = this.add.tilemap('map');
		this.map.addTilesetImage('spritesheet');
		this.lBackground = this.map.createLayer('background');

		// PLAYER settings
		this.player = this.game.add.sprite(32, 800, 'pablo', 0);
		this.player.anchor.setTo(0.5, 0.5);
		this.player.smoothed = false;
		this.player.health = 100;
		this.player.lastTimeHit = 0;
		this.player.isCarryingObj = false;
		this.player.objDelay = 0;
		this.player.currentObj = -1;
		this.player.preparedMolo = false;

		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.collideWorldBounds = true;
		this.player.body.gravity.y = this.GRAVITY;
		this.player.body.allowRotation = false;
		this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);
		this.player.body.drag.setTo(this.DRAG, 0);
		this.player.body.setSize(25, 50, 0, 5);

		this.player.animations.add('idle', [0, 1, 0, 0, 0, 0], 3, true);
		this.player.animations.add('walk', [2, 3, 4, 5, 6], 10, true);
		this.player.animations.add('jump', [7, 8, 9, 10, 11], 10, false);
		this.player.animations.add('fall', [10, 11], 10, true);
		this.player.animations.add('molo-prepare', [12, 13, 14, 15, 16, 17, 18], 10, false);
		this.player.animations.add('molo-ready', [19, 20], 10, true);
		this.player.animations.add('molo-throw', [21, 22, 22, 22], 14, false);

    	this.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

    	// GENDARME settings
    	this.gendarmePool = this.game.add.group();
    	this.map.createFromObjects('obj', 401, 'robot1', 0, true, false, this.gendarmePool);
    	this.gendarmePool.forEach(function(gendarme) {
    		gendarme.animations.add('blink', [0, 1], 5, true);
    		gendarme.animations.play('blink');
    		gendarme.smoothed = false;
    		gendarme.anchor.setTo(0.5, 0.5);

    		gendarme.hp = 30;
    		gendarme.triedJump = false;
    		gendarme.onGround = false;
    		gendarme.turnedLeft = false;
    		gendarme.lastTimeHit = 0;

    		this.game.physics.enable(gendarme, Phaser.Physics.ARCADE);
    		gendarme.body.gravity.y = this.GRAVITY;
    		gendarme.body.collideWorldBounds = true;
			gendarme.body.allowRotation = false;
			gendarme.body.maxVelocity.setTo(this.MAX_SPEED/4, this.MAX_SPEED * 5);
			gendarme.body.drag.setTo(this.DRAG, 0);
    	}, this);

    	// MOLOTOV settings
    	this.molotovPool = this.game.add.group();
    	for(var i = 0; i < this.NUMBER_OF_MOLOTOVS; ++i) {
    		var molotov = this.game.add.sprite(0, 0, 'spritesheet', 20);
    		this.molotovPool.add(molotov);
    		molotov.animations.add('flames', [20, 21, 22], 5, true);
    		molotov.anchor.setTo(0.5, 0.5);
    		this.game.physics.enable(molotov, Phaser.Physics.ARCADE);
    		molotov.body.gravity.y = this.GRAVITY;
    		molotov.kill();
    	}

    	this.molotov_itens = this.game.add.group();
    	this.molotov_itens.enableBody = true;

    	this.map.createFromObjects('obj', 21, 'spritesheet', 20, true, false, this.molotov_itens);
    	this.molotov_itens.forEach(function(molotov) {
    		molotov.animations.add('flames', [20, 21, 22], 5, true);
    		molotov.animations.play('flames');
    	}, this);

    	// MAP settings - COLLISION/FOREGROUND
		this.lCollision = this.map.createLayer('collision');
		//this.lForeground = this.map.createLayer('foreground');

		this.lCollision.resizeWorld();
		this.map.setCollisionBetween(0, 100, true, this.lCollision, true);

		// FIRE settings
		this.fires = this.game.add.group();
		this.fireSprites = this.game.add.group();
		for(var i = 0; i < 55; ++i) {
			var fire = this.add.emitter(0, 0, 50);
			this.fires.add(fire);
			fire.makeParticles('spritesheet', [23, 24, 25, 26]);
			fire.lifespan = 500;
			fire.setRotation(0, 100);
			fire.setScale(0.7, 0.95, 0.7, 0.95, 500);
			fire.maxParticleSpeed = new Phaser.Point(100, 0);

			fire.spr = this.game.add.sprite(0, 0, 'spritesheet', 0);
			this.fireSprites.add(fire.spr);
			this.game.physics.enable(fire.spr, Phaser.Physics.ARCADE);
			fire.spr.alpha = 0.0;
			fire.spr.kill()

			fire.kill();
		}

		// BOX settings
		this.carryingObj = this.game.add.sprite(0, 0, 'spritesheet', 9);
		this.game.physics.enable(this.carryingObj, Phaser.Physics.ARCADE);
		this.carryingObj.immovable = true;
		this.carryingObj.kill();

		// SOUND settings
		this.main_song = this.add.audio('barricadas', 0.25, true);
		this.glass_break = this.add.audio('glass-break', 0.6, false);
		this.fire_loop = this.add.audio('fire-loop', 0.0, true);

		this.main_song.play();
		this.fire_loop.play();

		// GUI settings
		this.molotovIcon = this.game.add.sprite(this.game.width - 90, 8, 'spritesheet', 20);
    	this.molotovIcon.animations.add('flames', [20, 21, 22], 5, true);
    	this.molotovIcon.fixedToCamera = true;
    	this.molotovIcon.animations.play('flames');

	},

	update: function() {
		this.update_player();
		this.update_gendarmes();
		this.update_molotovs();
		this.update_fires();

		// INPUT
		// Jump
		if(this.onGround && (this.input.keyboard.downDuration(Phaser.Keyboard.W, 10) || this.input.keyboard.downDuration(Phaser.Keyboard.UP, 10))) {
			this.player.body.velocity.y = this.JUMP_SPEED;
			this.player.animations.play('jump');
		}

		// Left/Right movement
		if(this.input.keyboard.isDown(Phaser.Keyboard.A) || this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.player.body.acceleration.x = -this.ACCELERATION;
			if(this.player.body.velocity.y == 0) this.player.animations.play('walk');
			if(this.facingLeft == false) this.facingLeft = true;
		}
		else if(this.input.keyboard.isDown(Phaser.Keyboard.D) || this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.body.acceleration.x = this.ACCELERATION;
			if(this.player.body.velocity.y == 0) this.player.animations.play('walk');
			if(this.facingLeft == true) this.facingLeft = false;
		}
		else {
			this.player.body.acceleration.x = 0;
		}

		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			// Carrying system
			this.carryObj();
		}

		// Throw molotov
		if (this.game.input.activePointer.isDown) {
			if (this.input.keyboard.isDown(Phaser.Keyboard.G)) {
				this.addGendarme();
			}
			else if (this.NUMBER_OF_MOLOTOVS > 0) {
				if (!this.player.preparedMolo) this.player.animations.play('molo-prepare');
				else this.player.animations.play('molo-ready');
				if (this.player.animations.currentAnim.frame == 18) this.player.preparedMolo = true;
			}
		}
		if (this.game.input.activePointer.justReleased()) {
			if (this.NUMBER_OF_MOLOTOVS > 0 && this.player.preparedMolo) this.throwMolotov();
		} 
	},

	render: function() {
	  	//this.game.debug.text(this.game.time.fps + " FPS" || '--', 2, 14, "#ffffff");
	  	//this.game.debug.body(this.player);
	  	this.game.debug.text("VIDA: " + this.player.health, 10, 30, "#ffffff");
	  	this.game.debug.text("x " + this.NUMBER_OF_MOLOTOVS, this.game.width - 50, 30, "#ffffff");	
	},

	update_player: function() {
		this.physics.arcade.collide(this.player, this.lCollision); // Make the player collide with the collision layer
		this.physics.arcade.overlap(this.player, this.molotov_itens, this.collectMolotov, null, this); // Collect molotovs

		this.physics.arcade.collide(this.player, this.gendarmePool, function() {
			this.hitPlayer(10);
		}, null, this);

		// If player dies
		if(this.player.health == 0) {
			this.fire_loop.stop();
			this.main_song.stop();
			this.state.start("MainMenu");
		}

		if(this.player.body.blocked.down) {
			this.onGround = true;
			if(Math.abs(this.player.body.acceleration.x) < 0.1) {
				if(this.player.animations.currentAnim.name != 'molo-prepare' && this.player.animations.currentAnim.name != 'molo-ready' && this.player.animations.currentAnim.name != 'molo-throw') this.player.animations.play('idle');
				else if (this.player.animations.currentAnim.isFinished) this.player.animations.play('idle');
			} 
		} 
		else {
			this.onGround = false;
			if(this.player.body.velocity.y > 260) this.player.animations.play('fall');
		}

		// Sprite transform
		if(this.facingLeft) this.player.scale.x = -1;
		else this.player.scale.x = 1;

		// Carrying Box
		if (this.player.isCarryingObj) {
			if(this.facingLeft) {
				this.carryingObj.x = this.player.x - 20;
				this.carryingObj.y = this.player.y - 45;
			}
			else {
				this.carryingObj.x = this.player.x - 15;
				this.carryingObj.y = this.player.y - 45;
			}
		}
	},

	update_gendarmes: function() {
		this.physics.arcade.collide(this.gendarmePool, this.lCollision);
		this.physics.arcade.collide(this.gendarmePool);
		this.physics.arcade.overlap(this.gendarmePool, this.fireSprites, function(gendarme, fire) {
			if(this.game.time.now - gendarme.lastTimeHit > this.HIT_DELAY && gendarme.hp > 0) {
				gendarme.lastTimeHit = this.game.time.now;
				gendarme.hp -= 5;
				if(gendarme.hp < 0) gendarme.hp = 0;

				if (gendarme.turnedLeft) {
				gendarme.body.velocity.y = -300;
				gendarme.body.velocity.x = this.MAX_SPEED;
				}
				else {
					gendarme.body.velocity.y = -300;
					gendarme.body.velocity.x = -this.MAX_SPEED;
				}
			}
		}, null, this);

		this.gendarmePool.forEachAlive(function(gendarme){
			var dst_gendarme_player = Math.sqrt(Math.pow(gendarme.x - this.player.x, 2) + Math.pow(gendarme.y - this.player.y, 2));
			if (dst_gendarme_player < 400) {
				if (this.player.x < gendarme.x) {
					gendarme.body.acceleration.x = -400;
					gendarme.turnedLeft = true;
				}
				else {
					gendarme.body.acceleration.x = 400;
					gendarme.turnedLeft = false;
				}

				if(gendarme.onGround && dst_gendarme_player > 100 && (gendarme.body.blocked.left || gendarme.body.blocked.right)) {
					gendarme.body.velocity.y = -400;
				}

				if (gendarme.body.blocked.down) gendarme.onGround = true;
				else gendarme.onGround = false;

				if (gendarme.turnedLeft) gendarme.scale.x = -1;
				else gendarme.scale.x = 1;

				if(gendarme.hp <= 0) gendarme.kill();
			}
		}, this);
		
	},

	update_molotovs: function() {
		this.physics.arcade.collide(this.molotovPool, this.lCollision, function(molotov) {
			var hit_sin = Math.sin(molotov.rotation);
			var hit_cos = Math.cos(molotov.rotation);
			var tiles_in_fire = Math.ceil((Math.abs(hit_cos)*52 - 27)/3.5);
			var tile_hitX = this.lCollision.getTileX(molotov.x);
			var tile_hitY = this.lCollision.getTileY(molotov.y);

			// Play glass breaking sound - the nearer, the louder.
			var current_tile = Math.abs(this.player.x)/this.TILE_WIDTH;
			this.glass_break.volume = 1/(Math.abs(Math.abs(tile_hitX) - current_tile) + 1) + 0.1;
			this.glass_break.play();

			if(hit_cos >= 0) {
				for(var i = tile_hitX; i <= tile_hitX + tiles_in_fire && i < this.world.width/this.TILE_WIDTH; i++) {
					var tile = this.map.getTile(i, tile_hitY, 'collision', true);
					if(tile.index != -1) break; // If it's not an empty tile, break.
					if(tile_hitY + 1 > this.world.height/this.TILE_HEIGHT) break;

					tile = this.map.getTile(i, tile_hitY + 1, 'collision', true);
					while(tile.index == -1) {
						tile_hitY++;
						tile = this.map.getTile(i, tile_hitY + 1, 'collision', true);
					}
					this.getFire(i*this.TILE_WIDTH, tile_hitY*this.TILE_HEIGHT, hit_sin, false);
					hit_sin *= 1.45;
				}
			}
			else {
				for(var i = tile_hitX; i >= tile_hitX - tiles_in_fire && i > 0; i--) {
					var tile = this.map.getTile(i, tile_hitY, 'collision', true);
					if(tile.index != -1) break; // If it's not an empty tile, break.
					if(tile_hitY + 1 > this.world.height/this.TILE_HEIGHT) break;

					tile = this.map.getTile(i, tile_hitY + 1, 'collision', true);
					while(tile.index == -1) {
						tile_hitY++;
						tile = this.map.getTile(i, tile_hitY + 1, 'collision', true);
					}

					this.getFire(i*this.TILE_WIDTH, tile_hitY*this.TILE_HEIGHT, hit_sin, false);
					hit_sin *= 1.45;
				}
			}

			// Kill the molotov that reached the ground and turn its emitter off.
			molotov.fire_emitter.on = false;
			molotov.kill();

		}, null, this);

		// Gets the angle from the player to the pointer. Used to calculate molotov trajectory.
		this.pointerRot = this.game.physics.arcade.angleToPointer(this.player);
		
		this.molotovPool.forEachAlive(function(molotov) {
			if(Math.cos(molotov.iniRot) >= 0) molotov.rotation = Math.atan2(molotov.body.velocity.y, molotov.body.velocity.x + 600);
			else molotov.rotation = Math.atan2(molotov.body.velocity.y, molotov.body.velocity.x - 600);
			// Update the position of the fire emitter on each step and emit a particle 
			molotov.fire_emitter.x = molotov.x;
			molotov.fire_emitter.y = molotov.y;
			molotov.fire_emitter.emitParticle();
		}, this);
	},

	update_fires: function() {
		var dst_fire = 100000;
		this.fires.forEachAlive(function(fire) {
			if(Math.sqrt(Math.pow(this.player.x - fire.x, 2) + Math.pow(this.player.y - fire.y, 2)) < dst_fire) {
			 	dst_fire = Math.sqrt(Math.pow(this.player.x - fire.x, 2) + Math.pow(this.player.y - fire.y, 2));
			 	this.maxVol = fire.alpha*0.7;
			 	if(this.maxVol > 0.55) this.maxVol = 0.55;
			}
			fire.emitParticle();
			if(fire.alpha < 0.15) fire.spr.kill();
			if(fire.alpha < 0.05) {
				fire.kill();
			}
			else fire.alpha *= 0.997;
		}, this);
		if(dst_fire < 50) {
			this.fire_loop.volume = this.maxVol;
		}
		else if(dst_fire < 1000) {
		 	this.fire_loop.volume = Math.pow(150/dst_fire, 2);
		 	if(this.fire_loop.volume > this.maxVol) this.fire_loop.volume = this.maxVol;
		}
		else this.fire_loop.volume = 0;
	},

	throwMolotov: function() {
		if(this.lastMolotovShotAt == undefined) this.lastMolotovShotAt = 0;
		if(this.game.time.now - this.lastMolotovShotAt < this.THROW_DELAY) return;
    	this.lastMolotovShotAt = this.game.time.now;
    	if(!this.firstGameClick) {
    		this.firstGameClick = true;
    		return;
    	}
		this.player.preparedMolo = false;
    	this.player.animations.play('molo-throw');

    	var molotov = this.molotovPool.getFirstDead();

    	if(molotov == null || molotov == undefined) return;
    	molotov.revive();
    	molotov.checkWorldBounds = true;
    	molotov.outOfBoundsKill = true;

    	molotov.reset(this.player.x, this.player.y - 30);
    	molotov.iniRot = this.pointerRot;
    	molotov.body.velocity.x = Math.cos(molotov.iniRot) * this.MOLOTOV_SPEED;
    	molotov.body.velocity.y = Math.sin(molotov.iniRot) * this.MOLOTOV_SPEED;
    	this.NUMBER_OF_MOLOTOVS--;

    	// Create a particle emitter for the molotov
	    molotov.fire_emitter = this.add.emitter(molotov.x, molotov.y, 70);
	    molotov.fire_emitter.makeParticles('spritesheet', [23, 24, 25, 26]);
	    molotov.fire_emitter.lifespan = 500;
	    molotov.fire_emitter.setAlpha(0.9, 0.0, 700);
	    molotov.fire_emitter.setScale(1.0, 0.2, 1.0, 0.2, 1000);
	    molotov.fire_emitter.setRotation(0, 100);
	    molotov.fire_emitter.maxParticleSpeed = new Phaser.Point(-80,40);
  		molotov.fire_emitter.minParticleSpeed = new Phaser.Point(-190,-40);

  		molotov.animations.play('flames');
	},

	collectMolotov: function(player, molotov) {
		this.NUMBER_OF_MOLOTOVS++;
		molotov.kill();	
	},

	getFire: function(x, y, size, UPDATE_POS_FLAG) {
  		var fire = this.fires.getFirstDead();
  		if(fire == null || fire == undefined) return;
  		fire.revive();
  		fire.x = x;
		fire.y = y + 20;
  		fire.checkWorldBounds = true;
		fire.outOfBoundsKill = true;
		fire.alpha = 1.0;
		fire.setAlpha(0.9, 0.0, 1000);
		fire.maxParticleSpeed = new Phaser.Point(100, 0);
  		fire.minParticleSpeed = new Phaser.Point(-100, -220*Math.abs(size) - 100);
  		fire.updatePos = UPDATE_POS_FLAG;

  		
  		if(fire.spr == null || fire.spr == undefined) return;
  		fire.spr.revive();
    	fire.spr.checkWorldBounds = true;
    	fire.spr.outOfBoundsKill = true;
    	fire.spr.reset(x, y);
	},

	hitPlayer: function(hp) {
		if(this.game.time.now - this.player.lastTimeHit > this.HIT_DELAY && this.player.health > 0) {
			this.player.lastTimeHit = this.game.time.now;
			this.player.health -= hp;
			if(this.player.health < 0) this.player.health = 0;

			if (this.facingLeft) {
				this.player.body.velocity.y = -300;
				this.player.body.velocity.x = this.MAX_SPEED;
			}
			else {
				this.player.body.velocity.y = -300;
				this.player.body.velocity.x = -this.MAX_SPEED;
			}
		}
	},

	addGendarme: function() {
		if (this.game.time.now - this.lastGendarmeAddedAt < this.THROW_DELAY) return;
    	this.lastGendarmeAddedAt = this.game.time.now;
    	var gendarme = this.gendarmePool.getFirstDead();
    	if (gendarme == null || gendarme == undefined) return;
    	gendarme.revive();
    	gendarme.hp = 30;
    	gendarme.triedJump = false;
		gendarme.onGround = false;
		gendarme.turnedLeft = false;
		gendarme.lastTimeHit = 0;
    	gendarme.reset(this.input.mousePointer.worldX, this.input.mousePointer.worldY);
    	gendarme.animations.play('blink');
	},

	carryObj: function() {
		// Leave object
		if (this.player.isCarryingObj && this.game.time.now - this.player.objDelay > this.HIT_DELAY) {
			this.player.objDelay = this.game.time.now;
			var current_tileX = this.lCollision.getTileX(this.player.x);
			var current_tileY = this.lCollision.getTileY(this.player.y);
			if(this.facingLeft) {
				var tile1 = this.map.getTile(current_tileX - 1, current_tileY + 1, 'collision', true);
				var tile2 = this.map.getTile(current_tileX - 1, current_tileY, 'collision', true);
				var tile3 = this.map.getTile(current_tileX - 1, current_tileY - 1, 'collision', true);

				if (tile1.index != -1 && tile2.index == -1) {
					this.leaveObj(current_tileX - 1, current_tileY);
				}
				else if (tile2.index != -1 && tile3.index == -1) {
					this.leaveObj(current_tileX - 1, current_tileY - 1);
				}
			}
			else {
				var tile1 = this.map.getTile(current_tileX + 1, current_tileY + 1, 'collision', true);
				var tile2 = this.map.getTile(current_tileX + 1, current_tileY, 'collision', true);
				var tile3 = this.map.getTile(current_tileX + 1, current_tileY - 1, 'collision', true);

				if (tile1.index != -1 && tile2.index == -1) {
					this.leaveObj(current_tileX + 1, current_tileY);
				}
				else if (tile2.index != -1 && tile3.index == -1) {
					this.leaveObj(current_tileX + 1, current_tileY - 1);
				}
			}		
		}
		// Carry object
		else if (!this.player.isCarryingObj && this.game.time.now - this.player.objDelay > this.HIT_DELAY) {
			this.player.objDelay = this.game.time.now;
			var current_tileX = this.lCollision.getTileX(this.player.x);
			var current_tileY = this.lCollision.getTileY(this.player.y);
			if(this.facingLeft) {
				var tile1 = this.map.getTile(current_tileX - 1, current_tileY, 'collision', true);
				var tile2 = this.map.getTile(current_tileX - 1, current_tileY - 1, 'collision', true);
				var tile3 = this.map.getTile(current_tileX - 1, current_tileY - 2, 'collision', true);
				var indexOfCarriables1 = this.carriableObjs.indexOf(tile1.index);
				var indexOfCarriables2 = this.carriableObjs.indexOf(tile2.index);

				if (indexOfCarriables1 != -1 && tile2.index == -1) {
					this.objTile = this.map.copy(current_tileX - 1, current_tileY, 1, 1, 'collision');
					this.map.removeTile(current_tileX - 1, current_tileY, 'collision');
					this.addObj2Player(this.carriableObjs[indexOfCarriables1] - 1, this.carriableObjsFactors[indexOfCarriables1]);
				}
				else if (indexOfCarriables2 != -1 && tile3.index == -1) {
					this.objTile = this.map.copy(current_tileX - 1, current_tileY - 1, 1, 1, 'collision');
					this.map.removeTile(current_tileX - 1, current_tileY - 1, 'collision');
					this.addObj2Player(this.carriableObjs[indexOfCarriables2] - 1, this.carriableObjsFactors[indexOfCarriables2]);
				}
			}
			else {
				var tile1 = this.map.getTile(current_tileX + 1, current_tileY, 'collision', true);
				var tile2 = this.map.getTile(current_tileX + 1, current_tileY - 1, 'collision', true);
				var tile3 = this.map.getTile(current_tileX + 1, current_tileY - 2, 'collision', true);
				var indexOfCarriables1 = this.carriableObjs.indexOf(tile1.index);
				var indexOfCarriables2 = this.carriableObjs.indexOf(tile2.index);

				if (indexOfCarriables1 != -1 && tile2.index == -1) {
					this.objTile = this.map.copy(current_tileX + 1, current_tileY, 1, 1, 'collision');
					this.map.removeTile(current_tileX + 1, current_tileY, 'collision');
					this.addObj2Player(this.carriableObjs[indexOfCarriables1] - 1, this.carriableObjsFactors[indexOfCarriables1]);
				}
				else if (indexOfCarriables2 != -1 && tile3.index == -1) {
					this.objTile = this.map.copy(current_tileX + 1, current_tileY - 1, 1, 1, 'collision');
					this.map.removeTile(current_tileX + 1, current_tileY - 1, 'collision');
					this.addObj2Player(this.carriableObjs[indexOfCarriables2] - 1, this.carriableObjsFactors[indexOfCarriables2]);
				}
			}
		}
	},

	addObj2Player: function(tile_index, loss_factor) {
		this.carryingObj.revive();
		this.carryingObj.frame = tile_index;
		this.carryingObj.reset(this.player.x, this.player.y - 45);
		this.currentObj = tile_index + 1;

		this.player.body.maxVelocity.setTo(this.MAX_SPEED*loss_factor, this.MAX_SPEED * 10 * loss_factor);
		this.JUMP_SPEED = this.JUMP_SPEED * loss_factor;
		this.ACCELERATION = this.ACCELERATION * loss_factor;
		this.DRAG = this.DRAG * (1+loss_factor);
		this.player.isCarryingObj = true;
	},

	leaveObj: function(x, y) {
		this.map.paste(x, y, this.objTile, 'collision');
		this.player.isCarryingObj = false;
		this.player.currentObj = -1;
		this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);
		this.JUMP_SPEED = -430;
		this.ACCELERATION = 1500;
		this.DRAG = 1400;
		this.carryingObj.kill();
	}
};
