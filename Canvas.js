

var Canvas = function(svgElementId) {
	
	// initialization
	this.canvasId = svgElementId;
	this.width  = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 150;
	this.character = null;
	document.getElementById(this.canvasId).setAttribute("width", this.width);
	document.getElementById(this.canvasId).setAttribute("height", this.height);
	document.getElementById(this.canvasId).setAttribute("fill", "black");
	// methods
	this.getSVGElement = function() {
		return document.getElementById(this.canvasId);
	}
	this.getWidth = function() {
		return this.width;
	}
	this.getHeight = function() {
		return this.height;
	}
	this.clear = function() {
		// TODO
		;
	}
	this.drawLine = function(line) {
		var svg = this.getSVGElement();
		var e = document.createElementNS("http://www.w3.org/2000/svg", "line");
		e.setAttribute("x1", line.start.x);
		e.setAttribute("y1", line.start.y);
		e.setAttribute("x2", line.end.x);
		e.setAttribute("y2", line.end.y);
		var color = line.color || "red";
		e.setAttribute("stroke", color);
		e.setAttribute("stoke-width", 2);
		if(line.attributes) {
			for(var k in line.attributes) {
				e.setAttribute(k, line.attributes[k]);
			}
		}
		svg.appendChild(e);
	}
	this.drawCircle = function(circle) {
		var svg = this.getSVGElement();
		var e = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		e.setAttribute("cx", circle.center.x);
		e.setAttribute("cy", circle.center.y);
		e.setAttribute("r",  circle.radius);
		if(circle.attributes) {
			for(var k in circle.attributes) {
				e.setAttribute(k, circle.attributes[k]);
			}
		}
		svg.appendChild(e);
	}
	this.showLayout = function(circles) {
		for(var i=0; i<circles.length; i++) {
			var circle = circles[i];
			circle.attributes = circle.attributes || {};
			circle.attributes['stroke']       = "gray";
			circle.attributes['stroke-width'] = 2;
			circle.attributes['class']        = "layout-circles";
			circle.attributes['fill']         = "none";
			this.drawCircle(circle);
		}
	}
	this.hideLayout = function() {
		var layout_circles = document.getElementsByClassName("layout-circles");
		while(layout_circles[0]) {
			layout_circles[0].parentNode.removeChild(layout_circles[0]);
		}
	}

	this.showCrosshair = function(crosshair) {
		this.hideCrosshair();
		var left  = {x: crosshair.center.x - crosshair.width / 2, y: crosshair.center.y};
		var right = {x: crosshair.center.x + crosshair.width / 2, y: crosshair.center.y};
		var up    = {x: crosshair.center.x, y: crosshair.center.y - crosshair.height / 2};
		var down  = {x: crosshair.center.x, y: crosshair.center.y + crosshair.height / 2};
		this.drawLine({
			start: left, end: right, attributes: {"id": "display-crosshairH", "stroke-width": 5}
		});
		this.drawLine({
			start: up, end: down, attributes: {"id": "display-crosshairV", "stroke-width": 5}
		});
	}
	
	this.hideCrosshair = function() {
		var e1 = document.getElementById("display-crosshairH");
		var e2 = document.getElementById("display-crosshairV");
		if(e1)
			e1.parentNode.removeChild(e1);
		if(e2)
			e2.parentNode.removeChild(e2);
	}

	this.showCharacter = function(character) {
		var e = document.getElementById("display-character");
		if(!e) {
			var svg = this.getSVGElement();
			e = document.createElementNS("http://www.w3.org/2000/svg", "text");
			e.setAttribute('id', 'display-character')
			svg.appendChild(e);
			e = document.getElementById('display-character');
		}
		e.setAttribute('x', character.position.x);
		e.setAttribute('y', character.position.y);
		e.setAttribute('font-size', character.size);
		e.setAttribute('fill', 'white');
		e.setAttribute('text-anchor', "middle");
		e.setAttribute('dominant-baseline', "mathematical");
		e.innerHTML = character.content;
		if(character.attributes) {
			for(var k in character.attributes) {
				e.setAttribute(k, character.attributes[k]);
			}
		}
		if(character.animation) {
			console.log("animation not implemented yet!!!");
		}
	}

	this.hideCharacter = function() {
		var e = document.getElementById("display-character");
		e.parentNode.removeChild(e);
	}
	this.rightScrollCharacter = function(character, speed){
		var e = document.getElementById("display-character");
		if(!e) {
			var svg = this.getSVGElement();
			e = document.createElementNS("http://www.w3.org/2000/svg", "text");
			e.setAttribute('id', 'display-character')
			svg.appendChild(e);
			e = document.getElementById('display-character');
		}
		// console.log(this.width)
		e.setAttribute('x', this.width);
		e.setAttribute('y', character.position.y);
		e.setAttribute('font-size', character.size);
		e.setAttribute('fill', 'white');
		e.setAttribute('text-anchor', "middle");
		e.setAttribute('dominant-baseline', "mathematical");
		e.innerHTML = character.content + '<animate xlink:href="#display-character" attributeName="x" from="'+ (this.width) +'" to="'+ (character.position.x) +'" begin="indefinite" dur="0.2s" fill="freeze" sid="move"/>';
		// registerAnimation(e.childNodes[1])
		e.childNodes[1].beginElement();
	}
	this.leftScrollCharacter = function(character, speed){
		var e = document.getElementById("display-character");
		if(!e) {
			var svg = this.getSVGElement();
			e = document.createElementNS("http://www.w3.org/2000/svg", "text");
			e.setAttribute('id', 'display-character')
			svg.appendChild(e);
			e = document.getElementById('display-character');
		}
		// console.log(this.width)
		e.setAttribute('x', this.width);
		e.setAttribute('y', character.position.y);
		e.setAttribute('font-size', character.size);
		e.setAttribute('fill', 'white');
		e.setAttribute('text-anchor', "middle");
		e.setAttribute('dominant-baseline', "mathematical");
		e.innerHTML = character.content + '<animate xlink:href="#display-character" attributeName="x" from="'+ 0 +'" to="'+ (character.position.x) +'" begin="indefinite" dur="0.2s" fill="freeze" sid="move"/>';
		// registerAnimation(e.childNodes[1])
		e.childNodes[1].beginElement();
	}

	function registerAnimation(anim) {
	    var targets = getTargets(anim);
	    var elAnimators = new Array();
	    for(var i=0; i<targets.length ;i++) {
	      var target = targets[i];
	      var animator = new Animator(anim, target, i);
	      animators.push(animator);
	      elAnimators[i] = animator;
	    }
	    anim.animators = elAnimators;
	    var id = anim.getAttribute("id");
	    if (id)
	      id2anim[id] = anim;
	    for(var i=0; i<elAnimators.length ;i++)
	      elAnimators[i].register();
	}
}

