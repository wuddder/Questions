
var UserStudy1 = function(experiment) {
	this.experiment = experiment; // all experiment-related utilities



	// ===== remote logging ===== //
	this.remoteLog = function(msg) {
		var url = "http://w.csie.org/~r05922103/logger/logger.php?secret=ji394mike&&content=" + msg;
		doAJAX('GET', url, null, function(){console.log("ke ke");});
	}

	// ===== p2p connection ===== //
	this.send = null;
	this.setSendFunction = function(func) {
		this.send = func;
	}

	// pilot study configuration
	// var socket = new WebSocket("ws://localhost:8080", "echo-protocol");;
	this.dirNum = 0;
	this.eccNum = 0;
	this.sizeNum = 2;
	this.characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	this.trailNum = 20;
	this.directions = [0, 45, 90, 135, 180, 225, 270, 315];
	// this.eccentricities = [10, 20, 30, 40, 50];
	this.eccentricities = [5, 10];
	// this.startSizes = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];
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
	// start the pilot study
	this.start = function() {

		if(!this.measuredAlready) {
			this.measure(0.36, 0.16, 0.9);
		}
		this.randomNum = Math.floor((Math.random() * this.characterSet.length));
		this.shuffledSet = shuffle(this.characterSet);
		this.startTime = getCurrentTimeString();
		// console.log("UserStudy started. (" + this.startTime + ")");
		this.remoteLog("UserStudy started. (" + this.startTime + ")");
		this.experiment.showCrosshair();
		// socket.addEventListener("message", function(event) {
  //       	console.log(event.data);
  //       	if(event.data == 'yes')
  //       		self.nextCharacter('yes');
  //       	else
  //       		self.nextCharacter('no');
  //       });
		/*
		for timing use
		*/
		var c = this.shuffledSet[this.randomNum];
		this.report += ((new Date()).getTime() + " showing " + c + "\n");
		this.send(c);
		/*
		for timing use end
		*/
		this.experiment.showCharacter(c, this.directions[this.dirNum], this.eccentricities[this.eccNum], this.startSizes[this.sizeNum]);
	}
	this.yesRestart = function() {
		if(this.counter.state == 2){
			this.report += "eccentricities: "+this.eccentricities[this.eccNum]+", direction: "+ this.directions[this.dirNum]+", font-size: "+this.startSizes[this.sizeNum]+"\n";
			console.log(this.report);
			this.remoteLog(this.report);
			this.dirNum += 1;
			if(this.dirNum == 8)
				this.nextRound();
			this.counter.state = 0;
			this.shuffleAndShow();
		}
		else{
			this.counter.state = 1;
			this.sizeNum -= 1;
			this.shuffleAndShow();
		}
	}
	this.noRestart = function() {
		if(this.counter.state == 1){
			this.report += "eccentricities: "+this.eccentricities[this.eccNum]+", direction: "+ this.directions[this.dirNum]+", font-size: "+this.startSizes[this.sizeNum+1]+"\n";
			console.log(this.report);
			this.remoteLog(this.report);
			this.dirNum += 1;
			if(this.dirNum == 8)
				this.nextRound();
			this.counter.state = 0;
			this.sizeNum += 1;
			this.shuffleAndShow();
		}
		else{
			this.counter.state = 2;
			this.sizeNum += 1;
			this.shuffleAndShow();
		}
	}

	// end the pilot study
	this.end = function() {
		// console.log(this.report);
		this.remoteLog(this.report);
	}
	this.nextRound = function() {
		alert("Time to rest");
		if(this.eccNum == 4)
			this.end();
		this.eccNum += 1;
		this.dirNum = 0;
		switch(this.eccNum){
			case 1:
				this.sizeNum = 2;
				break;
			case 2:
				this.sizeNum = 4;
				break;
			case 3: 
				this.sizeNum = 6;
				break;
			case 4:
				this.sizeNum = 8;
				break;
		}
	}
	this.nextCharacter = function(see) {
		/*
		for timing use
		*/
		this.report += ((new Date()).getTime() + " " + see + "\n");
		/*
		for timing use end
		*/

		this.counter.counter += 1 ;
		//console.log("counter= "+this.counter.counter+" yes: "+this.counter.yes+"no: "+ this.counter.no);
		if (see == 'yes'){
			this.counter.yes = this.counter.yes + 1;
			if(this.counter.yes >= this.trailNum * this.threshold) {
				this.counter.no = 0;
				this.counter.counter = 0;
				this.counter.yes = 0;
				this.yesRestart();
			}
			else {
				/*
				for timing use
				*/
				this.randomNum = Math.floor((Math.random() * this.characterSet.length));
				var c = this.shuffledSet[this.randomNum];
				this.report += ((new Date()).getTime() + " showing " + c + "\n");
				console.log(this.report);
				this.remoteLog(this.report);
				this.send(c);
				this.report = ""
				/*
				for timing use end
				*/
				this.experiment.showCharacter(c, this.directions[this.dirNum], this.eccentricities[this.eccNum], this.startSizes[this.sizeNum]);
			}
		}
		else if (see == 'no'){
			this.counter.no = this.counter.no + 1;
			//console.log(this.counter.no + " " + this.trailNum - (this.trailNum * this.threshold));
			if(this.counter.no > this.trailNum - (this.trailNum * this.threshold)){ 
				this.counter.yes = 0;
				this.counter.counter = 0;
				this.counter.no = 0;
				this.noRestart();
			}
			else {
				/*
				for timing use
				*/
				this.randomNum = Math.floor((Math.random() * this.characterSet.length));
				var c = this.shuffledSet[this.randomNum];
				this.report += ((new Date()).getTime() + " showing " + c + "\n");
				this.send(c);
				console.log(this.report);
				this.remoteLog(this.report);
				this.report = "";
				/*
				for timing use end
				*/
				this.experiment.showCharacter(c, this.directions[this.dirNum], this.eccentricities[this.eccNum], this.startSizes[this.sizeNum]);
			}
		}
	}
	this.shuffleAndShow = function(){
		//this.shuffledSet = shuffle(this.shuffledSet);
		/*
		for timing use
		*/
		this.randomNum = Math.floor((Math.random() * this.characterSet.length));
		var c = this.shuffledSet[this.counter.counter];
		this.report += ((new Date()).getTime() + " showing " + c + "\n");
		this.send(c);
		/*
		for timing use end
		*/
		this.experiment.showCharacter(c, this.directions[this.dirNum], this.eccentricities[this.eccNum], this.startSizes[this.sizeNum]);
	}

	this.showLayout = function() {
		this.experiment.showLayout();
	}
	
	function doAJAX(method, url, data, funcOnSuc, asyncOrNot) {
		// asyncOrNot is an optional parameter
		if(asyncOrNot == undefined)
			asyncOrNot = true; // default asynchronous!
		var req;
		if(window.XMLHttpRequest) {
			// for IE7+, Firefox, Chrome, Opera, Safari
			req = new XMLHttpRequest();
		}
		else{
			// for IE6- and ... worse
			req = new ActiveXObject("Microsoft.XMLHTTP");
		}
		req.onreadystatechange = function() {
			if(req.readyState == 4 && req.status == 200) { // success
				var res = req.responseText;
				for(var i=0; i<res.length; i++) {
					if(res[i] != "" && res[i] != "\n" && res[i] != "\r")
						break;
				}
				res = res.substring(i);
				funcOnSuc(res);
			}
		}
		if(method == "GET") {
			req.open("GET", url, asyncOrNot);
			req.send();
		}
		else if(method == "POST") {
			req.open("POST", url, asyncOrNot);
			//req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			req.send(data);
		}
		else {
			console.log("doAJAX(): ERROR!!");
		}
	}


}
