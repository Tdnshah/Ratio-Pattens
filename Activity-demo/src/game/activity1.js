//this variables are used in placeTile function
	//	this variables are used for defining the starting co-ordinateds of the grid formation  
		var gridTileStartPointX = 265;
		var gridTileStartPointY = 147;
	//	this variable is used to define the width of the rectangle and also the width of the tiles
		var gridTileRectWidth = 40;	
	//	this gridtile array is created to hold the co-ordinates of each tiles place on the game board
		var gridtile = [];
	//	this array is created to hold both x and y co-ordinates of each tiles and then is pushed into allgridCoordinate array created below 	
		var gridCoordinates = [];
	//	this array is created to hold the arrays of x and y co-ordinates of all the tiles this is then used to map the position the tiles.
		var allgridCoordinates = [];
	//this variables are used to define the no of rows and columns on the boards
		var rows = 9;
		var columns = 9;
	//	this array holds the tilePosition sets the default value to 0 and upon students interaction with the grid records his selectedtiles as input
		var studentInputArray = [];


//this variable is used to hold the value of tiles selected to identify which tile is selected and will placed in the play grids
var selectedTile = 0;

//this variable is used for defining the sound used while tile is added in the grid
var tileaddingSound; 

//this arrays are used by the highlighted function to highlight the selected tiles
	//The highlighted1 array is used to check if the highlighted or not its default value id false
	var highlighted1 = [false, false];
//	this highlighted array holds the glowTile image status
	var highlighted = [];

// this is a array used to define the correct answer of the pattern and this is used to validate against studentInputArray

var correctAnswer = [1,1,1,1,1,1,1,1,1,
					 1,1,1,1,1,1,1,1,1,
					 1,1,1,1,1,1,1,1,1,
					 1,1,1,2,2,2,1,1,1,
					 1,1,1,2,2,2,1,1,1,
					 1,1,1,2,2,2,1,1,1,
					 1,1,1,1,1,1,1,1,1,
					 1,1,1,1,1,1,1,1,1,
					 1,1,1,1,1,1,1,1,1,
					 ];

var attemptCount = 0;
var reg={};
var activity1 = function(patternsRatio){};
var inCorrectFeedbackTextAttempt1 = "Not quite right. \n Your pattern must: \n Fill the grid completely. \n Look like an enlarged version of the original pattern. \n Click TRYAGAIN to clear the grid and try again.";

var inCorrectFeedbackTextAttempt2 = "Not quite right. \n After scaling up the original pattern to fill the grid, it looks like this:";

//here we create a phaser function or object which holds all the game logic
activity1.prototype = {
	preload: function (){
		this.load.image('a1q1Background','assets/images/activity1/BACK_GROUND.png');
		this.load.image('question','assets/images/activity1/QUESTION.png');
		this.load.image('answerActivity1','assets/images/activity1/answerActivity1.png');
	},
	
	create: function () {
//		physic is initiated as need in game for making Phaser.Rect and getBounds types of function
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
//		adding background image
		var backGround = this.add.image(this.world.centerX,this.world.centerY,'a1q1Background');
		backGround.anchor.setTo(0.5);

		tileaddingSound = this.game.add.audio('tileAdding');
		
		
//		adding validation buttons like submit and reset
		var submit = this.add.button(360,555,'SubmitResetButton',this.onSubmit,this,1,2,3);
		submit.anchor.setTo(0.5);
		
		var reset = this.add.button(525,553,'SubmitResetButton',this.onReset,this,4,5,6);
		reset.anchor.setTo(0.5);
		
//		adding question image
		var question = this.add.image(16,141,'question');

//		adding the question text
		var questionText ="Scale up the given pattern so that it completely fills the grid. \n The scaled up pattern must look exactly like the original pattern but bigger." 
		var questionTextStyle = {font: "17px Arial", fill: "black", align:"center"};	
		var questionTextOnDisplay = this.add.text(this.game.world.centerX,this.game.height-610,questionText,questionTextStyle)
		questionTextOnDisplay.anchor.setTo(0.5);
		questionTextOnDisplay.lineSpacing = -5;

//		adding the instructional text
		var instructionText = "Drag the green and red tiles over the grid to colour it. \n Click Submit to check your answer."
		var instructionTextStyle = {font: "14px Arial", fill: "blue	", align:"center"};
		var instructionTextOnDisplay = this.add.text(this.game.world.centerX,this.game.height-570,instructionText,instructionTextStyle)
		instructionTextOnDisplay.anchor.setTo(0.5);
		instructionTextOnDisplay.lineSpacing = -5;
		
		
//		the below functions adds the tiles to the board
		this.placeTiles(rows,columns)
		
//		the below function addes the green tile with all the control logic
		this.greenTile();
		this.pinkTile();
		console.log(selectedTile)
		this.eventListener();
		
		reg.modal = new gameModal(patternsRatio);
		this.createModals();
	
	},
	
		
	
	update: function () {
	
	},
	
	
//	This is function is used for debugging the point pixel position
	render: function(){
		this.game.debug.text('x: '+this.game.input.x + ' y: ' + this.game.input.y,32,32);
//		this.game.debug.geom(gridtile[1], 'rgba(135,0,0,1)') ;
		},
	
	
//	this function is used to make a grid on the board in the play area
	placeTiles: function(rows,columns){
		var s=0;
		var noOfRows = rows;
		var noOfColumns = columns;	
		for (var i=0;i<noOfRows;i++){
			for (var j=0;j<noOfColumns;j++){
				gridtile[s] = this.game.add.sprite(gridTileStartPointX+j*gridTileRectWidth,gridTileStartPointY+i*gridTileRectWidth,'emptyTile',this);
				gridtile[s] = new Phaser.Rectangle(gridTileStartPointX+j*gridTileRectWidth,gridTileStartPointY+i*gridTileRectWidth,gridTileRectWidth,gridTileRectWidth);
				this.game.physics.arcade.enable(gridtile[s]);
				studentInputArray.push(0);
				gridCoordinates.push(gridtile[s].x,gridtile[s].y);				
				allgridCoordinates.push(gridCoordinates);
				gridCoordinates=[];	
				s++;
			}
		}		
	},
	
//	this is the test function created 
	test: function(pointer){
		for (i in gridtile){
			var rectcoordinates = Phaser.Rectangle.contains(gridtile[i],pointer.x,pointer.y);
			if (rectcoordinates == true && selectedTile == 1){
				if (pointer.leftButton.isDown == true){
					console.log(pointer.leftButton.isDown)
				console.log ([gridtile[i].x,gridtile[i].y]);
				var tileadded2 = this.add.sprite(gridtile[i].x,gridtile[i].y,'greenTile')
				}
			}
		} 
	},
	
//	this function is used as a eventlistner which listens the mouse keyboard clicks
	eventListener: function(){
		this.input.mouse.capture = true;
//		this.input.onDown.add(this.test,this);
		var move = this.input.addMoveCallback(this.addTileGrid,this);
//		this.input.onUp.add(this.selectedreset,this);
//		var move = this.input.addMoveCallback(this.addTileGrid,this);
//		console.log(move.x,move.y)	
	},
	
//	here we declare eventlistners for all clicks
	greenTile: function(){
		var greentile = this.add.sprite(75,500,'greenTile');
		greentile.enableSnap = (gridTileRectWidth,gridTileRectWidth,false,true);
		greentile.value = 1;
		greentile.inputEnabled = true;
		this.game.input.mouse.capture = true;
		greentile.events.onInputDown.add(function(){selectedTile = greentile.value;console.log(selectedTile);this.highlight(),beep.play()}, this)

	},
	
	pinkTile: function(){
		var pinktile = this.add.sprite(125,500,'pinkTile');
		pinktile.inputEnabled = true;
//		pinktile.enableSnap = (gridTileRectWidth,gridTileRectWidth,true,true);
		pinktile.value = 2;
		pinktile.events.onInputDown.add(function(){selectedTile = pinktile.value;console.log(selectedTile);this.highlight(),beep.play()}, this)
	},
	
	highlight: function(){
		if (selectedTile == 1 && highlighted1[0] == false) {
			highlighted[0] = this.add.image(75,500,'glowTile');
			highlighted[0].anchor.setTo(0.23)
			highlighted1[0] = true;
			if(highlighted1[1] == true){
					highlighted[1].destroy();
					highlighted1[1] = false;
			}
		}
		else if (selectedTile == 2 && highlighted1[1] == false){
				highlighted[1] = this.add.image(125,500,'glowTile');
				highlighted[1].anchor.setTo(0.23)
				highlighted1[1] = true;
				if(highlighted1[0] == true){
						highlighted[0].destroy();
						highlighted1[0] = false;
				}	
		}
	},
	
	//	This function is used to check if the array are identical or not
	arraysIdentical: function(arr1, arr2) {
		var i = arr1.length;
		if (i !== arr2.length) {
			return false;
		}
		while (i--) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}
		return true;
	},
	
//	This function is used to get the index of the values inside array
	indexOf: function (arr, val, comparer) {
    	for (var i = 0, len = arr.length; i < len; ++i){
        	if ( i in arr && comparer(arr[i], val) ){
            	return i;
        	}
    	}
    	return -1;
	},
	
	addTileGrid: function(pointer){
		if(pointer.x < gridTileStartPointX  || pointer.x > gridTileStartPointX + gridTileRectWidth * rows || pointer.y < gridTileStartPointY || pointer.y > gridTileStartPointY + gridTileRectWidth * columns){
			
		}
		else{
			if (pointer.leftButton.isDown){
				if (selectedTile == 1){	
					for (i in gridtile){
						var rectcoordinates = Phaser.Rectangle.contains(gridtile[i],pointer.x,pointer.y);
						var tileposition = this.indexOf(allgridCoordinates,[gridtile[i].x,gridtile[i].y],this.arraysIdentical)
//						console.log(tileposition, tileposition[i])
						if (rectcoordinates == true && selectedTile == 1){
							if (pointer.leftButton.isDown == true){	
							console.log (tileposition)
							tileaddingSound.play('',0,10);
//							console.log ([gridtile[i].x,gridtile[i].y]);
							studentInputArray[tileposition] = 1
							var tileadded = this.add.sprite(gridtile[i].x,gridtile[i].y,'greenTile')
							}
						}
					} 
				}
				else if(selectedTile == 2) {
					for (i in gridtile){
						var rectcoordinates = Phaser.Rectangle.contains(gridtile[i],pointer.x,pointer.y);
						var tileposition = this.indexOf(allgridCoordinates,[gridtile[i].x,gridtile[i].y],this.arraysIdentical)
						if (rectcoordinates == true && selectedTile == 2)
							{
								if (pointer.leftButton.isDown == true){
									studentInputArray[tileposition] = 2
									console.log (tileposition)
									tileaddingSound.play('',0,10);
		//							console.log(pointer.leftButton.isDown)
//									console.log ([gridtile[i].x,gridtile[i].y]);
//									console.log(tileposition.x)
									var tileadded = this.add.sprite(gridtile[i].x,gridtile[i].y,'pinkTile')
							}
						}
					} 
				}
			}
			
//			if (pointer.rightButton.isDown == true){
//				for (i in gridtile){
//				var rectcoordinates = Phaser.Rectangle.contains(gridtile[i],pointer.x,pointer.y);
//				var tileposition = this.indexOf(allgridCoordinates,[gridtile[i].x,gridtile[i].y],this.arraysIdentical);
//				if (rectcoordinates == true && studentInputArray == 1 || studentInputArray == 2){
//					Phaser.Rectangle.contains(gridtile[i],pointer.x,pointer.y);
//				}
//				}
//			}
		}
	},
	
	/********************************Modal Type *****************************************************************************/	
	
	createModals: function(){	
		
    	reg.modal.createModal({
			type: "modal6",
			includeBackground: true,
			backgroundColor: "0xffffff",
			backgroundOpacity:0.5,
			modalCloseOnInput:true,
			itemsArr: [{
				type: "text",
				content: "Wow you have answered correctly",
				fontFamily: "Arial",
				fontSize: 52,
				offsetY: 100,
				offsetx: 50
			},
					   {
				type: "text",
				content: "5",
				fontFamily: "Arial",
				fontSize: 42,
				offsetY: 0
			}
            ]
        });
			
		reg.modal.createModal({
            type:"correctAnswer",
            includeBackground: true,
			backgroundOpacity:0.6,
            modalCloseOnInput: true,
            itemsArr: [
              {
                    type: "image",
                    content: "correct",
                    offsetY: -50,
                    contentScale: 1.5
                },
				  {
                    type: "text",
                    content: "Well done! You have scaled up the pattern \n correctly and solved the puzzle! \n\n Click NEXT to continue.",
                    fontFamily: "Arial",
                    fontSize:20,
                    color: "black",
                    offsetY:-90,
                    offsetX:-10
                },
				{
                    type: "image",
                    content:"nextNormal",
					buttonHover:"",
					buttonActive:"",
                    offsetY: -10,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
                      patternsRatio.state.start('activity1q1')
                 }
				}
				]
			}),
				
		reg.modal.createModal({
            type:"IncorrectAnswerAttempt1",
            includeBackground: true,
			backgroundOpacity:0.6,
            modalCloseOnInput: true,
            itemsArr: [
              {
                    type: "image",
                    content: "correct",
                    offsetY: -50,
                    contentScale: 2
                },
				  {
                    type: "text",
                    content:inCorrectFeedbackTextAttempt1 ,
                    fontFamily: "Arial",
                    fontSize:20,
                    color: "black",
                    offsetY:-90,
                    offsetX:-10
                },
				{
                    type: "image",
                    content:"tryagainNormal",
					buttonHover:"tryagainOver",
					buttonActive:"tryagaintDown",
                    offsetY: -10,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
                  		selectedTile = 0;
						studentInputArray = []
						patternsRatio.state.start('activity1')      
                 }
				}
		
			]
        });
		
		reg.modal.createModal({
            type:"IncorrectAnswerAttempt2",
            includeBackground: true,
			backgroundColor:0xffffff,
			backgroundOpacity:0.8,
            modalCloseOnInput: false,
            itemsArr: [
//              {
//                    type: "image",
//                    content: "correct",
//                    offsetY: -50,
//                    contentScale: 2
//                },
//				
				{
                    type: "image",
                    content: "answerActivity1",
                    offsetY: -130,
                    contentScale: 1
                },				
				  {
                    type: "text",
                    content:inCorrectFeedbackTextAttempt2 ,
                    fontFamily: "Arial",
                    fontSize:20,
                    color: "black",
                    offsetY:130,
                    offsetX:-10
                },
				{
                    type: "image",
                    content:"nextNormal",
					buttonHover:"nextOver",
					buttonActive:"nextDown",
                    offsetY: 230,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
                        patternsRatio.state.start("activity1q1")
                 }
				}
		
			]
        });
	},
	
	showModalCorrectAttempt: function(){
		reg.modal.showModal("correctAnswer");
//		thememusic.play('',0,1);
	},
	
	showModal_InCorrectAttempt_Lessthan_2: function(){
		reg.modal.showModal("IncorrectAnswerAttempt1");
	},
	
	showModal_InCorrectAttempt_Morethan_2: function(){
		reg.modal.showModal("IncorrectAnswerAttempt2");
//		thememusic.play('',0,1);
	},
	
	
/**************************************************VALIDATION CODE*************************************************************/
	onSubmit: function(){
		if (this.arraysIdentical(studentInputArray,correctAnswer)==true){
			this.showModalCorrectAttempt();
		}
		else if (this.arraysIdentical(studentInputArray,correctAnswer)==false && attemptCount < 2 ){
			attemptCount++;
			this.showModal_InCorrectAttempt_Lessthan_2();
		}
		
		else if (this.arraysIdentical(studentInputArray,correctAnswer)==false && attemptCount >= 2 ){
			this.showModal_InCorrectAttempt_Morethan_2();
		}
	},
	onReset: function (){
		selectedTile = 0;
		studentInputArray = []
		this.state.start('activity1')
	}
	
};