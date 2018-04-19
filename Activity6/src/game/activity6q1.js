var activity6q1 = function (patternsRatio) {};
var input;
var attemptCount = 0;
var actualAnswer = "2/3";
var studentsAnswer;4
var submit;
var winningSound2;


console.log(actualAnswer)
console.log(studentsAnswer)
var inCorrectFeedbackTextAttempt1q2 = "Not quite right. \n Compare the size of the grid in original and scaled up pattern.\n  Try again!" 
;

var inCorrectFeedbackTextAttempt2q2 = "Not quite right.\n You have to create a pattern three times as large as the original one. \n You need to scale the original pattern up by a factor of 3.";
var activityLevel2 = {
	activityQuestionNo : 2,
}
activity6q1.prototype = {
	preload:function(){
		this.load.image('a6q2Background','assets/images/activity6/BACK_GROUND_Q6.png');
		this.load.text('translation', 'src/langData/translation.json');
		/* rev2.0 Code*/
		if(gameStartTime == '0'){
			gameStartTime = new Date().toString();			
		}
		/* rev 2.0 Code Ended */
	},
	create:function(){

		// Loading of the dataRepoter class 
		data.Reporter = new gameReporter(patternsRatio);
		
		//loading translation json file
		t = JSON.parse(this.game.cache.getText('translation'));
		// Setting Start time for this question
		activityLevel2['Level2StartTime'] = gameEndTime.getFullYear() + "-" + gameEndTime.getMonth() + "-" + gameEndTime.getDate()+":"+gameEndTime.getHours()+":"+gameEndTime.getMinutes()+":"+gameEndTime.getSeconds();

//		adding background image
		var backGround = this.add.image(this.world.centerX,this.world.centerY,'a6q2Background');
		backGround.anchor.setTo(0.5);
		this.soundButton = this.game.add.button(750,580, 'soundMute',this.toggleMute,this,'',1);
		winningSound2 = this.game.add.audio('childrenScream');
//		adding submit button
		submit = this.add.button(520, 545, 'buttons', this.onSubmit, this,'SUBMIT_OVER.png','SUBMIT_NORMAL.png','SUBMIT_DOWN.png');
		submit.anchor.setTo(0.5);
		
		var reset = this.add.button(685, 545, 'buttons', this.onReset, this, 'RESET_OVER_new.png','RESET_NORMAL_new.png','RESET_DOWN_new.png');
		reset.anchor.setTo(0.5);
		
//		adding the question text
		var questionText =this.translate('questionText') 
		var questionTextStyle = {font: "14px Arial", fill: "black", align:"left"};	
		var questionTextOnDisplay = this.add.text(30,75,questionText,questionTextStyle)
		questionTextOnDisplay.anchor.setTo(0);
		questionTextOnDisplay.lineSpacing = -5;

		activityLevel2['QuestionText'] = questionText;

//		adding the instructional text
		var instructionText = this.translate('instructionText');

		var instructionTextStyle = {font: "12px Arial", fill: "blue	", align:"left"};
		var instructionTextOnDisplay = this.add.text(420,445,instructionText,instructionTextStyle)
		instructionTextOnDisplay.anchor.setTo(0);
		instructionTextOnDisplay.lineSpacing =-8;
		

		input = this.add.inputField(420,486,{
												font: '10px Arial',
												fill: '#212121',
												fontWeight: 'bold',
												width: 200,
												height : 10,
												padding: 8,
												borderWidth: 2,
												borderColor: '#0EC2F5',
												borderRadius: 6,
												type: PhaserInput.InputType.numeric,
												placeHolderColor: '#767676',
												placeHolder:"Enter whole number or fractions only.",
												});
		
		reg.modal = new gameModal(patternsRatio);
		this.createModals();
		
		
	},
	update:function(){
		this.input.update()
		if ( input.value == ""){
			submit.tint = 0x666677;
			submit.inputEnabled = false;
		}
		else if ((/(^(\+|-)?\d+|-?\d+\/-?\d+)$/.test(input.value)) == false){
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
//				 {
//                    type: "button",
//					atlasParent:'popupsItems',
//					content: "close_button_normal.png",
//					buttonHover:"close_button_mouse_over.png",
//                    offsetY: -170,
//					offsetX: 195,
//					contentScale: 1,
//					callback: function(){
//					  winningSound2.stop();
//                      reg.modal.hideModal("correctAnswer");
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
                    offsetY:-100,
                    offsetX:-5
                },
				
				
				  {
                    type: "text",
                    content: this.translate('correctAnswerModalText3'),
                    fontFamily: "Arial",
                    fontSize:14,
					align: "left",
                    color: "black",
                    offsetY:-60,
                    offsetX:0
                },
				{
                    type: "text",
                    content:this.translate('correctAnswerModalText4'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "0xFF0000",
                    offsetY:-10,
                    offsetX:-20
                },
				
//				{
//                    type: "button",
//					atlasParent: "popupButtons",
//					content: "NEXT_BUTTON_NORMAL.png",
//					buttonHover: "NEXT_BUTTON_MOUSE_OVER.png",
//					buttonActive: "NEXT_BUTTON_MOUSE_DOWN.png",
//                    offsetY: -5,
//                    offsetX: -10,
//                    contentScale: 1,
//                    callback: function () {
//					winningSound2.stop();
//                    patternsRatio.state.start('activity6q1')
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
                    content:this.translate('incorrectAnswerModal<2attemptsText3'),
                    fontFamily: "Arial",
                    fontSize:12,
                    color: "0xFF0000",
                    offsetY:-35,
                    offsetX:-50
                },
//				
				
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
//				 {
//                    type: "button",
//					atlasParent:'popupsItems',
//					content: "close_button_normal.png",
//					buttonHover:"close_button_mouse_over.png",
//                    offsetY: -170,
//					offsetX: 195,
//					contentScale: 1,
//					callback: function(){
//                      reg.modal.hideModal("IncorrectAnswerAttempt2");
//                    } 
//                },
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
                    content:this.translate('incorrectAnswerModal>2attemptsText1'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "black",
                    offsetY:-130,
                    offsetX:-110
                },
				{
                    type: "text",
                    content:this.translate('incorrectAnswerModal>2attemptsText2'),
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
                    content:this.translate('incorrectAnswerModal>2attemptsText3'),
                    fontFamily: "Arial",
                    fontSize:14,
                    color: "0xFF0000",
                    offsetY:-10,
                    offsetX:-20
                },					
//				{
//                    type: "button",
//					atlasParent: "popupButtons",
//					content: "TRY_AGAIN_BUTTON_NORMAL.png",
//					buttonHover: "TRY_AGAIN_BUTTON_MOUSE_OVER.png",
//					buttonActive: "TRY_AGAIN_BUTTON_MOUSE_DOWN.png",
//                    offsetY: -0,
//                    offsetX: -10,
//                    contentScale: 1,
//                    callback: function () {
//                  		input.value = 0;
//						patternsRatio.state.start('activity6q1')      
//                 }
//				}
		
			]
        });		
	},

	showModalCorrectAttempt: function(){
		reg.modal.showModal("correctAnswer");
		winningSound2.play();
		this.dataPost();
	},
	
	showModal_InCorrectAttempt_Lessthan_2: function(){
		reg.modal.showModal("IncorrectAnswerAttempt1");
	},
	
	showModal_InCorrectAttempt_Morethan_2: function(){
		reg.modal.showModal("IncorrectAnswerAttempt2");
		this.dataPost();
	},
	
	/***************************************** Validation ***********************************************************************/
	
	onSubmit: function(){
		studentsAnswer = input.value;
		if (studentsAnswer == actualAnswer){
			attemptCount ++;
			/*rev 2.0 code*/
			var attempt = {};
			attempt['attemptNo'] = attemptCount;
			attempt['correctAnswer'] = (studentsAnswer == actualAnswer);
			attempt['StudentInputAnswer'] =studentsAnswer;
			attempts['attempt'+attemptCount]=attempt;
			this.showModalCorrectAttempt();
			// console.log(activityLevel);
			/*rev 2.0 code ended*/
		}
		else if (input.value != 2/3 && attemptCount < 2){
			attemptCount ++;
			/*rev 2.0 code*/
			var attempt = {};
			attempt['attemptNo'] = attemptCount;
			attempt['correctAnswer'] = (studentsAnswer == actualAnswer);
			attempt['StudentInputAnswer'] = studentsAnswer;
			attempts['attempt'+attemptCount]=attempt;
			this.showModal_InCorrectAttempt_Lessthan_2();
			// console.log(activityLevel);
			/*rev 2.0 code ended*/
		}
		else if(input.value != 2/3 && attemptCount >= 2){
			attemptCount ++
			/*rev 2.0 code*/
			var attempt = {};
			attempt['attemptNo'] = attemptCount;
			attempt['correctAnswer'] = (studentsAnswer == actualAnswer);
			attempt['StudentInputAnswer'] =studentsAnswer;
			attempts['attempt'+attemptCount]=attempt;
			this.showModal_InCorrectAttempt_Morethan_2();
			// console.log(activityLevel);
			/*rev 2.0 code ended*/
		}
	},
		/* rev 2.0 code   */	
	// _t function is checking the language and loading question text

	translate: function (getContent){
		if(data.Reporter.getCookie("language_code") == "hi"){
			translatedText = t.activityLevel1Q2.hi[getContent];
			
		}
		else if (data.Reporter.getCookie("language_code") == "te"){
			translatedText = t.activityLevel1Q2.te[getContent];			
		}
		else{
			translatedText = t.activityLevel1Q2.en[getContent];
		}; 

		return translatedText;
		},

	dataPost: function(){

		gameEndTime = new Date();
		activityLevel2['Level2EndTime']=gameEndTime.getFullYear() + "-" + gameEndTime.getMonth() + "-" + gameEndTime.getDate()+":"+gameEndTime.getHours()+":"+gameEndTime.getMinutes()+":"+gameEndTime.getSeconds();
		activityLevel2['attempts']=attempts;
		appData['Activity6Q1'] = activityLevel1;
		appData['Activity6Q2'] = activityLevel2;
		appData['eventType'] = 'Stage End';
		appData['gameOverallEndTime'] = gameEndTime.getFullYear() + "-" + gameEndTime.getMonth() + "-" + gameEndTime.getDate()+":"+gameEndTime.getHours()+":"+gameEndTime.getMinutes()+":"+gameEndTime.getSeconds();
		data.Reporter.submitData('url',appData);
	
	}
	
	/* rev 2.0 code ended  */
	
	
	
};
