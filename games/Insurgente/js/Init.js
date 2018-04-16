var GameControl = {};

GameControl.Init = function(game) {

};

GameControl.Init.prototype = {
	init: function() {
		//Aumentar este valor si incluimos suporte para multitouch 
		this.input.maxPointers = 1;

		//No pausar el juego cuando se cambia de ventana
		this.stage.disableVisibilityChange = false;

		// Preferencias para desktop
		this.scale.pageAlignHorizontally = true;
	},

	preload: function() {
		// Los assets del Preloader state
		this.load.image('preloaderBG', 'img/loadbg.png');
		this.load.image('preloaderBar', 'img/loadbar.png');
	},

	create: function() {

		this.state.start('Load');

	}
};