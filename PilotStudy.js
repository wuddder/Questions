

var PilotStudy = function(experiment) {
	
	this.experiment = experiment; // all experiment-related utilities

	// pilot study configuration
	this.characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	this.directions = [0, 45, 90, 135, 180, 225, 270, 315];
	this.eccentricities = [10, 20, 30, 40, 50, 60];
	this.startSizes = 10;
	this.startTime = null;
	this.measuredAlready = false;

	this.measure = function(w, h, d) {
		this.experiment.measure(w, h, d);
		this.measuredAlready = true;
	}

	// start the pilot study
	this.start = function() {
		if(!this.measuredAlready) {
			console.log("not yet measured!");
			return;
		}
		this.startTime = getCurrentTimeString();
		console.log("pilot study started. (" + this.startTime + ")");
		this.experiment.showCrosshair();
		this.experiment.showCharacter("S", this.directions[0], this.eccentricities[0], this.startSize);
	}

	// end the pilot study
	this.end = function() {
		;
	}

	this.nextRound = function() {
		;
	}


}