
var UserStudy2 = function(experiment) {
	this.experiment = experiment; // all experiment-related utilities
	this.dirNum = 0;
	this.eccNum = 0;
	this.sizeNum = 0;
	this.characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	this.trailNum = 5;
	this.directions = [315];
	this.eccentricities = [5];
	this.cpms = [150, 250, 350];
	this.speedNum = 0;
	// this.startSizes = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];
	this.startSizes = [1,2,5];
	this.startTime = null;
	this.measuredAlready = false;
	this.shuffledSet = [];
	this.counter = {counter:0, yes:0, no:0,  state: 0};
	this.threshold = 0.8;
	this.report = "";
	this.randomNum;
	var boolReport = true;
	var speedCount = 0;
	var wordCount = 0;
	var characterCount = 1;
	var wordCount = 0;
	var myVar;
	var myVar1;
	var warmupcounter = 0;
	var previousWord;
	var firstTime = true;
	var buttomAvailable = true;
	// var socket = new WebSocket("ws://localhost:8080", "echo-protocol");;
	this.cpm = 300;
	this.testWord = 'APPLE';
	this.pilot = ["WOULD YOU GO TONIGHT?", "WE DON'T HAVE IT", "I WILL TALK TO YOU LATER.", "SORRY, MY BAD", "WHEN DO YOU HAVE TIME FOR THIS?", "YEA NO MATTER WHAT", "OK, LET'S DO IT", "THANK YOU VERY MUCH!", "OH, I FORGOT TO BRING IT", "IT'S VERY INTERESTING!"];
	this.warmUpSentence = ["AN APPLE A DAY KEEPS THE DOCTOR AWAY", "WE DON'T HAVE IT", "I WILL TALK TO YOU LATER.", "SORRY, MY BAD", "WHEN DO YOU HAVE TIME FOR THIS?", "YEA NO MATTER WHAT", "OK, LET'S DO IT", "THANK YOU VERY MUCH!", "OH, I FORGOT TO BRING IT", "IT'S VERY INTERESTING!"];
	this.testSentence = "THE BEAUTY IS IN THE EYES OF BEHOLDER"
	var self = this;
	this.remoteLog = function(msg) {
		var url = "http://w.csie.org/~r05922103/logger/logger.php?secret=ji394mike&&content=" + msg;
		doAJAX('GET', url, null, function(){console.log("keke");});
	}
	this.send = null;
	this.setSendFunction = function(func) {
		this.send = func;
	}
	doAJAX('GET', 'https://raw.githubusercontent.com/sycLin/PeripheralVision/master/jsonData_userStudy1/Sentence_1.txt?token=AVWzeLAD6VR4OQHsIaxQgAAy4MjgFlurks5YnlJjwA%3D%3D', null, function(res) {
    		//console.log('GOT RESPONSE: ' + res);
    		sentences = res;
    		self.totalSentences = JSON.parse(res);
    	})
	this.measure = function(w, h, d) {
		this.experiment.measure(w, h, d);
		this.measuredAlready = true;
	}
	this.cpmSet = function(number){
		switch (number)
		{
			case 1:
				this.cpm = 150;
				break;
			case 2:
				this.cpm = 250;
				break;
			case 3:
				this.cpm = 350;
				break;	
		}
		this.speed = 60000 / this.cpm;
		console.log(this.speed);
	}
	this.pilotStudy = function(){
		if(!this.measuredAlready) {
			this.measure(0.36, 0.16, 0.9);
		}
		this.experiment.showCrosshair();
		characterCount = 1;
		wordCount = 0;
		this.eccentricities = [5];
		pilotSentence = this.pilot[warmupcounter%10];
		this.displaySentence(pilotSentence);
		warmUpSentence = false;
		warmupcounter = warmupcounter + 1;
		this.speed = 60000 / this.cpm;
		console.log(this.speed);
	}
	this.phase2 = function(){
		if(!this.measuredAlready) {
			this.measure(0.36, 0.16, 0.9);
		}
		this.experiment.showCrosshair();
		characterCount = 1;
		wordCount = 0;
		this.eccentricities = [5];
		warmUpSentence = this.warmUpSentence[warmupcounter%10];
		this.displaySentence(warmUpSentence);
		warmupcounter = warmupcounter + 1;
		this.cpm = 300;
		this.speed = 60000 / this.cpm;
		console.log(this.speed);
	}
	this.warmup = function(){
		if(!this.measuredAlready) {
			this.measure(0.36, 0.16, 0.9);
		}
		this.experiment.hideCrosshair();
		characterCount = 1;
		wordCount = 0;
		this.eccentricities = [0];
		warmUpSentence = this.warmUpSentence[warmupcounter%10];
		this.displaySentence(warmUpSentence);
		warmupcounter = warmupcounter + 1;
		this.cpm = 300;
		this.speed = 60000 / this.cpm;
		console.log(this.speed);
		console.log(this.cpms[this.speedNum % 3]);
	}
	this.start = function() {
		this.experiment.hideLayout();
		if(!this.measuredAlready) {
			this.measure(0.36, 0.16, 0.9);
		}
		characterCount = 1;
		wordCount = 0;
		this.eccentricities = [5];
		console.log(this.wordLength);
		this.startTime = getCurrentTimeString();
		console.log("UserStudy started. (" + this.startTime + ")");
		this.experiment.showCrosshair();
		this.randomNum = 0;
		// socket.addEventListener("message", function(event) {
  //       	console.log(event.data);
  //       	if(event.data == 'yes')
  //       		self.nextCharacter('yes');
  //       	else
  //       		self.nextCharacter('no');

  //       });
		this.testSentence = this.totalSentences[this.randomNum].split("\\");
		this.testSentence = this.experiment.shuffledSet(this.testSentence);
		this.testSentence = this.testSentence[0];
		this.outputSentence = this.testSentence.toUpperCase();
		console.log(this.outputSentence);
		this.send(this.outputSentence);
		this.displaySentence(this.outputSentence);
		this.speed = 60000 / this.cpms[this.speedNum %3];
	}
	this.end = function() {
		console.log(this.report);
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
		boolReport = true;
		this.report += (" See= "+see + "\n")
		console.log(this.report);
		this.remoteLog(this.report);	
		this.report = " ";
		speedCount += 1;
		if(speedCount == 5){
			speedCount = 0;
			this.speedNum ++;
			if(this.speedNum % 3 == 0){
				this.sizeNum ++;
				this.speedNum = 0;
				if(this.sizeNum == 3){
					this.dirNum += 1;
					this.sizeNum = 0;
					alert("Done!");
				}
			}
		}
		this.speed = 60000 / this.cpms[this.speedNum %3];
		console.log(this.speed);
		this.shuffleAndShow();
		
	}
	this.shuffleAndShow = function(){
		wordCount = 0;
		this.randomNum ++;
		this.testSentence = this.totalSentences[this.randomNum].split("\\");
		this.testSentence = this.testSentence[0];
		this.outputSentence = this.testSentence.toUpperCase();
		console.log(this.outputSentence);
		this.send(this.outputSentence);
		this.displaySentence(this.outputSentence);
	}
	this.displaySentence = function(sentence){
		if(boolReport){
			this.report += ("Sentence ="+ sentence +"\n Size= "+this.startSizes[this.sizeNum]+" Speed="+this.cpms[this.speedNum%3]+" Direction="+this.directions[this.dirNum]);
			console.log(this.report);
			boolReport = false;
		}
		var words = sentence.split(" ");
		if(wordCount < words.length){
			this.displayWord(words[wordCount]);
			wordCount++;
		}
	}
	this.displayWord = function(word1) {
		var consecutive = false;
		var word = "";
		this.wordLength = word1.length;
		for(var i = 0; i < word1.length; i ++){
			word += word1[i];
			if(word1[i] == word1[i + 1]){
				word += " ";
			}
		}
		console.log("word = "+ word);
		word += " ";
		this.wordLength = word.length;
		if(this.directions[this.dirNum] > 90 && this.directions[this.dirNum] < 270){
			this.experiment.leftScrollCharacter(word[0], this.directions[this.dirNum], this.eccentricities[this.eccNum],  this.startSizes[this.sizeNum], this.speed);
		}
		else{
			this.experiment.rightScrollCharacter(word[0], this.directions[this.dirNum], this.eccentricities[this.eccNum],   this.startSizes[this.sizeNum], this.speed);
		}
		if(firstTime){
			setTimeout(function(){myVar = setInterval(function(){ self.showMyCharacter(word); }, self.speed);}, this.speed);
			firstTime = false;
		}
		else
			setTimeout(function(){myVar1 = setInterval(function(){ self.showMyCharacter(word); }, self.speed);}, this.speed);
	}	
	this.showMyCharacter = function(word){
		if(this.wordLength != 1)
			this.experiment.showCharacter(word[characterCount], this.directions[this.dirNum], this.eccentricities[this.eccNum],  this.startSizes[this.sizeNum]);
		console.log(word[characterCount]);
		characterCount ++ ;
		if (characterCount >= this.wordLength){
			characterCount = 1;
			clearInterval(myVar);
			if(!firstTime)
				clearInterval(myVar1);
			if(self.outputSentence){
				setTimeout(function(){self.displaySentence(self.outputSentence);},this.speed);	
			}
			else if(warmUpSentence){
				setTimeout(function(){self.displaySentence(warmUpSentence);},this.speed);	
			}
			else if(pilotSentence){
				//this.displaySentence(pilotSentence);
				setTimeout(function(){self.displaySentence(pilotSentence);},this.speed);	
			}
		}
	}
	this.showLayout = function() {
		this.experiment.showLayout();
	}
	this.nextDirection = function(){
		this.dirNum += 1;
	}
	this.previousDirection = function(){
		this.dirNum -= 1;
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
