

var Experiment = function(canvas) {

	// initialization
	this.canvas = canvas;
	this.center = {x: canvas.width / 2, y: canvas.height / 2};
	this.physicalInformation = {
		width: null,
		height: null,
		distance:null
	};

	this.measure = function(w, h, d) {
		this.physicalInformation.width    = w;
		this.physicalInformation.height   = h;
		this.physicalInformation.distance = d;
	}

	this.v2r = function(pixels) {
		return pixels * (this.physicalInformation.width / this.canvas.width);
	}
	this.r2v = function(meters) {
		return meters * (this.canvas.width / this.physicalInformation.width);
	}

	this.getFieldOfView = function() {
		var virtualW = Math.max(this.center.x, this.canvas.width  - this.center.x) * 2; // pixels
		var virtualH = Math.max(this.center.y, this.canvas.height - this.center.y) * 2; // pixels
		var virtualFoV = FoVCalculator.calculateFoV(
			virtualW,
			virtualH,
			this.r2v(this.physicalInformation.distance)
		);
		return Math.max.apply(null, virtualFoV);
	}

	this.showLayout = function() {
		this.hideLayout();
		var fov = this.getFieldOfView();
		var circles = [];
		for(var deg = 10; deg <= AngleConverter.radianToDegree(fov)/2; deg += 10) {
			var radius = this.r2v(this.physicalInformation.distance * Math.tan(AngleConverter.degreeToRadian(deg)));
			circles.push({center: this.center, radius: radius});
		}
		this.canvas.showLayout(circles);
	}

	this.hideLayout = function() {
		this.canvas.hideLayout();
	}

	this.showCrosshair = function() {
		var crosshair = {center: null, width: null, height: null};
		crosshair.center = this.center;
		crosshair.width = this.r2v(this.physicalInformation.distance * Math.tan(AngleConverter.degreeToRadian(0.5))) * 2;
		crosshair.height = crosshair.width;
		this.canvas.showCrosshair(crosshair);
	}
	this.hideCrosshair = function() {
		this.canvas.hideCrosshair();
	}

	this.showCharacter = function(character, directionInDegree, eccentricityInDegree, sizeInDegree) {
		character = {content: character, position: null, size: null};
		var radius = this.r2v(this.physicalInformation.distance * Math.tan(AngleConverter.degreeToRadian(eccentricityInDegree)));
		character.position = {
			x: this.center.x + radius * Math.cos(AngleConverter.degreeToRadian(directionInDegree)),
			y: this.center.y - radius * Math.sin(AngleConverter.degreeToRadian(directionInDegree))
		}
		character.size = this.r2v(this.physicalInformation.distance * Math.tan(AngleConverter.degreeToRadian(sizeInDegree)));
		console.log(character);
		this.canvas.showCharacter(character);
	}
	this.hideCharacter = function() {
		this.canvas.hideCharacter();
	}
	this.leftScrollCharacter = function(character, directionInDegree, distanceInDegree, sizeInDegree, speed) {
		character = {content: character, position: null, size: null};
		var radius = this.r2v(this.physicalInformation.distance * Math.tan(AngleConverter.degreeToRadian(distanceInDegree)));
		character.position = {
			x: this.center.x + radius * Math.cos(AngleConverter.degreeToRadian(directionInDegree)),
			y: this.center.y - radius * Math.sin(AngleConverter.degreeToRadian(directionInDegree))
		}
		// TODO: size!!
		character.size = this.r2v(this.physicalInformation.distance * Math.tan(AngleConverter.degreeToRadian(sizeInDegree)));
		console.log(character);
		this.canvas.leftScrollCharacter(character, speed);
	}
	this.rightScrollCharacter = function(character, directionInDegree, distanceInDegree, sizeInDegree, speed) {
		character = {content: character, position: null, size: null};
		var radius = this.r2v(this.physicalInformation.distance * Math.tan(AngleConverter.degreeToRadian(distanceInDegree)));
		character.position = {
			x: this.center.x + radius * Math.cos(AngleConverter.degreeToRadian(directionInDegree)),
			y: this.center.y - radius * Math.sin(AngleConverter.degreeToRadian(directionInDegree))
		}
		// TODO: size!!
		character.size = this.r2v(this.physicalInformation.distance * Math.tan(AngleConverter.degreeToRadian(sizeInDegree)));
		console.log(character);
		this.canvas.rightScrollCharacter(character, speed);
	}

}

var TrialSetting = function() {
	this.characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	this.distances = [];
	for(var i=5; i<=60; i=i+5) {
		this.distances.push(AngleConverter.degreeToRadian(i));
	}
	this.directions = [];
	for(var i=0; i<8; i++) {
		this.directions.push(i * (2 * Math.PI) / 8);
	}
}
