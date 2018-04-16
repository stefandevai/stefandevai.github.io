GameControl.Load = function(game) {
	this.background = null;
	this.plCase = null;
	this.preloadBar = null;
	this.ready = false;
};

GameControl.Load.prototype = {
	preload: function() {
		// Load stuff
		this.background = this.add.sprite(0, 0, 'PabloBG');
		this.plCase = this.add.sprite(100, 328, 'PreloaderBarCase');
		this.preloadBar = this.add.sprite(111, 339, 'PreloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		// Menu assets
		this.load.spritesheet('JugarButton', 'src/img/jugar_button.png', 82, 56, 3);
		this.load.spritesheet('NivelesButton', 'src/img/niveles_button.png', 92, 56, 3);
		this.load.spritesheet('InstrucButton', 'src/img/instruc_button.png', 178, 56, 3);
		this.load.spritesheet('CreditosButton', 'src/img/creditos_button.png', 114, 56, 3);

		// Game assets
		this.load.spritesheet('spritesheet', 'src/sprites/spritesheet.png', 32, 32);
		this.load.spritesheet('pablo', 'src/sprites/pablo_sprites.png', 42, 58);
		this.load.spritesheet('robot1', 'src/sprites/robot1.png', 28, 64);
		this.load.tilemap('map', 'src/maps/tmapf.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.audio('vamos', 'src/sound/conspirazion_vamos.ogg');
		this.load.audio('barricadas', 'src/sound/barricadas.ogg');
		this.load.audio('glass-break', 'src/sound/glass-break.ogg');
		this.load.audio('fire-loop', 'src/sound/fire-loop.ogg');
	},

	create: function() {
		this.preloadBar.cropEnabled = false;
	},

	update: function() {
		if(this.cache.isSoundDecoded('vamos') && this.ready == false) 
		{
			this.ready = true;
			this.state.start('MainMenu');
		}
	}
};
