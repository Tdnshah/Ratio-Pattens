var preload = function(patternsRatio){};

preload.prototype = {
//	init:function(){
//	this.load = new CustomLoader(patternsRatio);
//	},
	preload: function () {
//		preloading Of all the game images
		this.load.image('buttonImage','assets/images/next.png');
		this.load.image('feedback1','assets/images/activity2/1st_feedback_bg.png');
		this.load.image('feedback2','assets/images/activity2/2nd_feedback_bg.png');
		this.load.image('feedback3','assets/images/activity2/3rd_feedback_bg.png');

		
		this.add.plugin(PhaserInput.Plugin);
		
		this.load.atlas('buttons','assets/images/activity2/SpriteSheets/buttons.png','assets/images/activity2/SpriteSheets/buttons.json');
		this.load.atlas('tiles','assets/images/activity2/SpriteSheets/tiles.png','assets/images/activity2/SpriteSheets/tiles.json');
		this.load.atlas('popupsItems','assets/images/activity2/SpriteSheets/popup_items.png','assets/images/activity2/SpriteSheets/popup_items.json');
		this.load.atlas('soundMute','assets/images/activity2/SpriteSheets/sound.png','assets/images/activity2/SpriteSheets/sound.json');
		this.load.atlas('popupButtons','assets/images/activity2/SpriteSheets/popupButtons.png','assets/images/activity2/SpriteSheets/popupButtons.json');		
		
//		prelaoding of all the game sounds
		this.load.audio('beep','assets/sounds/beep.mp3');
		this.load.audio('theme','assets/sounds/Pim-Poy.wav');
		this.load.audio('tileAdding','assets/sounds/tileadding.mp3');
		this.load.audio('childrenScream','assets/sounds/childrenScream.mp3');

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