var patternsRatio = patternsRatio || {};

patternsRatio = new Phaser.Game(800, 665, Phaser.CANVAS, '');

patternsRatio.prototype = {

	//	init:function(){
	//	this.game.load = new CustomLoader(patternsRatio);
	//	},
	prelaod: function () {},
	create: function () {},
	update: function () {},

}

patternsRatio.state.add('boot', boot);
patternsRatio.state.add('preload', preload);
patternsRatio.state.add('mainmenu', mainmenu);
patternsRatio.state.add('activity6', activity6);
patternsRatio.state.add('activity6q1', activity6q1);

patternsRatio.state.start('boot');