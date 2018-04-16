GameControl.MainMenu = function(game) {
	this.music = null;
	this.playButton = null;
};

GameControl.MainMenu.prototype = {
	create: function() {
		this.music = this.add.audio('lapartida');
		this.music.play();

		this.add.sprite(0, 0, 'menuBG');
		this.playButton = this.add.button(295, 240, 'playButton', this.startGame, this, 0, 0, 0);
	},

	update: function() {

	},

	startGame: function(pointer) {
		this.music.stop();
		this.state.start('InGame');
	}
}