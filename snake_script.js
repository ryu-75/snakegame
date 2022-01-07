    // Score
    let score = document.getElementById('score');


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

    main();

    genFood();

    document.addEventListener('keydown', changeDirection);

    function main() {
        
        changingDirection = false;
        setTimeout(function onTick()
        {
            clearCanvas();
            drawFood();
            drawSnake();
            moveSnake();
            main();
        }, 100)
    }

    // Create a canvas
    function clearCanvas() {
        // Add background color to canvas
        snakeBoardCtx.fillStyle = canvasColColor;
        // Add boarder color to canvas
        snakeBoardCtx.strokestyle = canvasBoardColor;
        // Fill entirely canvas
        snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
        // Draw a border 
        snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
    }

    // Draw each part of snake
    function drawSnake() {
        snake.forEach(drawSnakePart)
    }

    // Create each part of snake
    function drawSnakePart(snakePart) {
        snakeBoardCtx.fillStyle = snakeColColor;
        snakeBoardCtx.strokestyle = snakeBoardColor;
        snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
        snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function changeDirection(e) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        if(changeDirection) return;
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
            score.innerHTML +=10;
            genFood();
        } else {
            snake.pop()
        }
    }

    function randomFood(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }

    function genFood() {
        foodX = randomFood(0, snakeBoardCtx.width - 10);
        foodY = randomFood(0, snakeBoardCtx.height - 10);
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
