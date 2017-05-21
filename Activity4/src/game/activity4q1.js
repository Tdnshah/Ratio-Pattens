var activity4q1 = function (patternsRatio) {};
var input;
var attempt = 0;
var inCorrectFeedbackTextAttempt1q2 = "Not quite right. \n Compare the size of the grid in original and scaled up pattern.\n  Try again!" 
;

var inCorrectFeedbackTextAttempt2q2 = "Not quite right.\n You have to create a pattern three times as large as the original one. \n You need to scale the original pattern up by a factor of 3.";
var winningSound2;
var submit;

activity4q1.prototype = {
	preload:function(){
		this.load.image('a4q2Background','assets/images/activity4/BACK_GROUND_Q2.png');
//		this.load.image('answerActivity1','assets/images/activity4/answerActivity1.png');

	},
	create:function(){
//		adding background image
		var backGround = this.add.image(this.world.centerX,this.world.centerY,'a4q2Background');
		backGround.anchor.setTo(0.5);
		this.soundButton = this.game.add.button(750,580, 'soundMute',this.toggleMute,this,'',1);
		
		winningSound2 = this.game.add.audio('childrenScream');
		submit = this.add.button(600, 600, 'buttons', this.onSubmit, this,'SUBMIT_OVER.png','SUBMIT_NORMAL.png','SUBMIT_DOWN.png');
		submit.anchor.setTo(0.5);

		
//		adding the question text
		var questionText ="Compare the original and the scaled up pattern and\ncomplete the table below. " 
		var questionTextStyle = {font: "14px Arial", fill: "black", align:"left"};	
		var questionTextOnDisplay = this.add.text(30,61,questionText,questionTextStyle)
		questionTextOnDisplay.anchor.setTo(0);
		questionTextOnDisplay.lineSpacing = -5;

//		adding the instructional text
		var instructionText = "Enter your answers in the form of whole numbers and \nclick Submit to check your answers."
		var instructionTextStyle = {font: "14px Arial", fill: "blue	", align:"left"};
		var instructionTextOnDisplay = this.add.text(30,128,instructionText,instructionTextStyle)
		instructionTextOnDisplay.anchor.setTo(0);
		instructionTextOnDisplay.lineSpacing =-8;
		
//		text for heading the answer inputs
		var columns_headingTextStyle = {font: "16px Arial", fill: "black", align:"left"};
		columns_heading = this.add.text(505,453,'No of Green Tiles',columns_headingTextStyle)
		columns_heading = this.add.text(650,453,'No of Pink Tiles',columns_headingTextStyle)
		
		
		
		var rows_headingTextStyle = {font: "16px Arial", fill: "blue", align:"left"};
		rows_heading1 = this.add.text(430,483,'Original\nPattern',rows_headingTextStyle)
		rows_heading1.lineSpacing = -6;
		rows_heading2 = this.add.text(430,523,'Scaled\nPattern',rows_headingTextStyle)
		rows_heading2.lineSpacing = -6;
		
		
		input1 = this.add.inputField(520,483,{
												font: '15px Arial',
												fill: '#212121',
												fontWeight: 'bold',
												width: 80,
												height : 15,
												padding: 8,
												borderWidth: 2,
												borderColor: '#0EC2F5',
												borderRadius: 6,});
		input2 = this.add.inputField(658,483,{
												font: '15px Arial',
												fill: '#212121',
												fontWeight: 'bold',
												width: 80,
												height : 15,
												padding: 8,
												borderWidth: 2,
												borderColor: '#0EC2F5',
												borderRadius: 6,});
		input3 = this.add.inputField(520,528,{
												font: '15px Arial',
												fill: '#212121',
												fontWeight: 'bold',
												width: 80,
												height : 15,
												padding: 8,
												borderWidth: 2,
												borderColor: '#0EC2F5',
												borderRadius: 6,});
		input4 = this.add.inputField(658,528,{
												font: '15px Arial',
												fill: '#212121',
												fontWeight: 'bold',
												width: 80,
												height : 15,
												padding: 8,
												borderWidth: 2,
												borderColor: '#0EC2F5',
												borderRadius: 6,});
		
		
		
		reg.modal = new gameModal(patternsRatio);
		this.createModals();
		
		
	},
	update:function(){
		this.input.update();
		this.input.update();
		if (input1.value == "" ||input2.value == "" ||input3.value == "" ||input4.value == ""){
			submit.tint = 0x666677;
			submit.inputEnabled = false;
		}
		else{
			submit.tint = 0xffffff;
			submit.inputEnabled = true;
		};
	},
//	This is function is used for debugging the point pixel position
	render: function(){
		this.game.debug.text('x: '+this.game.input.x + ' y: ' + this.game.input.y,32,32);
//		this.game.debug.geom(gridtile[1], 'rgba(135,0,0,1)') ;
		},
	
	
	/******************************************* Modals ***********************************************************************************/
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
				 {
                    type: "button",
					atlasParent:'popupsItems',
					content: "close_button_normal.png",
					buttonHover:"close_button_mouse_over.png",
                    offsetY: -170,
					offsetX: 195,
					contentScale: 1,
					callback: function(){
						winningSound2.stop();
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
                    fontSize:14,
                    color: "black",
                    offsetY:-130,
                    offsetX:-120
                },
				
				  {
                    type: "text",
                    content: "You have correctly calculated the number of green \nand red tiles in both patterns.",
                    fontFamily: "Arial",
                    fontSize:14,
					align: "left",
                    color: "black",
                    offsetY:-80,
                    offsetX:-15
                },
				
				  {
                    type: "text",
                    content: "Click NEXT to continue",
                    fontFamily: "Arial",
                    fontSize:12,
                    color: "0xFF0000",
					align: "left",
                    offsetY:-40,
                    offsetX:-90
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
					winningSound2.stop();
					selectedTile = 0;
					rows = 0
					gridtile1 = [];
					columns = 0;
					studentInputArray = []	
					patternsRatio.state.start('activity4q1')
                 }
				}
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
                    content:"Not quite right.",
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-130,
                    offsetX:-110
                },
				{
                    type: "text",
                    content:"	The original pattern has 8 red tile and 56 green tiles.\nThe scaled pattern has 2 red tiles and 14 green tiles.",
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-80,
                    offsetX:-30
                },		
				{
                    type: "text",
                    content:"Click TRY AGAIN to clear the grid and try again",
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
                  		input1.value = "";
                  		input2.value = "";
                  		input3.value = "";
                  		input4.value = "";
						patternsRatio.state.start('activity4q1')      
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
                    content: "answerActivity4",
                    offsetY: 0,
                    offsetX: -15,
                    contentScale: 1
                },	
				
				{
                    type: "button",
					atlasParent:'popupsItems',
					content: "close_button_normal.png",
					buttonHover:"close_button_mouse_over.png",
                    offsetY: -290,
					offsetX: 200,
					contentScale: 1,
					callback: function(){
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
                    content:"Not quite right." ,
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-260,
                    offsetX:-100
                },
				{
                    type: "text",
                    content:"When the original pattern is scaled up by a\nfactor of 2, it looks like this:",
                    fontFamily: "Arial",
                    fontSize:14,
					align:"left",
                    color: "black",
                    offsetY:-215,
                    offsetX:-40
                },
				{
                    type: "text",
                    content:"Click NEXT to continue",
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "0xFF0000",
                    offsetY:200,
                },
				{
                    type: "button",
					atlasParent: "popupButtons",
					content: "NEXT_BUTTON_NORMAL.png",
					buttonHover: "NEXT_BUTTON_MOUSE_OVER.png",
					buttonActive: "NEXT_BUTTON_MOUSE_DOWN.png",
                    offsetY: 230,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
						selectedTile = 0;
						rows = 0
						gridtile1 = [];
						columns = 0;
						studentInputArray = []
                        patternsRatio.state.start("activity4q1")
                 }
				}
		
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
                    content:"Not quite right.",
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-130,
                    offsetX:-110
                },
				{
                    type: "text",
                    content:"The size of the grid you have drawn is incorrect.",
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-100,
                    offsetX:-40,
                },
				{
                    type: "text",
                    content:"Remember, you have to scale up the given pattern by\n a factor of 2,so your grid should be drawn accordingly.",
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-70,
                    offsetX:-21
                },
				{
                    type: "text",
                    content:"Click Reset to clear the grid and try again.",
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
						rows = 0
						gridtile1 = [];
						columns = 0;
						studentInputArray = []
						patternsRatio.state.start('activity4')      
                 }
				}
		
			]
        });
	
	},

	showModalIncorrectGridAnswerAttempt1: function(){
		reg.modal.showModal("IncorrectGridAnswerAttempt1");
//		thememusic.play('',0,1);
	},
	showModalCorrectAttempt: function(){
		reg.modal.showModal("correctAnswer");
		winningSound2.play();
	},	
	showModal_InCorrectAttempt_Lessthan_2: function(){
		reg.modal.showModal("IncorrectAnswerAttempt1");
	},	
	showModal_InCorrectAttempt_Morethan_2: function(){
		reg.modal.showModal("IncorrectAnswerAttempt2");
//		thememusic.play('',0,1);
	},
	/***************************************** Validation *********************************************************************************/
	
	onSubmit: function(){
		if (input1.value == 56 && input2.value == 8 && input3.value == 14 && input4.value == 2){
			this.showModalCorrectAttempt();
		}
		else if (input1.value != 56 || input2.value != 8 || input3.value != 14 || input4.value != 2){
			if(attempt < 1){
				attempt ++;
				this.showModal_InCorrectAttempt_Lessthan_2();
				}
			else{
				console.log("attempt finished");
			}
		}
	
	}
	
};
