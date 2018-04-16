var patternsRatio = patternsRatio || {};

patternsRatio = new Phaser.Game(800, 640, Phaser.CANVAS, '');

patternsRatio.prototype = {

		init:function(){
		// this.game.load = new CustomLoader(patternsRatio);
		this.game.canvas.style.cursor = crosshair;
	},
	prelaod: function () {},
	create: function () {},
	update: function () {},

}

patternsRatio.state.add('boot', boot);
patternsRatio.state.add('preload', preload);
patternsRatio.state.add('mainmenu', mainmenu);
patternsRatio.state.add('activity1', activity1);
patternsRatio.state.add('activity1q1', activity1q1);

patternsRatio.state.start('boot');