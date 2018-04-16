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
	this.rnd;
};

// Variables
var player;
var player_scale = 2;
var facingLeft = false;
var map;
var layer1;
var layer2;
var layer3;
var layer4;
var water_layer;
var music;
var grounded;
var onWater = false;
var JUMP_FORCE = 530;
var DAMPING;
var GRAVITY = 1000;

var water_tiles;
var topwater_tiles;

var isOnGround;
var isOnWater;
var isOnTopWater;

var changeToWater = function(){
	//player.body.gravity.y = 100;
	//JUMP_FORCE = 200;
}

var changeToAir = function() {
	
	if (player.body.gravity.y < 1000)
	{
		JUMP_FORCE = 530;
	 	player.body.gravity = 1000;
	}
}


GameControl.InGame.prototype = {
	create: function() {

		this.stage.backgroundColor = '#606756';
		this.physics.startSystem(Phaser.Physics.ARCADE);

		DAMPING = new Phaser.Point(0, 0);

		this.time.advancedTiming = true;

		// Map
		map = this.add.tilemap('woods');
		map.addTilesetImage('wood_tiles', 'tileset');
		layer1 = map.createLayer('bgtrees_layer');

		// Player
		player = this.add.sprite(228/*2400*/, 690/*1600*/, 'insurgente');
		player.anchor.setTo(.5, 1);
		player.smoothed = false;

		this.physics.arcade.enable(player);
		player.body.gravity.y = GRAVITY;
		player.body.setSize(25, 102, 0, 0)
		player.body.collideWorldBounds = true;

		player.animations.add('idle', [0,1,2,3,4,5], 5, true);
		player.animations.add('walk', [8,9,10,11,12,13,14,15], 8, true);
		player.animations.add('jump', [16,17,18,19,20,21,22,20], 8, false);
		player.animations.add('falling', [20,21,22], 8, true);

		// Camera
		this.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);

		// Music
		music = this.add.audio('sunshine', 1, true);
		music.onDecoded.add(startMusic, this);

		//Cursors
		cursors = this.input.keyboard.createCursorKeys();

		// Front Layers
		layer2 = map.createLayer('collide_layer');
		layer2.resizeWorld();
		map.setCollisionBetween(0, 100, true, layer2, true);
		//layer.debug = true;
		layer3 = map.createLayer('frente_layer');
		water_layer = map.createLayer('water_layer');

		water_tiles = this.add.group();
		water_tiles.enableBody = true;
    	water_tiles.physicsBodyType = Phaser.Physics.ARCADE;
    	water_tiles.alpha = 0.0;

    	topwater_tiles = this.add.group();
    	topwater_tiles.enableBody = true;
    	topwater_tiles.physicsBodyType = Phaser.Physics.ARCADE;
    	topwater_tiles.alpha = 0.0;

    	var waterfalls = this.add.group();
		
		// Collide Layer tiles settings
		for (var i = 0; i < map.width; i++)
		{
			for (var j = 0; j < map.height; j++)
			{
				// BG layer
				var m_tile = map.getTile(i, j, 'bgtrees_layer', true);
				if (m_tile.index === 26)
				{
					var waterfall = waterfalls.create(i*64, j*64, 'tileset', m_tile.index - 1);
					waterfall.animations.add('w-anim', [28,29,21], 7, true);
					waterfall.play('w-anim');
				}

				// Collision layer
				m_tile = map.getTile(i, j, 'collide_layer', true);
				if (m_tile.index === 34 || m_tile.index === 35 || m_tile.index === 41 || m_tile.index === 42 || m_tile.index === 43 || m_tile.index === 44 || m_tile.index === 45 || m_tile.index === 46 || m_tile.index === 47 || m_tile.index === 48)
				{
					m_tile.setCollision(false, false, true, false);
				}
				else if (m_tile.index === 23)
				{
					m_tile.setCollision(false, false, false, false);
					var c = water_tiles.create(i*64, j*64, 'tileset', m_tile.index - 1);
				}
				else if (m_tile.index === 15)
				{
					m_tile.setCollision(false, false, false, false);
					var c = topwater_tiles.create(i*64, j*64, 'tileset', m_tile.index - 1)
				}
				else if (m_tile.index != -1)
				{
					m_tile.setCollision(true, true, true, true);
				}

				// Water layer
				m_tile = map.getTile(i, j, 'water_layer', true);
				if (m_tile.index === 26)
				{
					var waterfall = waterfalls.create(i*64, j*64, 'tileset', m_tile.index - 1);
					waterfall.animations.add('w-anim', [28,29,21], 7, true);
					waterfall.play('w-anim');
				}
			}
		}

		var darkborder = this.add.sprite(0, 0, 'darkborder');
		darkborder.fixedToCamera = true;
	},

	update: function() {
		isOnGround = this.physics.arcade.collide(player, layer2);
		isOnWater = this.physics.arcade.overlap(player, water_tiles, this.changePhysics.onWater, null, this);
		isOnTopWater = this.physics.arcade.overlap(player, topwater_tiles, this.changePhysics.onTopWater, null, this);

		if(isOnWater && DAMPING.x === 0){
			DAMPING.x = 100;
			DAMPING.y = 100;
		}
		else if(DAMPING.x != 0 && !isOnWater)
		{
			DAMPING.x = 0;
			DAMPING.y = 0;
		}

		player.body.velocity.x = 0;

		if (player.body.blocked.down)
		{
			grounded = true;
		}
		else
		{
			grounded = false;
		}

		if (player.body.velocity.y > 0)
		{
			if (player.body.velocity.y > 340)
			{
				player.animations.play('falling');
			}
		}

		if (cursors.left.isDown)
		{
			facingLeft = true;
			player.body.velocity.x = -250 + DAMPING.x;

			if (grounded)
			{
				player.animations.play('walk');
			}
		}
		else if (cursors.right.isDown)
		{
			facingLeft = false;
			player.body.velocity.x = 250 - DAMPING.x;

			if (grounded)
			{
				player.animations.play('walk');
			}
		}
		else if (grounded)
		{
			player.animations.play('idle');
		}

		if (!isOnWater && grounded && cursors.up.isDown)
		{
			player.body.velocity.y = -JUMP_FORCE;
			player.animations.play('jump');
		}

		if (facingLeft === true)
		{
			player.scale.x = -1;
		}
		else
		{
			player.scale.x = 1;
		}

	},

	render: function() {
		// Debug FPS
	  	this.game.debug.text(this.game.time.fps + " FPS" || '--', 2, 14, "#ffffff");
	},

	quitGame: function(pointer) {
		//Borrar lo que fue loaded

		this.state.start('MainMenu');
	},

	changePhysics: {
		onWater: function() {
			if (player.body.velocity.y > 10)
			{
				player.body.velocity.y *= 0.9;
			}
			if (cursors.up.isDown)
			{
				player.body.velocity.y = -JUMP_FORCE + 300;
				player.animations.play('jump');
			}
			if (cursors.down.isDown)
			{
				player.body.velocity.y = 100;
				player.animations.play('jump');
			}
		},

		onTopWater: function() {
			if (player.body.velocity.y < 0)
			{
				player.body.velocity.y *= 0.8712;
			}
			if (!isOnWater && cursors.up.isDown && grounded)
			{
				player.body.velocity.y = -JUMP_FORCE - 200;
				player.animations.play('jump');
			}
		}
	}
}

function startMusic()
{
	music.fadeIn(4000, true);
}
