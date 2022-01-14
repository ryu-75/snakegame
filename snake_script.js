    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const up = document.getElementById('top');
    const bottom = document.getElementById('bottom');

    let score = 0;

    let play = document.getElementById('play')
    let pause = document.getElementById('pause');
    let replay = document.getElementById('replay');

    // Snake color
    const snakeColColor = 'lightblue';
    const snakeBoardColor = 'green';

    // Canvas color
    const canvasColColor = 'lightgray';
    const canvasBoardColor = 'black';

    const foodColColor = 'orange';
    const foodBoardColor = 'red';

    // Canvas
    const snakeBoard = document.getElementById('snakeboard');
    const snakeBoardCtx = snakeBoard.getContext('2d');

    // vertical movement
    let dy = 0;
    // horizontal movement
    let dx = 10;

    const snake = [
        {x : 200, y : 200},
        {x : 190, y : 200},
        {x : 180, y : 200},
        {x : 170, y : 200},
        {x : 160, y : 200},
    ];

    let changingDirection = false;

    let id = document.getElementById('test')

    document.addEventListener('keydown', changeDirection);
    document.addEventListener('click', arrowMovement);
    document.addEventListener('keydown', replayKey);

    function replayKey(e) {
        const SPACE = 32;

        const keyPressed = e.keyCode;
        if(keyPressed === SPACE) {
            location.reload()
        }
    }

    genFood();

    function main() {

        if(hasGameEnded()) {
            document.getElementById('lose').style.visibility = "visible";
            return;
        }
        
        changingDirection = false;
        timeOut = window.setTimeout(function onTick()
        {
            clearCanvas();
            drawFood();
            drawSnake();
            moveSnake();
            main();
        }, 100)
    }
    main();

    // Create a canvas
    function clearCanvas() {
        // Add background color to canvas
        snakeBoardCtx.fillStyle = canvasColColor;
        // Fill entirely canvas
        snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
    }

    // Draw each part of snake
    function drawSnake() {
        snake.forEach(drawSnakePart)
    }
 
    function arrowMovement() {
        const UP_KEY = 38;
        const BOTTOM_KEY = 40;
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;

        if(changingDirection) return;
        changingDirection = true;

        up.addEventListener('click', () => {
        const goingDown = dy === 10;

        if(UP_KEY && !goingDown) {
            dx = 0;
            dy = -10
            }
        })

        bottom.addEventListener('click', () => {
            const goingUp = dy === -10;

            if(BOTTOM_KEY && !goingUp) {
                dx = 0;
                dy = 10
                }
        })
        
        left.addEventListener('click', () => {
            const goingRight = dx === 10;

            if(LEFT_KEY && !goingRight) {
                dx = -10;
                dy = 0
                }
        })    
        
        right.addEventListener('click', () => {
            const goingLeft = dx === -10;

            if(RIGHT_KEY && !goingLeft) {
                dx = 10;
                dy = 0;
            }
        })
    }

        // Create each part of snake
        function drawSnakePart(snakePart) {
            snakeBoardCtx.fillStyle = snakeColColor;
            snakeBoardCtx.strokestyle = snakeBoardColor;
            snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
            snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
        }
/*
    document.addEventListener('click', function(e) {
        switch (e.keyCode) {
            case 37:
                moveLeft.getElementById('left');
                break;
            case 38:
                moveTop.getElementById('top');
                break;
            case 39: 
                moveRight.getElementById('right');
                break;
            case 40: 
                moveBottom.getElementById('bottom')
        }
    })
*/
    function hasGameEnded() {
        for(let i = 4; i < snake.length; i++) {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
        }
            const hitLeftWall = snake[0].x < 0;
            const hitRightWall = snake[0].x > snakeBoard.width - 10;
            const hitTopWall = snake[0].y < 0;
            const hitBottomWall = snake[0].y > snakeBoard.width - 10;

            const hitWall = hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
            const lose = document.getElementById('lose');
            return hitWall
    }

    function changeDirection(e) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        if(changingDirection) return;
        changingDirection = true;
        const keyPressed = e.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingLeft = dx === -10;
        const goingRight = dx === 10;

        if(keyPressed === LEFT_KEY && !goingRight) {
            dx = -10;
            dy = 0;
        } 

        if(keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 10;
            dy = 0;
        }

        if(keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -10
        }

        if(keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = 10;
        }
    }    

    
 
    function moveSnake() {
        const head = {x: snake[0].x + dx, y : snake[0].y + dy};

        snake.unshift(head);
        const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
        if(hasEatenFood) {
            score += 10;
            document.getElementById('score').innerText = score;
            genFood();
        } else {
            snake.pop()
        }
    }

    function randomFood(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }

    function genFood() {
        foodX = randomFood(0, snakeBoard.width - 10);
        foodY = randomFood(0, snakeBoard.height - 10);
        snake.forEach(function hasSnakeEatenFood(part) {
            const hasEaten = part.x == foodX && part.y == foodY;
            if (hasEaten) genFood()
            
        })
    }

    function drawFood() {
        snakeBoardCtx.fillStyle = foodColColor;
        snakeBoardCtx.strokestyle = foodBoardColor;
        snakeBoardCtx.fillRect(foodX, foodY, 10, 10);
        snakeBoardCtx.strokeRect(foodX, foodY, 10, 10)
    }


    function gamePause() {
        if(window.clearTimeout(timeOut)) return;
    }
