
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

    const snake = [
        {x : 200, y : 200},
        {x : 190, y : 200},
        {x : 180, y : 200},
        {x : 170, y : 200},
        {x : 160, y : 200},
    ];

    let changingDirection = false;


    function main() {
        
        changingDirection = false;
        setTimeout(function onTick()
        {
            clearCanvas();
            main();
        })
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
    clearCanvas();

    function drawSnake() {
        snake.forEach(drawSnakePart)
    }
    drawSnake();

    function drawSnakePart(snakePart) {
        snakeBoardCtx.fillStyle = snakeColColor;
        snakeBoardCtx.strokestyle = snakeBoardColor;
        snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
        snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
    drawSnakePart()

