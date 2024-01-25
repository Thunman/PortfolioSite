
import { SquareProps, RectangleProps } from "./GameTypes";

function game(canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let start = false;
    let timer = 0;
    let score = 0;
    let squareId = 0;
    let keys: { [key: string]: boolean } = {};



    let rectangle: RectangleProps = {
        color: "black",
        x: canvas.width / 2,
        y: canvas.height - 75,
        width: 100,
        height: 50
    }


    let squares: SquareProps[] = [];



    const drawSquare = (square: SquareProps) => {
        ctx.beginPath();
        ctx.rect(square.x, square.y, 20, 20);
        ctx.fillStyle = square.color;
        ctx.fill();
        ctx.stroke();
    };

    const drawRectangle = (rectangle: RectangleProps) => {
        ctx.beginPath();
        ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        ctx.fillStyle = rectangle.color;
        ctx.fill();
        ctx.stroke();
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRectangle(rectangle);
        squares.forEach(square => {
            moveSquare(square);
            drawSquare(square);

        });
        requestAnimationFrame(animate);
    };



    window.addEventListener("keydown", (e) => {
        keys[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
        keys[e.key] = false;
    });


    const resetGame = () => {

        squares = [];
        start = false;
        squareId = 0;
        timer = 0;
        score = 0;
    }
    const gameOver = () => {
        resetGame();
        alert("Game Over");
    }



    const moveSquare = (square: SquareProps) => {


        square.x += square.dx === "right" ? square.speed : -square.speed;
        square.y += square.dy === "down" ? square.speed : -square.speed;

        const { hitSide, hitTop } = checkCollision(rectangle, square);

        if (hitTop) {
            console.log("hit top rect")
            square.dy = square.dy === "down" ? "up" : "down";
        }
        if (hitSide) {
            console.log("hit side")
            square.dx = square.dx === "left" ? "right" : "left"
        }

        if (square.x < 0) {
            square.dx = "right";
        } else if (square.x + square.sideLength > canvas.width) {
            square.dx = "left";
        }
        if (square.y < 0) {
            square.dy = "down";
        } else if (square.y + square.sideLength > canvas.height) {
            square.dy = "up";
            console.log("hit bottom of canvas")
        }
    };



    const checkCollision = (rectangle: RectangleProps, square: SquareProps) => {
        const withinHorizontalBounds = square.x + square.sideLength > rectangle.x && square.x < rectangle.x + rectangle.width;
        const withinVerticalBounds = square.y + square.sideLength > rectangle.y && square.y < rectangle.y + rectangle.height;

        let hitTop = false;
        let hitSide = false;

        if (withinHorizontalBounds && withinVerticalBounds) {

            if (square.y + square.sideLength > rectangle.y && square.y < rectangle.y) {
                hitTop = true;
            }

            if (square.x + square.sideLength > rectangle.x && square.x < rectangle.x) {
                hitSide = true;
            }
        }

        return { hitSide, hitTop };
    };


    const addSquare = () => {
        const lastSquare = squares[squares.length - 1];
        const newSquare: SquareProps = {
            id: squareId++,
            x: lastSquare ? lastSquare.x : canvas.width / 2,
            y: lastSquare ? lastSquare.y : canvas.height / 2,
            color: "grey",
            sideLength: 20,
            dx: "right",
            dy: "down",
            speed: 0.01,
        };
        squares.push(newSquare)
    };


    const gameLoop = () => {

        if (start && timer > 0) {
            if (keys["ArrowRight"] && rectangle.x < canvas.width - rectangle.width) {
                rectangle.x += 15;
            }
            if (keys["ArrowLeft"] && rectangle.x > 0) {
                rectangle.x -= 15;
            }
            animate();
            requestAnimationFrame(gameLoop);
        } else {
            gameOver();
        }

    };
    const startGame = () => {
        start = true;
        timer = 15;
        addSquare();
        requestAnimationFrame(gameLoop);
    }

    const getTimer = () => timer;
    const getScore = () => score;
    return { startGame, getTimer, getScore }
}
export default game;


/*
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        drawCircle(circle);
    });
    drawRectangle(rectangleX, rectangleY);
    requestAnimationFrame(animate);
};
*/