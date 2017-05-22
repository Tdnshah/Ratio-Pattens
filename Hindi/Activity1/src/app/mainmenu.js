var mainmenu = function(patternsRatio){};

var beep;
var thememusic

mainmenu.prototype = {
	preload: function () {		
	},
	create: function () {
		this.logo = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo')
		this.logo.anchor.setTo(0.5)
		
		var text = "Lets start learing ratios and proportion click on the arrow to begin"
	 	beep = this.game.add.audio('beep');
	 	thememusic = this.game.add.audio('theme');
		thememusic.play('',0,1,true);
		var style = {font: "15px Arial", fill: "#fff", align:"center"};	
		this.add.text(this.game.width/4,this.game.height-200, text, style);
		var button = this.game.add.button(this.game.width/2,this.game.height-150,'buttonImage',this.startGame)
		button.anchor.setTo(0.5,0)
		
	},
	update: function () {

	},
	startGame: function() {
		beep.play();
		patternsRatio.state.start('activity1');
	}
	
	
};