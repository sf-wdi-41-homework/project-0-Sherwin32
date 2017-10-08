$(document).ready(function() {

    console.log("I'm in");
    var doc = $(document);
    var carOne = $('#car-one');
    var carTwo = $('#car-two');
    var playgroundHeight = parseInt($('#playground').css('height'));
    var playgroundWidth = parseInt($('#playground').css('width'));
    // var activeMotion = null;
    var activeMotion = [{
        left: false,    //motion for carOne
        right: false,
        up: false,
        down: false
    },{                 //motion for carTwo
        left: false,
        right: false,
        up: false,
        down: false
    }];
    var teleport = false;

    doc.on('keyup',stopKey);
    
    doc.on('keydown',moveKey);
    doc.on('keydown',teleportKey);

    function teleportKey(e){
        if(e.which===77){ //m
        teleport = true;
    }
    }

    function moveKey(e) {
        console.log(e.which);
        /* 
        <: 37 >: 39 ^: 38 v: 40  
        a: 65 d: 68 w: 87 s: 83
        */

       if ( e.which === 37 && !activeMotion[0].left) {
          activeMotion[0].left = true;
          goLeft(carOne);
       }
       if ( e.which === 39 && !activeMotion[0].right ) {
          activeMotion[0].right = true;
          goRight(carOne);
       }
       if(e.which === 38 && !activeMotion[0].up && teleport){
            activeMotion[0].up = true;
            go("up", carOne);
            
        }else if ( e.which === 38 && !activeMotion[0].up) {
          activeMotion[0].up = true;
          goUp(carOne);
       }
       if ( e.which === 40 && !activeMotion[0].down) {
          activeMotion[0].down = true;
          goDown(carOne);
       }
              if ( e.which === 65 && !activeMotion[1].left) {
          activeMotion[1].left = true;
          goLeft(carTwo);
       }
       if ( e.which === 68 && !activeMotion[1].right ) {
          activeMotion[1].right = true;
          goRight(carTwo);
       }
       if(e.which === 87 && !activeMotion[1].up && teleport){
            activeMotion[1].up = true;
            go("up", carTwo);
            
        }else if ( e.which === 87 && !activeMotion[1].up) {
          activeMotion[1].up = true;
          goUp(carTwo);
       }
       if ( e.which === 83 && !activeMotion[1].down) {
          activeMotion[1].down = true;
          goDown(carTwo);
       }


       
    }
    // simply ends any motion that checked activeMotion
    function stopKey(e){
        if ( e.which === 37) {
          activeMotion[0].left = false;
       }
       if ( e.which === 39) {
          activeMotion[0].right = false;
       }
       if ( e.which === 38) {
          activeMotion[0].up = false;
       }
       if ( e.which === 40) {
          activeMotion[0].down = false;
        }
        if ( e.which === 65) {
          activeMotion[1].left = false;
       }
       if ( e.which === 68) {
          activeMotion[1].right = false;
       }
       if ( e.which === 87) {
          activeMotion[1].up = false;
       }
       if ( e.which === 83) {
          activeMotion[1].down = false;
        }
        if(e.which === 77){
            teleport = false;
        }
    }
    goLeft = function(carIn){
        if(parseInt(carIn.css('left'))>=-5)
        go("left", carIn);
    }
    goRight = function(carIn){
        if(parseInt(carIn.css('left'))<=playgroundWidth-20)
        go("right", carIn);
    }
    goUp = function(carIn){
        if(parseInt(carIn.css('top'))>=0)
        go("up", carIn);
    }
    goDown = function(carIn){
        if(parseInt(carIn.css('top'))<=playgroundHeight-30)
        go("down", carIn);
    }
    turnCar = function(motion, carIn){
        if(motion.left && motion.up){
            carIn.css({ WebkitTransform: 'rotate(' + -45 + 'deg)'});
        }else if(motion.right && motion.up){
            carIn.css({ WebkitTransform: 'rotate(' + 45 + 'deg)'});
        }else if(motion.right && motion.down){
            carIn.css({ WebkitTransform: 'rotate(' + 135 + 'deg)'});
        }else if(motion.left && motion.down){
            carIn.css({ WebkitTransform: 'rotate(' + -135 + 'deg)'});
        }else if(motion.right){
            carIn.css({ WebkitTransform: 'rotate(' + 90 + 'deg)'});
        }else if(motion.up){
            carIn.css({ WebkitTransform: 'rotate(' + 0 + 'deg)'});
        }else if(motion.down){
            carIn.css({ WebkitTransform: 'rotate(' + 180 + 'deg)'});
        }else if(motion.left){
            carIn.css({ WebkitTransform: 'rotate(' + -90 + 'deg)'});
        }
    }
    checkTouch = function(carIn){
        var checkTop = (parseInt(carIn.offset().top) >= parseInt($('.chute').offset().top));
        var checkBottom = (parseInt(carIn.offset().top+30)) <= parseInt($('.chute').offset().top+50)
        var checkLeft = (parseInt(carIn.offset().left) >= parseInt($('.chute').offset().left));
        var checkRight = (parseInt(carIn.offset().left+30)) <= parseInt($('.chute').offset().left+50)
        if(checkBottom && checkTop && checkLeft && checkRight){
            if(carIn===carOne){
                $('#score-one').text((parseInt($('#score-one').text())+1));
            }else if(carIn===carTwo){
                $('#score-two').text((parseInt($('#score-two').text())+1));
            }
            // console.log("KKKKKKKKKKK")
        }
    }
    go = function(direction, carIn){//left, right up down
        // console.log($('#car-one').offset())
        // console.log(carOne.offset().left)
        // console.log(1, $('#w1').offset().left)
        // console.log(2, carIn.offset().left+30)
        // console.log(chute.offset())
        checkTouch(carIn);
        if(carIn.offset().left+20 === $('#w1').offset().left){
            console.log("sss")

        }

        var motionSelector;
        if(carIn===carOne){
            motionSelector = activeMotion[0];
        }else if(carIn===carTwo){
            motionSelector = activeMotion[1];
        }
        turnCar(motionSelector, carIn);
        switch(direction){
            case "left":
                carIn.css('left', '-=1');
                break;
            case "right":
                carIn.css('left', '+=1');
                break;
            case "up":
                carIn.css('top', '-=1');
                break;
            case "down":
                carIn.css('top', '+=1');
                break;
            default:
                console.log("in default")
        }   
        if(direction==="left" && motionSelector[direction]){
            setTimeout(function() {
                goLeft(carIn);
            }, 3);
            // setTimeout(go("left"),10);
        }
        if(direction==="right" && motionSelector[direction]){
            setTimeout(function() {
                goRight(carIn);
            }, 3);
        }
        if(direction==="up" && motionSelector[direction]){
            setTimeout(function() {
                goUp(carIn);
            }, 3);
        }
        if(direction==="down" && motionSelector[direction]){
            setTimeout(function() {
                goDown(carIn);
            }, 3);
        }
    }
    //cache a few static values
var box = $('#playground');
var width = box.width();
var height = box.height();
var chute = $('.chute');

//our main animation "loop"

foo = function(){
    var top = (Math.random() * height);
    var left = (Math.random() * width);
    var time = Math.random() * 3000;
    chute.animate({
        left: left,
        top: top
    }, time, foo);
}

foo();

// chute.each(function foo() {

//     // console.log(chute.offset())

//     //generate random values
//     var top = (Math.random() * height) | 0;
//     var left = (Math.random() * width) | 0;
//     var time = Math.random() * 3000 | 0;

//     //animate
//     //we introduce a random value so that they aren't moving together
//     //after the animation, we call foo for the current element
//     //to animate the current element again
//     $(this).animate({
//         left: left,
//         top: top
//     }, time, foo);
// });
});

