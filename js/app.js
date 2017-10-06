$(document).ready(function() {

	console.log("I'm in");
	var doc = $(document);
	var carOne = $('#car-one');
	// var activeMotion = null;
	var activeMotion = {
		left: null,
		right: null,
		up: null,
		down: null
	}

	
    
	doc.keydown( function( e ) {
		console.log(e.which);
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
		// console.log("left");
		// console.log(e.which);
		// console.log(activeMotion.left === goLeft)
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
		console.log(`inside go${direction}`);
		switch(direction){
			case "left":
				carOne.css('left', '-=2');
				break;
			case "right":
				carOne.css('left', '+=2');
				break;
			case "up":
				carOne.css('top', '-=3');
				break;
			case "down":
				carOne.css('top', '+=2');
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
		go("left");
   	}
   	goRight = function(){
		go("right");
   	}
   	goUp = function(){
		go("up");
   	}
   	goDown = function(){
		go("down");
   	}

	
	// goLeft = function(){
	// 	console.log('inside goLeft')
 //   		carOne.css( "left" , '-=1' );
 //   		if ( activeMotion.left === goLeft ) {
 //      		setTimeout( goLeft , 10 );
 //   		}
	// }
	

	/////////////////////////
	// doc.keypress(function (e) {
 //        var keyCode = e.keyCode || e.which,
 //        arrow = {left: 37, up: 38, right: 39, down: 40 };
 //        console.log("go!")

 //        switch (keyCode) {
            
 //            case arrow.left: 
 //                $('#car-one').animate({"left": "-=1px"}, "fast");
 //            break;
            
 //            case arrow.right: 
 //                $('#car-one').animate({"left": "+=1px"}, "fast");
 //            break;
 //        }
 //    });

	

//     // cache jQuery objects for performance
// var you = $( "#you" )
// , doc = $( document )

// // variable to hold motion state
// , activeMotion

// // goDown motion, adjust numbers to taste
// , goDown = function(){
//    you.css( "left" , you.css( "left" ) - 16 );
//    if ( activeMotion === goDown ) {
//       setTimeout( goDown , 10 );
//    }
// }

// doc.keydown( function( e ) {
//    if ( e.which === 37 && activeMotion !== goDown ) {
//       activeMotion = goDown;
//       goDown();
//    }
//    // all directions can go here in seperate if/else statements
//    // be sure to include "activeMotion !== goDown" else every time
//    // keydown event fires, it will start a new goDown loop.
// } );

// doc.keyup( function () {
//    // simply ends any motion that checked activeMotion
//    activeMotion = null;
// } );
	// $('.box').on('click', onClickAction);
	// $('#restartBtn').on('click', restart);
	// $('#resetScoreBtn').on('click', resetScore);

});