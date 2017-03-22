
var UserStudy1 = function(experiment) {
	this.experiment = experiment; // all experiment-related utilities
	this.startTime = null;
	this.measuredAlready = false;
	this.questionSet = ["What is your blood type","Where do you come from","What was the last movie you've watched ?","What year are you in","Name three fruits you like to eat","Are you married or not","Who is your favorite movie star","Do you believe in Jesus","Do you prefer McDonald's or KFC","When did you wake up","How many people are there in your family","Have you been to Japan","What's your college major","How often do you smoke?"]
	this.answerSet = ["Sophia, Emma, Olivia","it was held in Los Angeles","born in October 28th, 1955","Georgia Aquarium in Atlanta","Mandarin, English, Spanish","maple leaf, beaver, ice hockey","a short film Steamboat Willie","it takes 150 calories an hour.","it takes 64 years approximately.","coffee, peanut butter, crayons","they believe it improves eyesight","Yes, there's one in Paris.","No, we don't know the exact date.","it's French, and derives from Latin.","Jackson, Aiden, Lucas.","Russia, Japan, New Zealand"]
	var self = this;
	this.measure = function(w, h, d) {
		this.experiment.measure(w, h, d);
		this.measuredAlready = true;
	}
	this.start = function() {
		if(!this.measuredAlready) {
			this.measure(1.75, 1.32, 1.2);
		}
		this.startTime = getCurrentTimeString();
		console.log("UserStudy started. (" + this.startTime + ")");
		this.experiment.showCrosshair();

	}
	this.displayOnTop = function() {
		this.experiment.hideCharacter();
		this.experiment.showCharacter(this.questionSet[2], 90, 6, 1);
	}
	this.displayOnRight = function() {
		this.experiment.hideCharacter();
		var string = this.questionSet[2];
		string = string.split(" ");
		console.log(string);
		for(var i = 0; i < string.length; i++){
			this.experiment.showCharacter(string[i], (9 * string.length / 2 - 9 * i) % 360, 6, 1);
		}
	}
	this.displayOnLeft = function() {
		this.experiment.hideCharacter();
		var string = this.questionSet[2];
		string = string.split(" ");
		console.log(string);
		for(var i = string.length - 1 ; i >= 0; i--){
			this.experiment.showCharacter(string[string.length - 1 - i], (180 + 9 * string.length / 2 - 9 * i) % 360, 6, 1);
		}
	}
	this.showLayout = function() {
		this.experiment.showLayout();
	}
}