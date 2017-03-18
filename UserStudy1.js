
var UserStudy1 = function(experiment) {
	this.experiment = experiment; // all experiment-related utilities
	this.dirNum = 0;
	this.eccNum = 0;
	this.sizeNum = 2;
	this.characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	this.trailNum = 20;
	this.directions = [0, 45, 90, 135, 180, 225, 270, 315];
	this.eccentricities = [5, 10];
	this.startSizes = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0];
	this.startTime = null;
	this.measuredAlready = false;
	this.shuffledSet = [];
	this.counter = {counter:0, yes:0, no:0,  state: 0};
	this.threshold = 0.95;
	this.report = "";
	this.randomNum;
	var self = this;
	this.measure = function(w, h, d) {
		this.experiment.measure(w, h, d);
		this.measuredAlready = true;
	}
	this.start = function() {
		if(!this.measuredAlready) {
			this.measure(0.36, 0.16, 0.9);
		}
		this.randomNum = Math.floor((Math.random() * this.characterSet.length));
		this.shuffledSet = shuffle(this.characterSet);
		this.startTime = getCurrentTimeString();
		console.log("UserStudy started. (" + this.startTime + ")");
		this.experiment.showCrosshair();
		var c = "i am handsome";
		this.report += ((new Date()).getTime() + " showing " + c + "\n");
		this.experiment.showCharacter(c, 90, 5, 1);
	}
	this.showLayout = function() {
		this.experiment.showLayout();
	}
}