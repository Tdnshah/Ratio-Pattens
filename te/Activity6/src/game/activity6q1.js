var activity6q1 = function (patternsRatio) {};
var input;
var attempt = 0;
var actualAnswer = "2/3";
var studentsAnswer;4
var submit;
var winningSound2;


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
		this.soundButton = this.game.add.button(750,580, 'soundMute',this.toggleMute,this,'',1);
		winningSound2 = this.game.add.audio('childrenScream');
//		adding submit button
		submit = this.add.button(520, 545, 'buttons', this.onSubmit, this,'SUBMIT_OVER.png','SUBMIT_NORMAL.png','SUBMIT_DOWN.png');
		submit.anchor.setTo(0.5);
		
		var reset = this.add.button(685, 545, 'buttons', this.onReset, this, 'RESET_OVER_new.png','RESET_NORMAL_new.png','RESET_DOWN_new.png');
		reset.anchor.setTo(0.5);
		
//		adding the question text
		var questionText ="ఒరిజినల్ ఆకారం తగ్గించబడిన కారకాన్ని కనుగొనండి." 
		var questionTextStyle = {font: "16px Arial", fill: "black", align:"left"};	
		var questionTextOnDisplay = this.add.text(30,75,questionText,questionTextStyle)
		questionTextOnDisplay.anchor.setTo(0);
		questionTextOnDisplay.lineSpacing = -5;

//		adding the instructional text
		var instructionText = "మీ జవాబుని ఒక పూర్ణ సంఖ్య లేదా ఒక భిన్నం రూపంలో నమోదు చేయండి\nమరియు మీ జవాబు సరైందోకాదో చూసుకొనుటకు  సబ్మిట్ క్లిక్ చేయండి."
		var instructionTextStyle = {font: "14px Arial", fill: "blue	", align:"left"};
		var instructionTextOnDisplay = this.add.text(420,445,instructionText,instructionTextStyle)
		instructionTextOnDisplay.anchor.setTo(0);
		instructionTextOnDisplay.lineSpacing =-4;
		

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
                    content: "బాగా చేసారు!",
                    fontFamily: "Arial",
                    fontSize:16,
                    color: "black",
                    offsetY:-130,
                    offsetX:-120
                },
				
				  {
                    type: "text",
                    content: "చిన్నని ఆకారం ఒరిజినల్ ఆకారం కన్నా ⅔ రెట్లు ఉన్నది.",
                    fontFamily: "Arial",
                    fontSize:16,
					align: "left",
                    color: "black",
                    offsetY:-100,
                    offsetX:-5
                },
				
				
				  {
                    type: "text",
                    content: "ఒరిజినల్ ఆకారం కారకం 2/3 స్కేలు తగ్గించబడినది అర్థం.",
                    fontFamily: "Arial",
                    fontSize:16,
					align: "left",
                    color: "black",
                    offsetY:-60,
                    offsetX:0
                },
				{
                    type: "text",
                    content:"టాబ్ను మూసివేసి ముందుకు సాగండి",
                    fontFamily: "Arial",
                    fontSize:16,
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
                    content:"సరియైనది కాదు.",
                    fontFamily: "Arial",
                    fontSize:16,
                    color: "black",
                    offsetY:-130,
                    offsetX:-110
                },
				{
                    type: "text",
                    content:"ఒరిజినల్ లో గ్రిడ్ సైజు మరియు స్కేలు తగ్గించిన ఆకారాన్ని పోల్చండి.\nమళ్ళీ ప్రయత్నించండి!",
                    fontFamily: "Arial",
                    fontSize:16,
					align:"left",
                    color: "black",
                    offsetY:-80,
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
                    content:"గ్రిడ్ క్లియర్ చేసి మరియు మళ్ళీ ప్రయత్నించడానికి రీసెట్ క్లిక్ చేయండి.",
                    fontFamily: "Arial",
                    fontSize:16,
                    color: "0xFF0000",
                    offsetY:-35,
                    offsetX:-10
                },
//				
				
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
                    content:"సరియైనది కాదు.",
                    fontFamily: "Arial",
                    fontSize:16,
                    color: "black",
                    offsetY:-130,
                    offsetX:-110
                },
				{
                    type: "text",
                    content:"మీరు ఒరిజినల్ ఆకారానికి 2/3 రెట్లు ఉన్న ఒక ఆకారాన్ని మీరు\nతయారు చేయాలి.మీరు ఒరిజినల్ ఆకారాన్ని కారకం 2/3 తో స్కేలు\nతగ్గించాలని దీని అర్థం.",
                    fontFamily: "Arial",
                    fontSize:16,
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
                    content:"టాబ్ను మూసివేసి ముందుకు సాగండి",
                    fontFamily: "Arial",
                    fontSize:16,
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
	},
	
	showModal_InCorrectAttempt_Lessthan_2: function(){
		reg.modal.showModal("IncorrectAnswerAttempt1");
	},
	
	showModal_InCorrectAttempt_Morethan_2: function(){
		reg.modal.showModal("IncorrectAnswerAttempt2");
	},
	
	/***************************************** Validation ***********************************************************************/
	
	onSubmit: function(){
		studentsAnswer = input.value;
		if (studentsAnswer == actualAnswer){
			this.showModalCorrectAttempt();
		}
		else if (input.value != 2/3 && attempt < 2){
			this.showModal_InCorrectAttempt_Lessthan_2();
			attempt ++;
		}
		else if(input.value != 2/3 && attempt >= 2){
			this.showModal_InCorrectAttempt_Morethan_2();
		}
	}
	
	
	
};
