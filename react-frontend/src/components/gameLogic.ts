
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




    let bricks: BrickProps[] = [];
    const paddingTop = 20;
    const paddingLeft = 20
    const paddingRight = 20;
    const brickWidth = 25;
    const brickHeight = 15;
    const brickSpace = 5;
    const nrOfRows = 6;
    let brickId = 0;
    for (let row = 0; row < nrOfRows; row++) {
        for (let col = 0; col < (canvas.width - paddingLeft - paddingRight) / (brickWidth + brickSpace); col++) {
            const x = paddingLeft + col * (brickWidth + brickSpace);
            const y = paddingTop + row * (brickHeight + brickSpace);

            let hp: number;
            switch (row) {
                case 0:
                case 1:
                    hp = 3;
                    break;
                case 2:
                case 3:
                    hp = 2;
                    break;
                case 4:
                case 5:
                    hp = 1;
                    break;
                default:
                    hp = 0;
            }

            const newBrick: BrickProps = {
                id: brickId,
                hp: hp,
                x: x,
                y: y,
                width: brickWidth,
                height: brickHeight,
                getColor() {
                    switch (this.hp) {
                        case 1: return "green";
                        case 2: return "yellow";
                        case 3: return "red";
                        default: return "black";
                    }
                },
            }
            brickId++;
            bricks.push(newBrick)

        }
    }
    const drawBrick = (brick: BrickProps) => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.width, brick.height);
        ctx.fillStyle = brick.getColor();
        ctx.fill();
        ctx.stroke();
    };

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
        score = 0;
    }
    const gameOver = () => {
        alert("Game Over");
        resetGame();
    }



    const moveSquare = (square: SquareProps) => {


        square.x += square.dx === "right" ? square.speed : -square.speed;
        square.y += square.dy === "down" ? square.speed : -square.speed;

        let { hitSide, hitTop } = checkCollision(rectangle, square);

        bricks = bricks.filter((brick) => {
            const brickCollision = checkCollision(brick, square)
            if (brickCollision.hitBrick) {
                square.dx = square.dx === "left" ? "right" : "left";
                square.dy = square.dy === "down" ? "up" : "down";
                console.log("hit brick")
                if (brick.hp <= 0) {
                    console.log("DIE")
                    return false;
                }
                
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
            gameOver();

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

        if (start) {

            if (keys["ArrowRight"] && rectangle.x < canvas.width - rectangle.width) {
                rectangle.x += 15;
            }
            if (keys["ArrowLeft"] && rectangle.x > 0) {
                rectangle.x -= 15;
            }



            animate();
            requestAnimationFrame(gameLoop);
        } 

    };
    const startGame = () => {

        start = true;
        addSquare();
        requestAnimationFrame(gameLoop);
        console.log(bricks);
    }


    const getScore = () => score;
    return { startGame, getScore }
}
export default game;


