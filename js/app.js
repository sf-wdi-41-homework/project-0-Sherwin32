$(document).ready(function() {

	console.log("I'm in");
	var doc = $(document);
	var carOne = $('#car-one');
	var playgroundHeight = parseInt($('#playground').css('height'));
	var playgroundWidth = parseInt($('#playground').css('width'));
	// var activeMotion = null;
	var activeMotion = {
		left: null,
		right: null,
		up: null,
		down: null
	}

	
    
	doc.keydown( function( e ) {
		// console.log(e.which);
		/* 
		<: 37
		>: 39
		^: 38
		v: 40  
		a: 65  <
		d: 68  >
		w: 87  ^
		s: 83  v
		*/
	   if ( e.which === 37 && activeMotion.left !== goLeft ) {
	      activeMotion.left = goLeft;
	      goLeft();
	   }
	   if ( e.which === 39 && activeMotion.right !== goRight ) {
	      activeMotion.right = goRight;
	      goRight();
	   }
	   if ( e.which === 38 && activeMotion.up !== goUp ) {
	      activeMotion.up = goUp;
	      goUp();
	   }
	   if ( e.which === 40 && activeMotion.down !== goDown ) {
	      activeMotion.down = goDown;
	      goDown();
	   }
	   doc.on('keyup',stopMotion);
	});
	// simply ends any motion that checked activeMotion
	function stopMotion(e){
		if ( e.which === 37) {
	      activeMotion.left = null;
	   }
	   if ( e.which === 39) {
	      activeMotion.right = null;
	   }
	   if ( e.which === 38) {
	      activeMotion.up = null;
	   }
	   if ( e.which === 40) {
	      activeMotion.down = null;
		}
	}
	function go(direction){//left, right up down
		// console.log(`inside go${direction}`);
		switch(direction){
			case "left":
				carOne.css('left', '-=3');
				break;
			case "right":
				carOne.css('left', '+=3');
				break;
			case "up":
				carOne.css('top', '-=3');
				break;
			case "down":
				carOne.css('top', '+=3');
				break;
		}	
		if(activeMotion[direction]===goLeft){
			setTimeout(goLeft,10);
		}
		if(activeMotion[direction]===goRight){
			setTimeout(goRight,10);
		}
		if(activeMotion[direction]===goUp){
			setTimeout(goUp,10);
		}
		if(activeMotion[direction]===goDown){
			setTimeout(goDown,10);
		}
	}
	goLeft = function(){
		if(parseInt(carOne.css('left'))>=0)
		go("left");
   	}
   	goRight = function(){
   		if(parseInt(carOne.css('left'))<=playgroundWidth-20)
		go("right");
   	}
   	goUp = function(){
   		if(parseInt(carOne.css('top'))>=0)
		go("up");
   	}
   	goDown = function(){
   		if(parseInt(carOne.css('top'))<=playgroundHeight-20)
		go("down");
   	}


});