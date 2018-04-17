//this variables are used in placeTile function
//	this variables are used for defining the starting co-ordinateds of the grid formation  
var gridTileStartPointX = 415;
var gridTileStartPointY = 48;
//	this variable is used to define the width of the rectangle and also the width of the tiles
var gridTileRectWidth = 40;
// this variable is used in the addTiles functions for holding all the colored tiles that are added in it
var tileadded = [];

//	this gridtile array is created to hold the co-ordinates of each tiles place on the game board
var gridtile = [];
var gridtile1 = [];
//	this array is created to hold both x and y co-ordinates of each tiles and then is pushed into allgridCoordinate array created below 	
var gridCoordinates = [];
//	this array is created to hold the arrays of x and y co-ordinates of all the tiles this is then used to map the position the tiles.
var allgridCoordinates = [];
//this variables are used to define the no of rows and columns on the boards
var rows = 0;
var columns = 0;
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

var correctAnswer = [1,1,1,1,2,2,
					 1,1,1,1,2,2,
					 ];

var gridAnswerRows = 2
var gridAnswerColumns = 6

var winningSound1
var winningSound2

var attemptCount = 0;
var reg = {};
var submit;
var activity2 = function (patternsRatio) {};
var inCorrectFeedbackTextAttempt1 = "Not quite right. \n Your pattern must: \n Fill the grid completely. \n Look like an enlarged version of the original pattern. \n Click TRYAGAIN to clear the grid and try again.";

var inCorrectFeedbackTextAttempt2 = "Not quite right. \n After scaling up the original pattern to fill the grid, it looks like this:";

/* rev2.0 Code */ 
//for dataPosting Object var data ={} is created;
var data = {};

var gameStartTime = new Date();

var gameEndTime ;
//this appData obj  is used to log the user inputs data to the game;
var appData ={
	gameOverallStartTime: gameStartTime.getFullYear() + "-" + gameStartTime.getMonth() + "-" + gameStartTime.getDate()+":"+gameStartTime.getHours()+":"+gameStartTime.getMinutes()+":"+gameStartTime.getSeconds(),
	activityNo: 2,
}
var activityLevel1 = {
	activityQuestionNo : 1,
	Level1StartTime: gameStartTime.getFullYear() + "-" + gameStartTime.getMonth() + "-" + gameStartTime.getDate()+":"+gameStartTime.getHours()+":"+gameStartTime.getMinutes()+":"+gameStartTime.getSeconds(),
}

var attempts = {};

/* rev2.0 Code ended */


//here we create a phaser function or object which holds all the game logic
activity2.prototype = {

	preload: function () {
		this.load.image('a2q1Background', 'assets/images/activity2/BACK_GROUND.png');
		this.load.image('question', 'assets/images/activity2/QUESTION.png');
		this.load.image('answerActivity2','assets/images/activity2/answeActivity2.png');
		this.load.text('translation', 'src/langData/translation.json');
	},

	create: function () {
		//		physic is initiated as need in game for making Phaser.Rect and getBounds types of function
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Loading of the dataRepoter class 
		data.Reporter = new gameReporter(patternsRatio);

		//		loading translation json file
		t = JSON.parse(this.game.cache.getText('translation'));

		//		adding background image
		var backGround = this.add.image(this.world.centerX, this.world.centerY, 'a2q1Background');
		backGround.anchor.setTo(0.5);
		
		this.soundButton = this.game.add.button(750,580, 'soundMute',this.toggleMute,this,'',1);

		tileaddingSound = this.game.add.audio('tileAdding');
		winningSound2 = this.game.add.audio('childrenScream');
		
		//		adding validation buttons like submit and reset
		submit = this.add.button(520, 600, 'buttons', this.onSubmit, this,'SUBMIT_OVER.png','SUBMIT_NORMAL.png','SUBMIT_DOWN.png');
		submit.anchor.setTo(0.5);

		var reset = this.add.button(685, 600, 'buttons', this.onReset, this, 'RESET_OVER_new.png','RESET_NORMAL_new.png','RESET_DOWN_new.png');
		reset.anchor.setTo(0.5);

		var Addcolumn = this.add.button(450, 540, 'buttons', this.incrementor_Columns, this, 'ADD_COLUMN_BUTTON_OVER.png', 'ADD_COLUMN_BUTTON_NORMAL.png', 'ADD_COLUMN_BUTTON_DOWN.png');
		

		var Addrow = this.add.button(450, 500, 'buttons', this.incrementor_Rows, this, 'ADD_ROW_BUTTON_OVER.png', 'ADD_ROW_BUTTON_NORMAL.png', 'ADD_ROW_BUTTON_DOWN.png');
		

		var Removerow = this.add.button(615, 500, 'buttons', this.decrementor_Rows, this, 'REMOVE_ROW_BUTTON_OVER.png', 'REMOVE_ROW_BUTTON_NORMAL.png', 'REMOVE_ROW_BUTTON_DOWN.png');
		

		var Removecolumn = this.add.button(615, 540, 'buttons', this.decrementor_Columns, this, 'REMOVE_COLUMN_OVER.png', 'REMOVE_COLUMN_NORMAL.png', 'REMOVE_COLUMN_DOWN.png');
		


		//		adding question image
		var question = this.add.image(125, 212, 'question');
		//		adding the question text
		var questionText = this.translate('questionText');
		/*rev 2.0 code */
		activityLevel1['QuestionText'] = questionText;
		/*rev 2.0 code ended*/
		var questionTextStyle = {
			font: "14px Arial",
			fill: "black",
			align: "left"
		};
		var questionTextOnDisplay = this.add.text(30, 61, questionText, questionTextStyle)
		questionTextOnDisplay.anchor.setTo(0);
		questionTextOnDisplay.lineSpacing = -5;
		
		this.soundButton = this.game.add.button(750,580, 'soundMute',this.toggleMute,this,'',1);

		//		adding the instructional text
		var instructionText = this.translate('instructionText')
		var instructionTextStyle = {
			font: "14px Arial",
			fill: "blue	",
			align: "left"
		};
		var instructionTextOnDisplay = this.add.text(30, 128, instructionText, instructionTextStyle)
		instructionTextOnDisplay.anchor.setTo(0);
		instructionTextOnDisplay.lineSpacing = -5;


		//		the below functions adds the tiles to the board
		if (rows == 0 && columns == 0) {
			console.log('hey i was called')
			rows = 1;
			columns = 1;
			this.placeTiles(rows, columns)
		}
		//		the below function addes the green tile with all the control logic
		this.greenTile();
		this.pinkTile();
		this.eventListener();
		reg.modal = new gameModal(patternsRatio);
		this.createModals();

		/* rev 2.0 */
		data.Reporter = new gameReporter(patternsRatio);
		/* rev 2.0 code ended*/

	},
	update: function () {
		this.submitDisable();
		this.highlight();
		if(selectedTile == 1){
			this.game.canvas.style.cursor = 'url(assets/images/greenpntbrsh.cur),auto';
		}
		else if(selectedTile == 2){
			this.game.canvas.style.cursor = 'url(assets/images/strawberrypntbrush.cur),auto';
		}
		else{
			this.game.canvas.style.cursor = 'default';
			
		}
	},


	//	This is function is used for debugging the point pixel position
	render: function () {
//		this.game.debug.text('x: ' + this.game.input.x + ' y: ' + this.game.input.y, 32, 32);
		//		this.game.debug.geom(gridtile[1], 'rgba(135,0,0,1)') ;
	},


	//	this function is used to make a grid on the board in the play area
	placeTiles: function (rows, columns) {
		var s = 0;
		var noOfRows = rows;
		var noOfColumns = columns;
		gridtile = [];
		gridtile1 =	 [];
		for (var i = 0; i < noOfRows; i++) {
			for (var j = 0; j < noOfColumns; j++) {
				gridtile1.push(this.game.add.image(gridTileStartPointX + j * gridTileRectWidth, gridTileStartPointY + i * gridTileRectWidth, 'tiles',4 ));
				gridtile.push(new Phaser.Rectangle(gridTileStartPointX + j * gridTileRectWidth, gridTileStartPointY + i * gridTileRectWidth, gridTileRectWidth, gridTileRectWidth));
				this.game.physics.arcade.enable(gridtile[s]);
				studentInputArray.push(0);
				gridCoordinates.push(gridtile[s].x, gridtile[s].y);
				allgridCoordinates.push(gridCoordinates);
				gridCoordinates = [];
				s++;
			}
		}
	},


	//	this function is used as a eventlistner which listens the mouse keyboard clicks
	eventListener: function () {
		this.input.mouse.capture = true;
		//		this.input.onDown.add(this.test,this);
		var move = this.input.addMoveCallback(this.addTileGrid, this);
		//		this.input.onUp.add(this.selectedreset,this);
		//		var move = this.input.addMoveCallback(this.addTileGrid,this);
		//		console.log(move.x,move.y)	
	},

	//	here we declare eventlistners for all clicks
	greenTile: function () {
		var greentile = this.add.sprite(550, 439, 'tiles',2);
		greentile.enableSnap = (gridTileRectWidth, gridTileRectWidth, false, true);
		greentile.value = 1;
		greentile.inputEnabled = true;
		this.game.input.mouse.capture = true;
		greentile.events.onInputDown.add(function () {
			selectedTile = greentile.value;
			this.highlight(), beep.play()
		}, this)

	},

	pinkTile: function () {
		var pinktile = this.add.sprite(600, 439, 'tiles',3);
		pinktile.inputEnabled = true;
		//		pinktile.enableSnap = (gridTileRectWidth,gridTileRectWidth,true,true);
		pinktile.value = 2;
		pinktile.events.onInputDown.add(function () {
			selectedTile = pinktile.value;
			this.highlight(), beep.play()
		}, this)
	},
	
	submitDisable:function(){
		function submitDisableCheck(element,index,array){
			return element == 0;
		}
		var test = studentInputArray.every(submitDisableCheck);
		if(test == true){
			submit.tint = 0x666677;
			submit.inputEnabled = false;
		}
		else{
			submit.tint = 0xffffff;
			submit.inputEnabled = true;
		};
	},

	highlight: function () {
		if (selectedTile == 1 && highlighted1[0] == false) {
			highlighted[0] = this.add.image(550, 439, 'tiles',1);
			highlighted[0].anchor.setTo(0.23)
			highlighted1[0] = true;
			if (highlighted1[1] == true) {
				highlighted[1].destroy();
				highlighted1[1] = false;
			}
		} else if (selectedTile == 2 && highlighted1[1] == false) {
			highlighted[1] = this.add.image(600, 439, 'tiles',1);
			highlighted[1].anchor.setTo(0.23)
			highlighted1[1] = true;
			if (highlighted1[0] == true) {
				highlighted[0].destroy();
				highlighted1[0] = false;
			}
		}
		
		if (highlighted.length != 0 && highlighted1[0]==false && highlighted1[1] == false){
//			console.log("testing update inside last condtion")
			for (var highlightedArray = 0; highlightedArray < highlighted.length; highlightedArray ++){
				if(highlighted[highlightedArray] != undefined){
					console.log("testing update inside for last condtion")
				highlighted[highlightedArray].destroy();
				};
			}
		}
	},

	//	This function is used to check if the array are identical or not
	arraysIdentical: function (arr1, arr2) {
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
		for (var i = 0, len = arr.length; i < len; ++i) {
			if (i in arr && comparer(arr[i], val)) {
				return i;
			}
		}
		return -1;
	},

	addTileGrid: function (pointer) {
		if (pointer.x < gridTileStartPointX || pointer.x > gridTileStartPointX + gridTileRectWidth * columns || pointer.y < gridTileStartPointY || pointer.y > gridTileStartPointY + gridTileRectWidth * rows) {} else {
			if (pointer.leftButton.isDown) {
				if (selectedTile == 1) {
					for (i in gridtile) {
						var rectcoordinates = Phaser.Rectangle.contains(gridtile[i], pointer.x, pointer.y);
						var tileposition = this.indexOf(allgridCoordinates, [gridtile[i].x, gridtile[i].y], this.arraysIdentical)
						console.log(tileposition)
						if (rectcoordinates == true && selectedTile == 1) {
							if (pointer.leftButton.isDown == true) {
								console.log(tileposition)
								if(studentInputArray[tileposition] != 1){
								tileaddingSound.play('', 0, 10);
								studentInputArray[tileposition] = 1;	
								tileadded.push(this.add.sprite(gridtile[i].x, gridtile[i].y, 'tiles',2));
								}
							else {
								console.log('notAdded')
							}	
							}
						}
					}
				} else if (selectedTile == 2) {
					for (i in gridtile) {
						var rectcoordinates = Phaser.Rectangle.contains(gridtile[i], pointer.x, pointer.y);
						var tileposition = this.indexOf(allgridCoordinates, [gridtile[i].x, gridtile[i].y], this.arraysIdentical)
						if (rectcoordinates == true && selectedTile == 2) {
							if (pointer.leftButton.isDown == true) {
								console.log(tileposition)
								if(studentInputArray[tileposition] != 2){
								tileaddingSound.play('', 0, 10);
								studentInputArray[tileposition] = 2
								tileadded.push(this.add.sprite(gridtile[i].x, gridtile[i].y, 'tiles',3));
								}
							else {
								console.log('notadded')
							}
							}
						}
					}
				}
			}
		}
	},

	toggleMute: function () {
		console.log(!thememusic.mute)
		if (!thememusic.mute) {
			thememusic.mute = true;
			this.soundButton.destroy();
			this.soundButton = this.game.add.button(750,580, 'soundMute', this.toggleMute,this,'',2);
		} else {
			thememusic.mute = false;
			this.soundButton.destroy();
			this.soundButton = this.game.add.button(750,580, 'soundMute', this.toggleMute,this,'',1);
		}
	},
	
	/********************************Modal Type *****************************************************************************/
	createModals: function(){
		
	/*************************************Validation 2 for tiles placeing *************************************************/
	/**************************************feedback correct Answer **************************************************/
	reg.modal.createModal({
            type:"correctAnswer",
            includeBackground: true,
			backgroundOpacity:0.6,
//            modalCloseOnInput: true,
            itemsArr: [	
				{
                    type: "image",
                    content: "feedback2",
                    offsetY: -50,
                    contentScale: 1,
                },
//				 {
//                    type: "button",
//					atlasParent:'popupsItems',
//					content: "close_button_normal.png",
//					buttonHover:"close_button_mouse_over.png",
//                    offsetY: -170,
//					offsetX: 195,
//					contentScale: 1,
//					callback: function(){
//						winningSound2.stop();
//                      reg.modal.hideModal("correctAnswer");
//						
//                    } 
//                },
				
				{
                    type: "sprite",
					atlasParent:"popupsItems",
					content: "SMILEY_HAPPY.png",
                    offsetY: -130,
					offsetX: -180,
                    contentScale: 1
                },
				
				  {
                    type: "text",
                    content: this.translate('correctAnswerModalText1'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-130,
                    offsetX:-120
                },
				
				  {
                    type: "text",
                    content: this.translate('correctAnswerModalText2'),
                    fontFamily: "Arial",
                    fontSize:14,
					align: "left",
                    color: "black",
                    offsetY:-80,
                    offsetX:-15
                },
					{
                    type: "text",
                    content:this.translate('correctAnswerModalText3'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "0xFF0000",
                    offsetY:-10,
                    offsetX:-20
                },
				
//				  {
//                    type: "text",
//                    content: "Click NEXT to continue",
//                    fontFamily: "Arial",
//                    fontSize:12,
//                    color: "0xFF0000",
//					align: "left",
//                    offsetY:-40,
//                    offsetX:-90
//                },
				
//				{
//                    type: "image",
//                    content:"nextNormal",
//					buttonHover:"",
//					buttonActive:"",
//                    offsetY: -10,
//                    offsetX: -10,
//                    contentScale: 1,
//                    callback: function () {
//					selectedTile = 0;
//					rows = 0
//					gridtile1 = [];
//					columns = 0;
//					studentInputArray = []	
//					patternsRatio.state.start('activity2q1')
//                 }
//				}
				]
			}),
	/****************************************feedback 1 incorrect ***********************************************/ 		
				
		reg.modal.createModal({
            type:"IncorrectAnswerAttempt1",
            includeBackground: true,
			backgroundOpacity:0.6,
//            modalCloseOnInput: true,
            itemsArr: [
              {
                    type: "image",
                    content: "feedback2",
                    offsetY: -50,
                    contentScale: 1
                },
				 {
                    type: "button",
					atlasParent:'popupsItems',
					content: "close_button_normal.png",
					buttonHover:"close_button_mouse_over.png",
                    offsetY: -170,
					offsetX: 195,
					contentScale: 1,
					callback: function(){
                      reg.modal.hideModal("IncorrectAnswerAttempt1");
                    } 
                },
				{
                    type: "sprite",
					atlasParent:"popupsItems",
					content: "SMILEY_SAD.png",
                    offsetY: -130,
					offsetX: -180,
                    contentScale: 1
                },
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModal<2attemptsText1'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-130,
                    offsetX:-110
                },
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModal<2attemptsText2'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-80,
                    offsetX:-40
                },		
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModal<2attemptsText3'),
                    fontFamily: "Arial",
                    fontSize:12,
                    color: "0xFF0000",
                    offsetY:-35,
                    offsetX:-50
                },
				
				
				{
                   	type: "button",
					atlasParent: "popupButtons",
					content: "TRY_AGAIN_BUTTON_NORMAL.png",
					buttonHover: "TRY_AGAIN_BUTTON_MOUSE_OVER.png",
					buttonActive: "TRY_AGAIN_BUTTON_MOUSE_DOWN.png",
                    offsetY: -0,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
                  		selectedTile = 0;
						highlighted1 = [false,false]
						highlighted1 = []
						rows = 0
						gridtile1 = [];
						columns = 0;
						studentInputArray = []
						patternsRatio.state.start('activity2')      
                 }
				}
		
			]
        });
/********************************* feedback 2  showing answer ****************************************/

		reg.modal.createModal({
            type:"IncorrectAnswerAttempt2",
            includeBackground: true,
			backgroundColor:0xffffff,
			backgroundOpacity:0.8,
//            modalCloseOnInput: false,
            itemsArr: [
              {
                    type: "image",
                    content: "feedback3",
                    offsetY: 0,
                    contentScale: 1
                },
				{
                    type: "image",
                    content: "answerActivity2",
                    offsetY: 0,
                    offsetX: -15,
                    contentScale: 1
                },	
//				{
//                    type: "button",
//					atlasParent:'popupsItems',
//					content: "close_button_normal.png",
//					buttonHover:"close_button_mouse_over.png",
//                    offsetY: -290,
//					offsetX: 200,
//					contentScale: 1,
//					callback: function(){
//                      reg.modal.hideModal("IncorrectAnswerAttempt2");
//                    } 
//                },
				{
                    type: "sprite",
					atlasParent:"popupsItems",
					content: "SMILEY_SAD.png",
                    offsetY: -260,
                    offsetX: -180,
                    contentScale: 1
                },
				  {
                    type: "text",
                    content:this.translate('incorrectAnswerModal>2attemptsText1') ,
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-260,
                    offsetX:-100
                },
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModal>2attemptsText2'),
                    fontFamily: "Arial",
                    fontSize:14,
					align:"left",
                    color: "black",
                    offsetY:-215,
                    offsetX:-40
                },
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModal>2attemptsText3'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "0xFF0000",
                    offsetY:100,
                    offsetX:-20
                },
//				{
//                    type: "button",
//					atlasParent: "popupButtons",
//					content: "NEXT_BUTTON_NORMAL.png",
//					buttonHover: "NEXT_BUTTON_MOUSE_OVER.png",
//					buttonActive: "NEXT_BUTTON_MOUSE_DOWN.png",
//                    offsetY: 230,
//                    offsetX: -10,
//                    contentScale: 1,
//                    callback: function () {
//						selectedTile = 0;
//						highlighted1 = [false,false]
//						rows = 0
//						gridtile1 = [];
//						columns = 0;
//						studentInputArray = []
//						attemptCount = 0
//                        patternsRatio.state.start("activity2")
//                 }
//				}
		
			]
        });
	
	
	
	/***************************************** Validation 1 Modals for girdsize testing ****************************************/
	
	/*************feedback1 for incorrect answer *****************************/
	
	reg.modal.createModal({
            type:"IncorrectGridAnswerAttempt1",
            includeBackground: true,
			backgroundOpacity:0.6,
//            modalCloseOnInput: true,
            itemsArr: [
              {
                    type: "image",
                    content: "feedback2",
                    offsetY: -50,
                    contentScale: 1
                },
				 {
                    type: "button",
					atlasParent:'popupsItems',
					content: "close_button_normal.png",
					buttonHover:"close_button_mouse_over.png",	
                    offsetY: -170,
					offsetX: 195,
					contentScale: 1,
					callback: function(){
                      reg.modal.hideModal("IncorrectAnswerAttempt1");
                    } 
                },
				{
                   type: "sprite",
					atlasParent:"popupsItems",
					content: "SMILEY_SAD.png",
                    offsetY: -130,
					offsetX: -180,
                    contentScale: 1
                },
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModalGrid1attemptsText1'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-130,
                    offsetX:-110
                },
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModalGrid1attemptsText2'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-100,
                    offsetX:-40,
                },
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModalGrid1attemptsText3'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-70,
                    offsetX:-21
                },
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModalGrid1attemptsText4'),
                    fontFamily: "Arial",
                    fontSize:12,
                    color: "0xFF0000",
                    offsetY:-35,
                    offsetX:-50
                },
				{
                    type: "button",
					atlasParent: "buttons",
					content: "RESET_NORMAL_new.png",
					buttonHover: "RESET_OVER_new.png",
					buttonActive: "RESET_DOWN_new.png",
                    offsetY: -0,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
                  		selectedTile = 0;
						highlighted1 = [false,false]
						highlighted = []
						rows = 0
						gridtile1 = [];
						columns = 0;
						studentInputArray = []
						patternsRatio.state.start('activity2')      
                 }
				}
		
			]
        });
	
	},

	showModalIncorrectGridAnswerAttempt1: function(){
		selectedTile = 0;
		reg.modal.showModal("IncorrectGridAnswerAttempt1");
	},
	showModalCorrectAttempt: function(){
		selectedTile = 0;
		reg.modal.showModal("correctAnswer");
		winningSound2.play();
		/* rev 2.0 code */
		this.dataPost();
		/* rev 2.0 code ended */
	},
	
	showModal_InCorrectAttempt_Lessthan_2: function(){
		selectedTile = 0;
		reg.modal.showModal("IncorrectAnswerAttempt1");
	},
	
	showModal_InCorrectAttempt_Morethan_2: function(){
		selectedTile = 0;
		reg.modal.showModal("IncorrectAnswerAttempt2");
		/* rev 2.0 code */
		this.dataPost();
		/* rev 2.0 code ended */
	},
	
	
	/* Translation */
	/* rev 2.0 code   */	
	// _t function is checking the language and loading question text

	translate: function (getContent){
		if(data.Reporter.getCookie("language_code") == "hi"){
			translatedText = t.activityLevel1Q1.hi[getContent];
			
		}
		else if (data.Reporter.getCookie("language_code") == "te"){
			translatedText = t.activityLevel1Q1.te[getContent];			
		}
		else{
			translatedText = t.activityLevel1Q1.en[getContent];
		}; 

		return translatedText;
		},
	
	/* rev 2.0 code ended  */
	/* Translation Ended */
	
	/*************************************** Add and removing rows and columns ****************************************************/
	cleanColoredTile: function(){
		if(tileadded.length != 0){
			for (var mn = 0;mn < tileadded.length;mn++){
				console.log(tileadded[mn]);
				tileadded[mn].destroy();
			}
		tileadded = [];
		}
		else {
			console.log('popat')
		}
	},
	/********* incrementor functions *************************************************/

	incrementor_Columns: function () {
		this.cleanColoredTile();
		if (columns < 9) {
			var xyz = Number(gridtile1.length);
			for (var tile = 0; tile < xyz; tile++) {
				gridtile1[tile].destroy();
			}
			columns++
			selectedTile = 0;
			studentInputArray = []
			highlighted1=[false,false];
			allgridCoordinates = [];
			this.placeTiles(rows, columns);
			console.log(columns)
		}
	},

	incrementor_Rows: function () {
		this.cleanColoredTile();
		if (rows < 9) {
			var xyz = Number(gridtile1.length);
			for (var tile = 0; tile < xyz; tile++) {
				gridtile1[tile].destroy();
			}
			gridtile1 = [];
			rows++
			selectedTile = 0;
			highlighted1=[false,false];
			studentInputArray = [];
			allgridCoordinates = [];
			this.placeTiles(rows, columns);
		}
	},

	decrementor_Rows: function () {
		this.cleanColoredTile();
		var xyz = Number(gridtile1.length);
		if (rows > 1) {
			for (var tile = 0; tile < xyz; tile++) {
				console.log(tile)
				gridtile1[tile].destroy();
			}
			gridtile1 = [];
			rows--;
			highlighted1=[false,false];
			studentInputArray = [];
			selectedTile = 0;
			this.placeTiles(rows, columns);
		}
	},

	decrementor_Columns: function () {
		this.cleanColoredTile();
		var xyz1 = Number(gridtile1.length);
		if (columns > 1) {
			for (var tile = 0; tile < xyz1; tile++) {
				gridtile1[tile].destroy();
			}
			columns--;
			gridtile1 = [];
			selectedTile = 0;
			highlighted1=[false,false]
			studentInputArray = [];
			selectedTile = 0;
			this.placeTiles(rows, columns);
		}
	},
	/**************************************************VALIDATION CODE*************************************************************/
	onSubmit: function () {
		// console.log("entered in onsubmit")
		if (rows == 2 && columns == 6){
			if (this.arraysIdentical(studentInputArray, correctAnswer) == true) {
				attemptCount++;
				this.showModalCorrectAttempt();
				console.log("tested == true correct in 1st attempt");
				/*rev 2.0 code*/
				var attempt = {};
				attempt['attemptNo'] = attemptCount;
				attempt['correctAnswer'] = this.arraysIdentical(studentInputArray, correctAnswer);
				attempt['No Of Rows'] = rows;
				attempt['No Of Colums'] = columns;
				attempt["answerPatternCorrect"] = this.arraysIdentical(studentInputArray, correctAnswer);
				attempt["answerGridCorrect"] = (rows == 2 && columns == 6);
				attempt['studentInputPattern']= this.listToMatrix(studentInputArray,columns);
				attempts['attempt'+attemptCount]=attempt;
				console.log(attempts);
				/*rev 2.0 code ended*/
			}
			else if (this.arraysIdentical(studentInputArray, correctAnswer) == false && attemptCount < 2) {
				attemptCount++;
				this.showModal_InCorrectAttempt_Lessthan_2();
				console.log("tested == true incorrect attempt" + attemptCount)
				/*rev 2.0 code*/
				var attempt = {};
				attempt['attemptNo'] = attemptCount;
				attempt['correctAnswer'] = this.arraysIdentical(studentInputArray, correctAnswer);
				attempt['No Of Rows'] = rows;
				attempt['No Of Colums'] = columns;
				attempt["answerPatternCorrect"] = this.arraysIdentical(studentInputArray, correctAnswer);
				attempt["answerGridCorrect"] = (rows == 2 && columns == 6);
				attempt['studentInputPattern']= this.listToMatrix(studentInputArray,columns);
				attempts['attempt'+attemptCount]=attempt;
				console.log(attempts);
				/*rev 2.0 code ended*/
			}
			else {
				attemptCount ++
				this.showModal_InCorrectAttempt_Morethan_2();
				/*rev 2.0 code*/
				var attempt = {};
				attempt['attemptNo'] = attemptCount;
				attempt['correctAnswer'] = this.arraysIdentical(studentInputArray, correctAnswer);
				attempt['No Of Rows'] = rows;
				attempt['No Of Colums'] = columns;
				attempt["answerPatternCorrect"] = this.arraysIdentical(studentInputArray, correctAnswer);
				attempt["answerGridCorrect"] = (rows == 2 && columns == 6);
				attempt['studentInputPattern']= this.listToMatrix(studentInputArray,columns);
				attempts['attempt'+attemptCount]=attempt;
				console.log(attempts);
				/*rev 2.0 code ended*/
			}
		}
		else if (rows != 2 || columns != 6){
			if(attemptCount < 2){
			this.showModalIncorrectGridAnswerAttempt1();
			attemptCount ++
			console.log("tested == true grid wrong" + attemptCount)
			/*rev 2.0 code*/
			var attempt = {};
			attempt['attemptNo'] = attemptCount;
			attempt['correctAnswer'] = this.arraysIdentical(studentInputArray, correctAnswer);
			attempt['No Of Rows'] = rows;
			attempt['No Of Colums'] = columns;
			attempt["answerPatternCorrect"] = this.arraysIdentical(studentInputArray, correctAnswer);
			attempt["answerGridCorrect"] = (rows == 2 && columns == 6);
			attempt['studentInputPattern']= this.listToMatrix(studentInputArray,columns);
			attempts['attempt'+attemptCount]=attempt;
			console.log(attempts);
			/*rev 2.0 code ended*/
			}
			else {
				attemptCount ++
				this.showModal_InCorrectAttempt_Morethan_2();
				/*rev 2.0 code*/
				var attempt = {};
				attempt['attemptNo'] = attemptCount;
				attempt['correctAnswer'] = this.arraysIdentical(studentInputArray, correctAnswer);
				attempt['No Of Rows'] = rows;
				attempt['No Of Colums'] = columns;
				attempt["answerPatternCorrect"] = this.arraysIdentical(studentInputArray, correctAnswer);
				attempt["answerGridCorrect"] = (rows == 2 && columns == 6);
				attempt['studentInputPattern']= this.listToMatrix(studentInputArray,columns);
				attempts['attempt'+attemptCount]=attempt;
				console.log(attempts);
				/*rev 2.0 code ended*/;
			}
		}
		
		else if (this.arraysIdentical(studentInputArray, correctAnswer) == false && attemptCount >= 2) {
			attemptCount ++
			this.showModal_InCorrectAttempt_Morethan_2();
			console.log("tested == true more than 2" + attemptCount)
			/*rev 2.0 code*/
			var attempt = {};
			attempt['attemptNo'] = attemptCount;
			attempt['correctAnswer'] = this.arraysIdentical(studentInputArray, correctAnswer);
			attempt['No Of Rows'] = rows;
			attempt['No Of Colums'] = columns;
			attempt["answerPatternCorrect"] = this.arraysIdentical(studentInputArray, correctAnswer);
			attempt["answerGridCorrect"] = (rows == 2 && columns == 6);
			attempt['studentInputPattern']= this.listToMatrix(studentInputArray,columns);
			attempts['attempt'+attemptCount]=attempt;
			console.log(attempts);
			/*rev 2.0 code ended*/
		}	
	},
	onReset: function () {
			selectedTile = 0;
			highlighted = []
			rows = 0
			gridtile1 = [];
			columns = 0;
			studentInputArray = []
			highlighted1 = [false,false]
			this.state.start('activity2')
		},
	/* rev 2.0 code */	
	dataPost: function(){
		gameEndTime = new Date();
		activityLevel1['Level1EndTime']=gameEndTime.getFullYear() + "-" + gameEndTime.getMonth() + "-" + gameEndTime.getDate()+":"+gameEndTime.getHours()+":"+gameEndTime.getMinutes()+":"+gameEndTime.getSeconds();
		activityLevel1['attempts']=attempts;
		appData['Activity2Q1'] = activityLevel1;
		appData['eventType'] = 'Stage End';
		appData['gameOverallEndTime'] =gameEndTime.getFullYear() + "-" + gameEndTime.getMonth() + "-" + gameEndTime.getDate()+":"+gameEndTime.getHours()+":"+gameEndTime.getMinutes()+":"+gameEndTime.getSeconds();
		data.Reporter.submitData('url',appData);
	},
	listToMatrix: function (list, elementsPerSubArray) {
		var matrix = [], i, k;
	
		for (i = 0, k = -1; i < list.length; i++) {
			if (i % elementsPerSubArray === 0) {
				k++;
				matrix[k] = [];
			}
	
			matrix[k].push(list[i]);
		}
	
		return matrix;
	}
	/* rev 2.0 code ended */

	};
