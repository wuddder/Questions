
var UserStudy1 = function(experiment) {


	this.experiment = experiment; // all experiment-related utilities
	this.offset = 0;
	this.startTime = null;
	this.nextSentenceNum = 0 + this.offset;
	this.measuredAlready = false;
	this.count = 0;
	this.questionSet = ["幹 ?","Where do you come from ?","What year are you in ?","Name three fruits you like to eat ?","Are you married or not ?","Who is your favorite movie star ?"]
	this.answerSet = ["Sophia, Emma, Olivia","it was held in Los Angeles","born in October 28th, 1955","Georgia Aquarium in Atlanta","Mandarin, English, Spanish"]
	this.randomNum = [1,2,3,4,5]
	this.nowUse = []
	var self = this;
	this.measure = function(w, h, d) {
		this.experiment.measure(w, h, d);
		this.measuredAlready = true;
	}
	this.QuestionStart = function() {
		if(!this.measuredAlready) {
			this.measure(1.75, 1.32, 1.2);
		}
		this.startTime = getCurrentTimeString();
		console.log("UserStudy started. (" + this.startTime + ")");
		this.experiment.showCrosshair();
		this.EccNum = document.getElementById("eccNumber").value;
		this.nowUse = this.questionSet;
	}
	this.AnswerStart = function() {
		this.nowUse = this.answerSet;
	}
	this.nextSentence = function() {
		this.nextSentenceNum = (this.nextSentenceNum + 1) % 5;
	}
	this.displayOnTop = function() {
		this.EccNum = document.getElementById("eccNumber").value;
		this.nextSentence();
		this.experiment.hideCharacter();
		this.experiment.showCharacter(this.nowUse[this.nextSentenceNum], 90, this.EccNum, 1);
	}
	this.displayOnRight = function() {
		this.EccNum = document.getElementById("eccNumber").value;
		this.nextSentence();
		this.experiment.hideCharacter();
		var string = this.nowUse[this.nextSentenceNum];
		string = string.split(" ");
		for(var i = 0; i < string.length; i++){
			this.experiment.showCharacter(string[i], (9 * string.length / 2 - 9 * i) % 360, this.EccNum, 1);
		}
	}
	this.displayOnLeft = function() {
		this.EccNum = document.getElementById("eccNumber").value;
		this.nextSentence();
		this.experiment.hideCharacter();
		var string = this.nowUse[this.nextSentenceNum];
		string = string.split(" ");
		for(var i = string.length - 1 ; i >= 0; i--){
			this.experiment.showCharacter(string[string.length - 1 - i], (180 + 9 * string.length / 2 - 9 * i) % 360, this.EccNum, 1);
		}

	}
	this.displayOnBottom = function(){
		this.EccNum = document.getElementById("eccNumber").value;
		this.nextSentence();
		this.experiment.hideCharacter();
		this.experiment.showCharacter(this.nowUse[this.nextSentenceNum], 270, this.EccNum, 1);
	}
	this.showLayout = function() {
		this.experiment.showLayout();
	}
}