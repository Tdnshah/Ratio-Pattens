//this variables are used in placeTile function
//	this variables are used for defining the starting co-ordinateds of the grid formation  
var gridTileStartPointX = 415;
var gridTileStartPointY = 48;
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
var muteButton;

//this variable is used to hold the value of tiles selected to identify which tile is selected and will placed in the play grids
var selectedTile = 0;

//this variable is used for defining the sound used while tile is added in the grid
var tileaddingSound;

//this arrays are used by the highlighted function to highlight the selected tiles
//The highlighted1 array is used to check if the highlighted or not its default value id false
var highlighted1 = [false, false];
//	this highlighted array holds the glowTile image status
var highlighted = [];
var selectedTileText = [];
// this is a array used to define the correct answer of the pattern and this is used to validate against studentInputArray

var correctAnswer = [1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 2, 2, 2, 1, 1, 1,
					 1, 1, 1, 2, 2, 2, 1, 1, 1,
					 1, 1, 1, 2, 2, 2, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 ];

var attemptCount = 0;
var reg = {};
var activity1 = function (patternsRatio) {};
var inCorrectFeedbackTextAttempt2 = "Not quite right. \n After scaling up the original pattern to fill the grid, it looks like this:";
var winningSoundClaps;
var winningSoundScream;
var submit;

//here we create a phaser function or object which holds all the game logic
activity1.prototype = {
	preload: function () {
		this.load.image('a1q1Background', 'assets/images/activity1/BACK_GROUND.png');
		this.load.image('question', 'assets/images/activity1/QUESTION.png');
		this.load.image('answerActivity1', 'assets/images/activity1/answerActivity1.png');
	},

	create: function () {
		//		physic is initiated as need in game for making Phaser.Rect and getBounds types of function
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//		adding background image
		var backGround = this.add.image(this.world.centerX, this.world.centerY, 'a1q1Background');
		backGround.anchor.setTo(0.5);

		this.soundButton = this.game.add.button(750,520, 'soundMute',this.toggleMute,this,'',1);

		tileaddingSound = this.game.add.audio('tileAdding');

		//		adding validation buttons like submit and reset
		submit = this.add.button(520, 530, 'buttons', this.onSubmit, this,'SUBMIT_OVER.png','SUBMIT_NORMAL.png','SUBMIT_DOWN.png' );
		submit.anchor.setTo(0.5);
		this.submitDisable();
	
		var reset = this.add.button(675, 530, 'buttons', this.onReset, this, 'RESET_OVER_new.png','RESET_NORMAL_new.png','RESET_DOWN_new.png');
		reset.anchor.setTo(0.5);
		//		adding question image
		var question = this.add.image(125, 212, 'question');

		//		adding the question text
		var questionText = "Scale up the given pattern so that it completely fills \nthe grid.The scaled up pattern must look exactly like \nthe original pattern but bigger."
		var questionTextStyle = {
			font: "14px Arial",
			fill: "black",
			align: "left"
		};
		var questionTextOnDisplay = this.add.text(30, 61, questionText, questionTextStyle)
		questionTextOnDisplay.anchor.setTo(0);
		questionTextOnDisplay.lineSpacing = -5;

		//		adding the instructional text
		var instructionText = "Drag the green and red tiles over the grid to colour it.\nClick Submit to check your answer."
		var instructionTextStyle = {
			font: "14px Arial",
			fill: "blue	",
			align: "left"
		};
		var instructionTextOnDisplay = this.add.text(30, 128, instructionText, instructionTextStyle)
		instructionTextOnDisplay.anchor.setTo(0);
		instructionTextOnDisplay.lineSpacing = -5;
		
		winningSoundClaps = this.add.audio('claps');
		winningSoundScream = this.add.audio('childrenScream');

		//		the below functions adds the tiles to the board
		this.placeTiles(rows, columns)

		//		the below function addes the green tile with all the control logic
		this.greenTile();
		this.pinkTile();
		this.eventListener();

		reg.modal = new gameModal(patternsRatio);
		this.createModals();

	},
	update: function () {
		this.highlight();

	},
	//	This is function is used for debugging the point pixel position
	render: function () {
//		this.game.debug.text('x: ' + this.game.input.x + ' y: ' + this.game.input.y, 32, 32);
	//	this.game.debug.geom(gridtile[3], 'rgba(135,0,0,1)');
	},

	//	this function is used to make a grid on the board in the play area
	placeTiles: function (rows, columns) {
		var s = 0;
		var noOfRows = rows;
		var noOfColumns = columns;
		for (var i = 0; i < noOfRows; i++) {
			for (var j = 0; j < noOfColumns; j++) {
				gridtile[s] = this.game.add.sprite(gridTileStartPointX + j * gridTileRectWidth, gridTileStartPointY + i * gridTileRectWidth, 'tiles',4);
				gridtile[s] = new Phaser.Rectangle(gridTileStartPointX + j * gridTileRectWidth, gridTileStartPointY + i * gridTileRectWidth, gridTileRectWidth, gridTileRectWidth);
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
		var greentile = this.add.sprite(550, 445, 'tiles' , 2);
		greentile.enableSnap = (gridTileRectWidth, gridTileRectWidth, false, true);
		greentile.value = 1;
		greentile.inputEnabled = true;
		this.game.input.mouse.capture = true;
		greentile.events.onInputDown.add(function () {
			selectedTile = greentile.value;
			console.log(selectedTile);
			this.highlight(), beep.play()
		}, this)

	},

	pinkTile: function () {
		var pinktile = this.add.sprite(600, 445, 'tiles', 3);
		pinktile.inputEnabled = true;
		//		pinktile.enableSnap = (gridTileRectWidth,gridTileRectWidth,true,true);
		pinktile.value = 2;
		pinktile.events.onInputDown.add(function () {
			selectedTile = pinktile.value;
			console.log(selectedTile);
			this.highlight(), beep.play()
		}, this)
	},


	highlight: function () {
		if (selectedTile == 1 && highlighted1[0] == false) {
			highlighted[0] = this.add.image(550, 445, 'tiles', 1);
			highlighted[0].anchor.setTo(0.23) 
			highlighted1[0] = true;
			var style = { font: "20px Arial", fill: "#ffffff", align: "center" };
			if (highlighted1[1] == true) {
				highlighted[1].destroy();
				highlighted1[1] = false;
//				selectedTileText[1].destroy();
				};
			}
		else if (selectedTile == 2 && highlighted1[1] == false) {
			highlighted[1] = this.add.image(600, 445, 'tiles', 1);
			highlighted[1].anchor.setTo(0.23)
			highlighted1[1] = true;
			if (highlighted1[0] == true) {
				highlighted[0].destroy();
				highlighted1[0] = false;
//				selectedTileText[0].destroy();
			};
		};
		
		if (highlighted != 0 && highlighted1[0]==false && highlighted1[1] == false){
			for (var highlightedArray = 0; highlightedArray < highlighted.length; highlightedArray ++){
				if(highlighted[highlightedArray] != undefined){
				highlighted[highlightedArray].destroy();
				};
			};
		};
		
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
		if (pointer.x < gridTileStartPointX || pointer.x > gridTileStartPointX + gridTileRectWidth * rows || pointer.y < gridTileStartPointY || pointer.y > gridTileStartPointY + gridTileRectWidth * columns) {} else {
			if (pointer.leftButton.isDown) {
				if (selectedTile == 1) {
					for (i in gridtile) {
						var rectcoordinates = Phaser.Rectangle.contains(gridtile[i], pointer.x, pointer.y);
						var tileposition = this.indexOf(allgridCoordinates, [gridtile[i].x, gridtile[i].y], this.arraysIdentical)
						if (rectcoordinates == true && selectedTile == 1) {
							if (pointer.leftButton.isDown == true) {
								if(studentInputArray[tileposition] != 1){
									tileaddingSound.play('', 0, 10);
									studentInputArray[tileposition] = 1
									var tileadded = this.add.sprite(gridtile[i].x, gridtile[i].y, 'tiles',2)
									this.submitDisable();
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
								if(studentInputArray[tileposition] != 2){
									tileaddingSound.play('', 0, 10);
									studentInputArray[tileposition] = 2
									var tileadded = this.add.sprite(gridtile[i].x, gridtile[i].y, 'tiles',3)
									this.submitDisable();
								}	
							}
						}
					}
				}
			}
		}
	},
	
	
	submitDisable:function(){
		function submitDisableCheck(element,index,array){
			return element == 0;
		}
		var test = studentInputArray.every(submitDisableCheck);
		console.log(test);
		if(test == true){
			submit.tint = 0x666677;
			submit.inputEnabled = false;
		}
		else{
			submit.tint = 0xffffff;
			submit.inputEnabled = true;
		};
	},

	toggleMute: function () {
		console.log(!thememusic.mute)
		if (!thememusic.mute) {
			thememusic.mute = true;
			this.soundButton.destroy();
			this.soundButton = this.game.add.button(750,520, 'soundMute', this.toggleMute,this,'',2);
		} else {
			thememusic.mute = false;
			this.soundButton.destroy();
			this.soundButton = this.game.add.button(750,520, 'soundMute', this.toggleMute,this,'',1);
		}
	},

	/********************************Modal Type *****************************************************************************/

	createModals: function () {

		/**************************************** feedback correct *****************************************************/

		reg.modal.createModal({
				type: "correctAnswer",
				includeBackground: true,
				backgroundOpacity: 0.6,
			//            modalCloseOnInput: true,
				itemsArr: [
					{
						type: "image",
						content: "feedback2",
						offsetY: -50,
						contentScale: 1,
                },
					{
						type: "button",
						atlasParent:"popupsItems",
						content: "close_button_normal.png",
						buttonHover:"close_button_mouse_over.png",
						offsetY: -170,
						offsetX: 195,
						contentScale: 1,
						callback: function () {
							reg.modal.hideModal("correctAnswer");
						}
                },

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
						content: "Well done!",
						fontFamily: "Arial",
						fontSize: 14,
						color: "black",
						offsetY: -130,
						offsetX: -120
                },

					{
						type: "text",
						content: "You have scaled up the pattern correctly and\n solved the puzzle!",
						fontFamily: "Arial",
						fontSize: 14,
						align: "left",
						color: "black",
						offsetY: -80,
						offsetX: -15
                },

					{
						type: "text",
						content: "Click NEXT to continue.",
						fontFamily: "Arial",
						fontSize: 12,
						color: "0xFF0000",
						align: "left",
						offsetY: -40,
						offsetX: -90
                },

					{
						type: "button",
						atlasParent: "popupButtons",
						content: "NEXT_BUTTON_NORMAL.png",
						buttonHover: "NEXT_BUTTON_MOUSE_OVER.png",
						buttonActive: "NEXT_BUTTON_MOUSE_DOWN.png",
						offsetY: -10,
						offsetX: -10,
						contentScale: 1,
						callback: function () {
							selectedTile = 0;
							allgridCoordinates = [];
							studentInputArray = [];
							highlighted1 = [false,false];
							winningSoundScream.stop();
							patternsRatio.state.start('activity1q1')
						}
				}
				]
			}),
			/****************************************feedback 1 incorrect ***********************************************/

			reg.modal.createModal({
				type: "IncorrectAnswerAttempt1",
				includeBackground: true,
				backgroundOpacity: 0.6,
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
						atlasParent:"popupsItems",
						content: "close_button_normal.png",
						buttonHover:"close_button_mouse_over.png",
						offsetY: -170,
						offsetX: 195,
						contentScale: 1,
						callback: function () {
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
						content: "Not quite right.",
						fontFamily: "Arial",
						fontSize: 14,
						color: "black",
						offsetY: -130,
						offsetX: -110
                },
					{
						type: "text",
						content: "Your pattern must:",
						fontFamily: "Arial",
						fontSize: 14,
						color: "black",
						offsetY: -100,
						offsetX: -110
                },
					{
						type: "text",
						content: "1. Fill the grid completely.",
						fontFamily: "Arial",
						fontSize: 14,
						color: "black",
						offsetY: -80,
						offsetX: -90
                },
					{
						type: "text",
						content: "2. Look like an enlarged version of the original pattern.",
						fontFamily: "Arial",
						fontSize: 14,
						color: "black",
						offsetY: -60,
						offsetX: -0
                },

					{
						type: "text",
						content: "Click RESET to clear the grid and try again",
						fontFamily: "Arial",
						fontSize: 12,
						color: "0xFF0000",
						offsetY: -35,
						offsetX: -50
                },


					{
						type: "button",
						atlasParent:"buttons",
						content: "RESET_NORMAL_new.png",
						buttonHover: "RESET_OVER_new.png",
						buttonActive: "RESET_DOWN_new.png",
						offsetY: -0,
						offsetX: -10,
						contentScale: 1,
						callback: function () {
							selectedTile = 0;
							allgridCoordinates = [];
							studentInputArray = [];
							highlighted1 = [false,false];
							patternsRatio.state.start('activity1')
						}
				}

			]
			});
		/********************************* feedback 2  showing answer ****************************************/

		reg.modal.createModal({
			type: "IncorrectAnswerAttempt2",
			includeBackground: true,
			backgroundColor: 0xffffff,
			backgroundOpacity: 0.8,
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
					content: "answerActivity1",
					offsetY: 5,
					offsetX: -15,
					contentScale: 1
                },

				{
					type: "button",
					atlasParent:"popupsItems",
					content: "close_button_normal.png",
					buttonHover:"close_button_mouse_over.png",
					offsetY: -295,
					offsetX: 205,
					contentScale: 1,
					callback: function () {
						reg.modal.hideModal("IncorrectAnswerAttempt2");
						
					}
                },
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
					content: "Not quite right.",
					fontFamily: "Arial",
					fontSize: 14,
					color: "black",
					offsetY: -260,
					offsetX: -100
                },
				{
					type: "text",
					content: "After scaling up the original pattern to fill the grid, \n it looks like this:",
					fontFamily: "Arial",
					fontSize: 14,
					align: "left",
					color: "black",
					offsetY: -215,
					offsetX: -40
                },
				{
					type: "text",
					content: "Click NEXT to continue.",
					fontFamily: "Arial",
					fontSize: 14,
					color: "0xFF0000",
					offsetY: 200,
                },
				{
					type: "button",
					atlasParent:"popupButtons",
					content: "NEXT_BUTTON_NORMAL.png",
					buttonHover: "NEXT_BUTTON_MOUSE_OVER.png",
					buttonActive: "NEXT_BUTTON_MOUSE_DOWN.png",
					offsetY: 230,
					offsetX: -10,
					contentScale: 1,
					callback: function () {
						winningSoundScream.stop();
						winningSoundClaps.stop();
						selectedTile = 0;
						allgridCoordinates = [];
						studentInputArray = [];
						highlighted1 = [false,false];
						patternsRatio.state.start("activity1q1")
					}
				}

			]
		});
	},

	showModalCorrectAttempt: function () {
		selectedTile = 0;
		reg.modal.showModal("correctAnswer");
		winningSoundScream.play('',0,1);
		winningSoundClaps.play('',0,10);
	},

	showModal_InCorrectAttempt_Lessthan_2: function () {
		selectedTile = 0;
		reg.modal.showModal("IncorrectAnswerAttempt1");
	},

	showModal_InCorrectAttempt_Morethan_2: function () {
		selectedTile = 0;
		reg.modal.showModal("IncorrectAnswerAttempt2");
		//		thememusic.play('',0,1);
	},


	/**************************************************VALIDATION CODE*************************************************************/
	onSubmit: function () {
		if (this.arraysIdentical(studentInputArray, correctAnswer) == true) {
			this.showModalCorrectAttempt();
		} else if (this.arraysIdentical(studentInputArray, correctAnswer) == false && attemptCount < 2) {
			attemptCount++;
			this.showModal_InCorrectAttempt_Lessthan_2();
		} else if (this.arraysIdentical(studentInputArray, correctAnswer) == false && attemptCount >= 2) {
			this.showModal_InCorrectAttempt_Morethan_2();
		}
	},
	onReset: function () {
		selectedTile = 0;
		highlighted1 = [false,false];
		allgridCoordinates = [];
		studentInputArray = [];
		highlighted1 = [false,false];
		this.state.start('activity1')
	}

};
