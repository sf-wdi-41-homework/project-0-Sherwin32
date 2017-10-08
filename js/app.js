$(document).ready(function() {

    console.log("I'm in");
    var doc = $(document);
    var carOne = $('#car-one');
    var playgroundHeight = parseInt($('#playground').css('height'));
    var playgroundWidth = parseInt($('#playground').css('width'));
    // var activeMotion = null;
    var activeMotion = {
        left: false,
        right: false,
        up: false,
        down: false
    }
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

       if ( e.which === 37 && !activeMotion.left) {
          activeMotion.left = true;
          goLeft();
       }
       if ( e.which === 39 && !activeMotion.right ) {
          activeMotion.right = true;
          goRight();
       }
       if(e.which === 38 && !activeMotion.up && teleport){
            activeMotion.up = true;
            go("up");
            
        }else if ( e.which === 38 && !activeMotion.up) {
          activeMotion.up = true;
          goUp();
       }
       if ( e.which === 40 && !activeMotion.down) {
          activeMotion.down = true;
          goDown();
       }
       
    }
    // simply ends any motion that checked activeMotion
    function stopKey(e){
        if ( e.which === 37) {
          activeMotion.left = false;
       }
       if ( e.which === 39) {
          activeMotion.right = false;
       }
       if ( e.which === 38) {
          activeMotion.up = false;
       }
       if ( e.which === 40) {
          activeMotion.down = false;
        }
        if(e.which === 77){
            teleport = false;
        }
    }
    goLeft = function(){
        if(parseInt(carOne.css('left'))>=-5)
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
        if(parseInt(carOne.css('top'))<=playgroundHeight-30)
        go("down");
    }
    turnCar = function(motion){
        if(motion.left && motion.up){
            carOne.css({ WebkitTransform: 'rotate(' + -45 + 'deg)'});
        }else if(motion.right && motion.up){
            carOne.css({ WebkitTransform: 'rotate(' + 45 + 'deg)'});
        }else if(motion.right && motion.down){
            carOne.css({ WebkitTransform: 'rotate(' + 135 + 'deg)'});
        }else if(motion.left && motion.down){
            carOne.css({ WebkitTransform: 'rotate(' + -135 + 'deg)'});
        }else if(motion.right){
            carOne.css({ WebkitTransform: 'rotate(' + 90 + 'deg)'});
        }else if(motion.up){
            carOne.css({ WebkitTransform: 'rotate(' + 0 + 'deg)'});
        }else if(motion.down){
            carOne.css({ WebkitTransform: 'rotate(' + 180 + 'deg)'});
        }else if(motion.left){
            carOne.css({ WebkitTransform: 'rotate(' + -90 + 'deg)'});
        }
    }
    go = function(direction){//left, right up down
        // console.log($('#car-one').offset())
        turnCar(activeMotion);
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
            default:
                console.log("in default")
        }   
        if(direction==="left" && activeMotion[direction]){
            setTimeout(goLeft, 10);
            // setTimeout(go("left"),10);
        }
        if(direction==="right" && activeMotion[direction]){
            setTimeout(goRight,10);
        }
        if(direction==="up" && activeMotion[direction]){
            setTimeout(goUp,10);
        }
        if(direction==="down" && activeMotion[direction]){
            setTimeout(goDown,10);
        }
    }

});