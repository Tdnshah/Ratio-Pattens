var boot = function(patternsRatio){};

boot.prototype = {

	preload: function () {
		this.load.image('logo','assets/images/logo.png');
		this.load.image('preloader','assets/images/preloader-bar.png');
//		this.load.webfont('tahoma','Tahoma')
	},
	
	create: function () {
		this.scale.pageAlignHorizontally = true;
		this.state.start ('preload');
}
	
}