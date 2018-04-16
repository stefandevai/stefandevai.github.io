window.onload = function() {
	var game = new Phaser.Game(800, 512, Phaser.AUTO, 'game');

	game.state.add('Init', GameControl.Init);
	game.state.add('Load', GameControl.Load);
	game.state.add('MainMenu', GameControl.MainMenu);
	game.state.add('InGame', GameControl.InGame);

	game.state.start('Init');
};
