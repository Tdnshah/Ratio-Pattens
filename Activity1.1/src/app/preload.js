var preload = function(patternsRatio){};

preload.prototype = {
//	init:function(){
//	this.load = new CustomLoader(patternsRatio);
//	},
	preload: function () {
//		preloading Of all the game images
		this.load.image('buttonImage','assets/images/next.png');
		this.load.image('emptyTile','assets/images/activity1/EMPTY_TILE.png');
		this.load.image('greenTile','assets/images/activity1/GREEN_TILE.png');
		this.load.image('pinkTile','assets/images/activity1/PINK_TILE.png');
		this.load.image('glowTile','assets/images/activity1/GLOW_TILE.png');
		this.load.image('feedback2','assets/images/activity1/2nd_feedback_bg.png');
		this.load.image('feedback3','assets/images/activity1/3rd_feedback_bg.png');
		this.load.image('feedback1','assets/images/activity1/1st_feedback_bg.png');
		this.load.image('happySmiley','assets/images/activity1/SMILEY_HAPPY.png');
		this.load.image('sadSmiley','assets/images/activity1/SMILEY_SAD.png');
		this.load.image('closeNormal','assets/images/activity1/close_button_normal.png');
		this.load.image('closeOver','assets/images/activity1/close_button_mouse_over.png');
		this.load.image('nextNormal','assets/images/common/NEXT_BUTTON_NORMAL.png');
		this.load.image('nextOver','assets/images/common/NEXT_BUTTON_MOUSE_OVER.png');
		this.load.image('nextDown','assets/images/common/NEXT_BUTTON_MOUSE_DOWN.png');
		this.load.image('tryagainDown','assets/images/common/TRY_AGAIN_BUTTON_MOUSE_DOWN.png');
		this.load.image('tryagainOver','assets/images/common/TRY_AGAIN_BUTTON_MOUSE_OVER.png');
		this.load.image('tryagainNormal','assets/images/common/TRY_AGAIN_BUTTON_NORMAL.png');
		
		this.add.plugin(PhaserInput.Plugin);
//		this.load.atlas('gridFormationButtons','assets/images/activity1/SpriteSheets/gridFormationButtons.png','assets/images/activity1/SpriteSheets/gridFormationButtons.json');
		this.load.atlas('SubmitResetButton','assets/images/activity1/SpriteSheets/SubmitResetButton.png','assets/images/activity1/SpriteSheets/SubmitResetButton.json');
	
		
		
//		prelaoding of all the game sounds
		this.load.audio('beep','assets/sounds/beep.mp3');
		this.load.audio('theme','assets/sounds/Pim-Poy.wav');
		this.load.audio('tileAdding','assets/sounds/tileadding.mp3');

// 		preloading new font to phaser named tahoma
//		this.load.webfont('tahoma','Tahoma');
		
//		logo added
		this.splash = this.add.sprite(this.game.world.centerX,this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);

//		preloader bar added
		this.preloadBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY + 128, 'preloader');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);
	},
	create: function () {
		this.state.start ('mainmenu')
	
	}
	
};