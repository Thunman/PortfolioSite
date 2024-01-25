
import { SquareProps, RectangleProps, BrickProps } from "./GameTypes";

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


    const drawBrick = (brick: BrickProps) => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.width, brick.height);
        ctx.fillStyle = brick.getColor();
        ctx.fill();
        ctx.stroke();
    };

    const brick1: BrickProps = {
        id: 0,
        hp: 1,
        x: 50,
        y: 50,
        width: 1450,
        height: 10,
        getColor: function () {
            switch (this.hp) {
                case 3:
                    return "red";
                case 2:
                    return "yellow";
                case 1:
                    return "green";
                default:
                    return "black";
            }
        },

    }
    const brick2: BrickProps = {
        id: 1,
        hp: 2,
        x: 50,
        y: 65,
        width: 1450,
        height: 10,
        getColor: function () {
            switch (this.hp) {
                case 3:
                    return "red";
                case 2:
                    return "yellow";
                case 1:
                    return "green";
                default:
                    return "black";
            }
        },
        
    }
    const brick3: BrickProps = {
        id: 2,
        hp: 3,
        x: 50,
        y: 80,
        width: 1450,
        height: 10,
        getColor: function () {
            switch (this.hp) {
                case 3:
                    return "red";
                case 2:
                    return "yellow";
                case 1:
                    return "green";
                default:
                    return "black";
            }
        },
    }
    let bricks: BrickProps[] = [brick1, brick2, brick3];


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
        bricks.forEach(brick => {
            drawBrick(brick)
        })

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

        let { hitSide, hitTop, hitBrick } = checkCollision(rectangle, square);

        bricks = bricks.filter((brick) => {
            const brickCollision = checkCollision(brick, square)
            if (brickCollision.hitBrick) {
                hitBrick = true;
                console.log("hit brick")
                if (brick.hp <= 0) {
                    console.log("DIE")
                    return false; 
                }
                square.dx = square.dx === "left" ? "right" : "left";
                square.dy = square.dy === "down" ? "up" : "down";
            }
            return true; 
        });

        if (hitTop) {
            square.dy = square.dy === "down" ? "up" : "down";
        }
        if (hitSide) {
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

        }
    };



    const checkCollision = (rectangle: RectangleProps | BrickProps, square: SquareProps) => {
        const withinHorizontalBounds = square.x + square.sideLength > rectangle.x && square.x < rectangle.x + rectangle.width;
        const withinVerticalBounds = square.y + square.sideLength > rectangle.y && square.y < rectangle.y + rectangle.height;

        let hitTop = false;
        let hitSide = false;
        let hitBrick = false;

        

        if (withinHorizontalBounds && withinVerticalBounds) {
            if ("id" in rectangle) {
                console.log("id if")
                hitBrick = true;
                rectangle.hp -= 1;
            }

            if (square.y + square.sideLength > rectangle.y && square.y < rectangle.y) {
                hitTop = true;
            }

            if (square.x + square.sideLength > rectangle.x && square.x < rectangle.x) {
                hitSide = true;
            }
        }

        return { hitSide, hitTop, hitBrick };
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
            speed: 10,
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
            if (keys["d"]) {
                console.table(brick1);
                console.table(brick2);
                console.table(brick3);

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
        console.log(bricks);
    }

    const getTimer = () => timer;
    const getScore = () => score;
    return { startGame, getTimer, getScore }
}
export default game;


