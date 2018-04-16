GameControl.MainMenu = function(game) {
	this.menu_music = null;
	this.jButton = null;
	this.nButton = null;
	this.iButton = null;
	this.cButton = null;
};

GameControl.MainMenu.prototype = {
	create: function() {
		this.menu_music = this.add.audio('vamos', 0.3, true);
		this.menu_music.play();

		var ini_high = 285;
		this.add.sprite(0, 0, 'PabloBG');
		this.jButton = this.add.button(180, ini_high, 'JugarButton', this.startGame, this, 1, 0, 2);
		this.nButton = this.add.button(180, ini_high + 44, 'NivelesButton', this.chooseLevel, this, 1, 0, 2);
		this.iButton = this.add.button(180, ini_high + 44*2, 'InstrucButton', this.showInstructions, this, 1, 0, 2);
		this.cButton = this.add.button(180, ini_high + 44*3, 'CreditosButton', this.showCredits, this, 1, 0, 2);
	},

	update: function() {

	},

	startGame: function(pointer) {
		this.menu_music.stop();
		this.state.start('InGame');
	},

	chooseLevel: function() {

	},

	showInstructions: function () {

	},

	showCredits: function () {

	}
};
