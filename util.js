
var AngleConverter = AngleConverter || {};

AngleConverter.degreeToRadian = function(deg) {
	return deg * Math.PI / 180;
}

AngleConverter.radianToDegree = function(rad) {
	return rad * 180.0 / Math.PI;
}

// ================================================== //


var FoVCalculator = FoVCalculator || {};

FoVCalculator.calculateFoV = function(width, height, distance) {
	var fovH = 2 * Math.atan2(width,  2 * distance);
	var fovV = 2 * Math.atan2(height, 2 * distance);
	return [fovH, fovV];
}


// ================================================== //

function getCurrentTimeString() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var hours = ("0" + d.getHours()).slice(-2);
	var minutes = ("0" + d.getMinutes()).slice(-2);
	return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
}

function shuffle(a) {
	// console.log("shuffled");
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    
    return a;

}
