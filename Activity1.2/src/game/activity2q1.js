var activity2q1 = function (patternsRatio) {};
var input;
var attempt = 0;
var inCorrectFeedbackTextAttempt1q2 = "Not quite right. \n Compare the size of the grid in original and scaled up pattern.\n  Try again!" 
;

var inCorrectFeedbackTextAttempt2q2 = "Not quite right.\n You have to create a pattern three times as large as the original one. \n You need to scale the original pattern up by a factor of 3.";

activity2q1.prototype = {
	preload:function(){
		this.load.image('a1q2Background','assets/images/activity2/BACK_GROUND_Q2.png');
//		this.load.image('answerActivity1','assets/images/activity2/answerActivity1.png');
//		this.add.plugin(PhaserInput.Plugin);
		
	},
	create:function(){
//		adding background image
		var backGround = this.add.image(this.world.centerX,this.world.centerY,'a1q2Background');
		backGround.anchor.setTo(0.5);

//		adding question image
		var question = this.add.image(125,212,'question');	
//		adding answer image
		var answer = this.add.image(417,48,'answerActivity1')
//		adding submit button
		var submit = this.add.button(600,493,'SubmitResetButton',this.onSubmit,this,5,4,3);
		submit.anchor.setTo(0.5);
		
//		adding the question text
		var questionText ="How many times larger is your pattern compared to \n the original one? " 
		var questionTextStyle = {font: "14px Arial", fill: "black", align:"left"};	
		var questionTextOnDisplay = this.add.text(30,61,questionText,questionTextStyle)
		questionTextOnDisplay.anchor.setTo(0);
		questionTextOnDisplay.lineSpacing = -5;

//		adding the instructional text
		var instructionText = "Enter your answer in the form of a whole number and click Submit \nto check your answer."
		var instructionTextStyle = {font: "12px Arial", fill: "blue	", align:"left"};
		var instructionTextOnDisplay = this.add.text(420,445,instructionText,instructionTextStyle)
		instructionTextOnDisplay.anchor.setTo(0);
		instructionTextOnDisplay.lineSpacing =-8;
		

		input = this.add.inputField(420,475,{
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
		this.game.debug.text('x: '+this.game.input.x + ' y: ' + this.game.input.y,32,32);
//		this.game.debug.geom(gridtile[1], 'rgba(135,0,0,1)') ;
		},
	
	/******************************************* Modals ***********************************************************************************/
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
                    content: "“Well done! \n The pattern you created was three times as large as the original one. \n That means, you scaled the pattern up by a factor of 3.",
                    fontFamily: "Arial",
                    fontSize:15,
                    color: "black",
                    offsetY:-90,
                    offsetX:-10
                },
//				{
//                    type: "image",
//                    content:"nextNormal",
//					buttonHover:"",
//					buttonActive:"",
//                    offsetY: -10,
//                    offsetX: -10,
//                    contentScale: 1,
//                    callback: function () {
//                       
//                 }
//				}
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
                    content:inCorrectFeedbackTextAttempt1q2 ,
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
					buttonActive:"tryagainDown",
                    offsetY: -10,
                    offsetX: -10,
                    contentScale: 1,
                    callback: function () {
                        patternsRatio.state.start("activity2q1")
                 }
				}
		
			]
        });
		
		reg.modal.createModal({
            type:"IncorrectAnswerAttempt2",
            includeBackground: true,
			backgroundColor:0xffffff,
			backgroundOpacity:0.8,
            modalCloseOnInput: true,
            itemsArr: [
//              {
//                    type: "image",
//                    content: "correct",
//                    offsetY: -50,
//                    contentScale: 2
//                },
//				
//				{
//                    type: "image",
//                    content: "answerActivity1",
//                    offsetY: -130,
//                    contentScale: 1
//                },
					{
                    type: "text",
                    content:"",
                    fontFamily: "Arial",
                    fontSize:20,
                    color: "black",
                    
                },
				  
					{
                    type: "text",
                    content:inCorrectFeedbackTextAttempt2q2,
                    fontFamily: "Arial",
                    fontSize:20,
                    color: "blue",
                    offsetY:130,
                    offsetX:-10
                },
//				{
//                    type: "image",
//                    content:"nextNormal",
//					buttonHover:"nextOver",
//					buttonActive:"nextDown",
//                    offsetY: 230,
//                    offsetX: -10,
//                    contentScale: 1,
//                    callback: function () {
//                        patternsRatio.state.start("activity1q1")
//                 }
//				}
		
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
	/***************************************** Validation *********************************************************************************/
	
	onSubmit: function(){
		if (input.value == 3){
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
