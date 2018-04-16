var GameControl = {};

GameControl.Init = function(game) {};

GameControl.Init.prototype = {
	init: function() {
		// Multitouch
		this.input.maxPointers = 1;

		// Pause the game when focus is lost
		this.stage.disableVisibilityChange = true;

		// Desktop preferences
		this.scale.pageAlignHorizontally = true;
	},

	preload: function() {
		// Preloader state assets
		this.load.image('PabloBG', 'src/img/pablobg.png');
		this.load.image('PreloaderBarCase', 'src/img/plcase.png');
		this.load.image('PreloaderBar', 'src/img/loadbar.png');
	},

	create: function() {
		this.state.start('Load');
	}
};
