var patternsRatio = patternsRatio || {};

patternsRatio = new Phaser.Game(800, 640, Phaser.CANVAS, '')

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
//patternsRatio.state.add('modal',modal);
patternsRatio.state.add('activity3', activity3);
patternsRatio.state.add('activity3q1', activity3q1);

patternsRatio.state.start('boot');