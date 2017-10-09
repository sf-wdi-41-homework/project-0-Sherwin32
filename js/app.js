$(document).ready(function() {

    console.log("I'm in");
    var doc = $(document);
    var carOne = $('#car-one');
    var carTwo = $('#car-two');
    var playgroundHeight = parseInt($('#playground').css('height'));
    var playgroundWidth = parseInt($('#playground').css('width'));
    //Boolean that tells if the game has ended.
    var isEnd = false;
    //This thing here controls the ability for two cars to move
    var activeMotion = [{
        left: false, //motion for carOne
        right: false,
        up: false,
        down: false
    }, { //motion for carTwo
        left: false,
        right: false,
        up: false,
        down: false
    }];

    doc.on('keyup', stopKey);
    doc.on('keydown', moveKey);
    $('#restartBtn').on('click', restart);

    //this is the restart function. Called when page is refreshed and when the restart btn is clicked
    function restart() {
        var status = $('#status-display');
        status.removeClass('indinite rubberBand');
        status.addClass('bounce');
        carOne.css({top: 350,left: 820});
        carTwo.css({top: 350,left: 50});
        carOne.css({WebkitTransform: 'rotate(' + 0 + 'deg)'});
        carTwo.css({WebkitTransform: 'rotate(' + 0 + 'deg)'});
        status.text('3');
        setTimeout(function() {
            status.removeClass('bounce').addClass('swing');
            $('#header').removeClass('tada');
            status.text('2')
            setTimeout(function() {
                status.removeClass('swing').addClass('flip');
                status.text('1')
                setTimeout(function() {
                    status.removeClass('flip').addClass('bounce');
                    status.text('GO!')
                    isEnd = true; // To stop the current moveSnitch function
                    isEnd = false;
                    $('#score-one').text('0.00');
                    $('#score-two').text('0.00');
                    moveSnitch();
                    listenerSwitch();
                    setTimeout(function() {
                        status.text('Car Race!!!')
                        setTimeout(function() {
                            status.removeClass('bounce');
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)


    }

    function listenerSwitch() {
        if (isEnd) {
            doc.off('keydown', moveKey);
            doc.off('keyup', stopKey);
        } else {
            doc.on('keydown', moveKey);
            doc.on('keyup', stopKey);
        }
    }
    //listener to catch the moving keys
    function moveKey(e) {
        /* 
        <: 37 >: 39 ^: 38 v: 40  
        a: 65 d: 68 w: 87 s: 83
        */
        e.preventDefault();
        if (e.which === 37 && !activeMotion[0].left) {
            activeMotion[0].left = true;
            goLeft(carOne);
        }
        if (e.which === 39 && !activeMotion[0].right) {
            activeMotion[0].right = true;
            goRight(carOne);
        }
        if (e.which === 38 && !activeMotion[0].up) {
            activeMotion[0].up = true;
            goUp(carOne);
        }
        if (e.which === 40 && !activeMotion[0].down) {
            activeMotion[0].down = true;
            goDown(carOne);
        }
        if (e.which === 65 && !activeMotion[1].left) {
            activeMotion[1].left = true;
            goLeft(carTwo);
        }
        if (e.which === 68 && !activeMotion[1].right) {
            activeMotion[1].right = true;
            goRight(carTwo);
        }
        if (e.which === 87 && !activeMotion[1].up) {
            activeMotion[1].up = true;
            goUp(carTwo);
        }
        if (e.which === 83 && !activeMotion[1].down) {
            activeMotion[1].down = true;
            goDown(carTwo);
        }
    }
    // simply ends any motion that checked activeMotion
    function stopKey(e) {
        if (e.which === 37) {
            activeMotion[0].left = false;
        }
        if (e.which === 39) {
            activeMotion[0].right = false;
        }
        if (e.which === 38) {
            activeMotion[0].up = false;
        }
        if (e.which === 40) {
            activeMotion[0].down = false;
        }
        if (e.which === 65) {
            activeMotion[1].left = false;
        }
        if (e.which === 68) {
            activeMotion[1].right = false;
        }
        if (e.which === 87) {
            activeMotion[1].up = false;
        }
        if (e.which === 83) {
            activeMotion[1].down = false;
        }
        if (e.which === 77) {
            teleport = false;
        }
    }
    var goLeft = function(carIn) {
        if (parseInt(carIn.css('left')) >= -5 && !isEnd)
            go("left", carIn);
    }
    var goRight = function(carIn) {
        if (parseInt(carIn.css('left')) <= playgroundWidth - 20 && !isEnd)
            go("right", carIn);
    }
    var goUp = function(carIn) {
        if (parseInt(carIn.css('top')) >= 0 && !isEnd)
            go("up", carIn);
    }
    var goDown = function(carIn) {
        if (parseInt(carIn.css('top')) <= playgroundHeight - 30 && !isEnd)
            go("down", carIn);
    }
    var turnCar = function(motion, carIn) {
        if (motion.left && motion.up) {
            carIn.css({
                WebkitTransform: 'rotate(' + -45 + 'deg)'
            });
        } else if (motion.right && motion.up) {
            carIn.css({
                WebkitTransform: 'rotate(' + 45 + 'deg)'
            });
        } else if (motion.right && motion.down) {
            carIn.css({
                WebkitTransform: 'rotate(' + 135 + 'deg)'
            });
        } else if (motion.left && motion.down) {
            carIn.css({
                WebkitTransform: 'rotate(' + -135 + 'deg)'
            });
        } else if (motion.right) {
            carIn.css({
                WebkitTransform: 'rotate(' + 90 + 'deg)'
            });
        } else if (motion.up) {
            carIn.css({
                WebkitTransform: 'rotate(' + 0 + 'deg)'
            });
        } else if (motion.down) {
            carIn.css({
                WebkitTransform: 'rotate(' + 180 + 'deg)'
            });
        } else if (motion.left) {
            carIn.css({
                WebkitTransform: 'rotate(' + -90 + 'deg)'
            });
        }
    }
    //To check if cars are inside the snitch
    var checkTouch = function(carIn) {
        var checkTop = (parseInt(carIn.offset().top) >= parseInt($('.snitch').offset().top));
        var checkBottom = (parseInt(carIn.offset().top + 30)) <= parseInt($('.snitch').offset().top + 50)
        var checkLeft = (parseInt(carIn.offset().left) >= parseInt($('.snitch').offset().left));
        var checkRight = (parseInt(carIn.offset().left + 30)) <= parseInt($('.snitch').offset().left + 50)
        if (checkBottom && checkTop && checkLeft && checkRight) {
            if (carIn === carOne) {
                $('#score-one').text((parseInt($('#score-one').text()) + 1));
            } else if (carIn === carTwo) {
                $('#score-two').text((parseInt($('#score-two').text()) + 1));
            }
        }
        if (parseInt($('#score-one').text()) >= 100 && !isEnd) {
            $('#score-one').text(100);
            $('#header').addClass("tada")
            endGame(carOne);
        }
        if (parseInt($('#score-two').text()) >= 100 && !isEnd) {
            $('#score-two').text(100);
            $('#header').addClass("tada")
            endGame(carTwo);
        }
    }
    var endGame = function(carIn) {
        if (carIn === carOne) {
            $('#status-display').text('Car One Win!');
        } else if (carIn === carTwo) {
            $('#status-display').text('Car Two Win!');
        }
        $('#status-display').addClass('infinite');
        $('#status-display').addClass('rubberBand');
        isEnd = true;
        listenerSwitch();
    }
    var go = function(direction, carIn) { //left, right up down
        checkTouch(carIn);

        var motionSelector;
        if (carIn === carOne) {
            motionSelector = activeMotion[0];
        } else if (carIn === carTwo) {
            motionSelector = activeMotion[1];
        }
        turnCar(motionSelector, carIn);
        switch (direction) {
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
        if (direction === "left" && motionSelector[direction]) {
            setTimeout(function() {
                goLeft(carIn);
            }, 2);
            // setTimeout(go("left"),10);
        }
        if (direction === "right" && motionSelector[direction]) {
            setTimeout(function() {
                goRight(carIn);
            }, 2);
        }
        if (direction === "up" && motionSelector[direction]) {
            setTimeout(function() {
                goUp(carIn);
            }, 2);
        }
        if (direction === "down" && motionSelector[direction]) {
            setTimeout(function() {
                goDown(carIn);
            }, 2);
        }
    }
    //cache a few static values
    var box = $('#playground');
    var width = box.width();
    var height = box.height();
    var snitch = $('.snitch');

    //our main animation "loop"

    var moveSnitch = function() {
        if (!isEnd) {
            var top = (Math.random() * height);
            var left = (Math.random() * width);
            var time = Math.random() * 3000;
            snitch.animate({
                left: left,
                top: top
            }, time, moveSnitch);
        }
    }

    restart();

});