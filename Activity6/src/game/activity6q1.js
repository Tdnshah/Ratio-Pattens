var activity6q1 = function (patternsRatio) {};
var input;
var attempt = 0;
var actualAnswer = "2/3";
var studentsAnswer;
console.log(actualAnswer)
console.log(studentsAnswer)
var inCorrectFeedbackTextAttempt1q2 = "Not quite right. \n Compare the size of the grid in original and scaled up pattern.\n  Try again!" 
;

var inCorrectFeedbackTextAttempt2q2 = "Not quite right.\n You have to create a pattern three times as large as the original one. \n You need to scale the original pattern up by a factor of 3.";

activity6q1.prototype = {
	preload:function(){
		this.load.image('a6q2Background','assets/images/activity6/BACK_GROUND_Q6.png');
	},
	create:function(){
//		adding background image
		var backGround = this.add.image(this.world.centerX,this.world.centerY,'a6q2Background');
		backGround.anchor.setTo(0.5);


//		adding submit button
		var submit = this.add.button(520,545,'SubmitResetButton',this.onSubmit,this,5,4,3);
		submit.anchor.setTo(0.5);
		
		var reset = this.add.button(685,545,'SubmitResetButton',function(){this.state.start('activity6q1')},this,2,1,6);
		reset.anchor.setTo(0.5);
		
//		adding the question text
		var questionText ="Find the factor by which the original pattern is scaled\ndown. " 
		var questionTextStyle = {font: "14px Arial", fill: "black", align:"left"};	
		var questionTextOnDisplay = this.add.text(30,75,questionText,questionTextStyle)
		questionTextOnDisplay.anchor.setTo(0);
		questionTextOnDisplay.lineSpacing = -5;

//		adding the instructional text
		var instructionText = "Enter your answer in the form of a whole number or a fraction and click \nSubmit to check your answer."
		var instructionTextStyle = {font: "12px Arial", fill: "blue	", align:"left"};
		var instructionTextOnDisplay = this.add.text(420,445,instructionText,instructionTextStyle)
		instructionTextOnDisplay.anchor.setTo(0);
		instructionTextOnDisplay.lineSpacing =-8;
		

		input = this.add.inputField(420,480,{
												font: '15px Arial',
												fill: '#212121',
												fontWeight: 'bold',
												width: 100,
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
	},
//	This is function is used for debugging the point pixel position
	render: function(){
//		this.game.debug.text('x: '+this.game.input.x + ' y: ' + this.game.input.y,32,32);
//		this.game.debug.geom(gridtile[1], 'rgba(135,0,0,1)') ;
		},
	
/******************************************* Modals **********************************************************************/
/********************************Modal Type *****************************************************************************/	
	
	createModals: function(){	
		
/**************************************** feedback correct *****************************************************/
 
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
                    type: "image",
					content: "closeNormal",
//                 	buttonActive: "closeNormal",
//					buttonHover:"closeOver",
                    offsetY: -170,
					offsetX: 195,
					contentScale: 1,
					callback: function(){
                      reg.modal.hideModal("correctAnswer");
                    } 
                },
				
				{
                    type: "image",
                    content: "happySmiley",
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
                    content: "The smaller pattern is ⅔ times the original pattern.",
                    fontFamily: "Arial",
                    fontSize:14,
					align: "left",
                    color: "black",
                    offsetY:-100,
                    offsetX:-5
                },
				
				
				  {
                    type: "text",
                    content: " This means, the original pattern is scaled down by a \n factor of 2/3.",
                    fontFamily: "Arial",
                    fontSize:14,
					align: "left",
                    color: "black",
                    offsetY:-60,
                    offsetX:0
                },
				
				
				
				  {
                    type: "text",
                    content: "Click NEXT to continue",
                    fontFamily: "Arial",
                    fontSize:12,
                    color: "0xFF0000",
					align: "left",
                    offsetY:-25,
                    offsetX:-100
                },
				
				{
                    type: "image",
                    content:"nextNormal",
					buttonHover:"",
					buttonActive:"",
                    offsetY: -5,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
                      patternsRatio.state.start('activity6q1')
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
                    type: "image",
					content: "closeNormal",
//                 	buttonActive: "closeNormal",
//					buttonHover:"closeOver",
                    offsetY: -170,
					offsetX: 195,
					contentScale: 1,
					callback: function(){
                      reg.modal.hideModal("IncorrectAnswerAttempt1");
                    } 
                },
				{
                    type: "image",
                    content: "sadSmiley",
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
                    content:"Compare the size of the grid in the original \nand scaled up patterns. Try again!",
                    fontFamily: "Arial",
                    fontSize:14,
					align:"left",
                    color: "black",
                    offsetY:-80,
                    offsetX:-50
                },
//				{
//                    type: "text",
//                    content:"1. Fill the grid completely.",
//                    fontFamily: "Arial",
//                    fontSize:14,
//                    color: "black",
//                    offsetY:-80,
//                    offsetX:-90
//                },
//				{
//                    type: "text",
//                    content:"2. Look like an enlarged version of the original pattern.",
//                    fontFamily: "Arial",
//                    fontSize:14,
//                    color: "black",
//                    offsetY:-60,
//                    offsetX:-0
//                },
//				
				{
                    type: "text",
                    content:"Click TRY AGAIN to clear the grid and try again",
                    fontFamily: "Arial",
                    fontSize:12,
                    color: "0xFF0000",
                    offsetY:-35,
                    offsetX:-50
                },
//				
				
				{
                    type: "image",
                    content:"tryagainNormal",
					buttonHover:"tryagainOver",
					buttonActive:"tryagaintDown",
                    offsetY: -0,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
                  		input.value = 0;
						patternsRatio.state.start('activity6q1')      
                 }
				}
		
			]
        });
/****************************************feedback 1 incorrect ***********************************************/ 			
		reg.modal.createModal({
            type:"IncorrectAnswerAttempt2",
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
                    type: "image",
					content: "closeNormal",
//                 	buttonActive: "closeNormal",
//					buttonHover:"closeOver",
                    offsetY: -170,
					offsetX: 195,
					contentScale: 1,
					callback: function(){
                      reg.modal.hideModal("IncorrectAnswerAttempt2");
                    } 
                },
				{
                    type: "image",
                    content: "sadSmiley",
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
                    content:"The pattern you created was three times as large \nas the original one. \nThat means, you scaled the pattern up by a factor of 3.",
                    fontFamily: "Arial",
                    fontSize:14,
					align:"left",
                    color: "black",
                    offsetY:-70,
                    offsetX:-10
                },
//				{
//                    type: "text",
//                    content:"1. Fill the grid completely.",
//                    fontFamily: "Arial",
//                    fontSize:14,
//                    color: "black",
//                    offsetY:-80,
//                    offsetX:-90
//                },
//				{
//                    type: "text",
//                    content:"2. Look like an enlarged version of the original pattern.",
//                    fontFamily: "Arial",
//                    fontSize:14,
//                    color: "black",
//                    offsetY:-60,
//                    offsetX:-0
//                },
//				
				{
                    type: "text",
                    content:"Click TRY AGAIN to clear the grid and try again",
                    fontFamily: "Arial",
                    fontSize:12,
                    color: "0xFF0000",
                    offsetY:-25,
                    offsetX:-50
                },
//				
				
				{
                    type: "image",
                    content:"tryagainNormal",
					buttonHover:"tryagainOver",
					buttonActive:"tryagaintDown",
                    offsetY: -0,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
                  		input.value = 0;
						patternsRatio.state.start('activity6q1')      
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
	
	/***************************************** Validation ***********************************************************************/
	
	onSubmit: function(){
		studentsAnswer = input.value;
		if (studentsAnswer == actualAnswer){
			this.showModalCorrectAttempt();
		}
		else if (input.value != 3 && attempt < 2){
			this.showModal_InCorrectAttempt_Lessthan_2();
			attempt ++;
		}
		else if(input.value != 3 && attempt >= 2){
			this.showModal_InCorrectAttempt_Morethan_2();
		}
	}
	
	
	
};
