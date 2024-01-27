import { SquareProps, RectangleProps, BrickProps } from "./GameTypes";

function game(canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let start = false;
    let score = 0;
    let squareId = 0;
    let keys: { [key: string]: boolean } = {};

    let rectangle: RectangleProps = {
        color: "grey",
        position: {
            x: canvas.width / 2,
            y: canvas.height -50,
        },
        width: canvas.width * 0.1,
        height: 25
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
                width: brickWidth,
                height: brickHeight,
                position: {
                    x: x,
                    y: y
                },
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
        ctx.rect(brick.position.x, brick.position.y, brick.width, brick.height);
        ctx.fillStyle = brick.getColor();
        ctx.fill();
        ctx.stroke();
    };

    const drawSquare = (square: SquareProps) => {
        const cornerRadius = 5;
        ctx.beginPath();
        const x = square.position.x;
        const y = square.position.y;
        const width = square.size;
        const height = square.size;

        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + width - cornerRadius, y);
        ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
        ctx.lineTo(x + width, y + height - cornerRadius);
        ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
        ctx.lineTo(x + cornerRadius, y + height);
        ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
        ctx.lineTo(x, y + cornerRadius);
        ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
        ctx.fillStyle = square.color;
        ctx.fill();
        ctx.stroke();
    };

    const drawRectangle = (rectangle: RectangleProps) => {
        const cornerRadius = 10;
        ctx.beginPath();
        ctx.moveTo(rectangle.position.x + cornerRadius, rectangle.position.y);
        ctx.lineTo(rectangle.position.x + rectangle.width - cornerRadius, rectangle.position.y);
        ctx.arcTo(rectangle.position.x + rectangle.width, rectangle.position.y, rectangle.position.x + rectangle.width, rectangle.position.y + cornerRadius, cornerRadius);
        ctx.lineTo(rectangle.position.x + rectangle.width, rectangle.position.y + rectangle.height - cornerRadius);
        ctx.arcTo(rectangle.position.x + rectangle.width, rectangle.position.y + rectangle.height, rectangle.position.x + rectangle.width - cornerRadius, rectangle.position.y + rectangle.height, cornerRadius);
        ctx.lineTo(rectangle.position.x + cornerRadius, rectangle.position.y + rectangle.height);
        ctx.arcTo(rectangle.position.x, rectangle.position.y + rectangle.height, rectangle.position.x, rectangle.position.y + rectangle.height - cornerRadius, cornerRadius);
        ctx.lineTo(rectangle.position.x, rectangle.position.y + cornerRadius);
        ctx.arcTo(rectangle.position.x, rectangle.position.y, rectangle.position.x + cornerRadius, rectangle.position.y, cornerRadius);
        ctx.closePath();
        ctx.fillStyle = rectangle.color;
        ctx.fill();
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
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
        
        const speedMultiplier = square.speed
        const velocity = { x: square.velocity.x * speedMultiplier, y: square.velocity.y * speedMultiplier };

        square.position.x += velocity.x;
        square.position.y += velocity.y;

        let { hitSide, hitTop } = checkCollision(rectangle, square);

        bricks = bricks.filter((brick) => {
            const brickCollision = checkCollision(brick, square);
            if (brickCollision.hitBrick) {
                const normalVector = { x: brick.position.x - square.position.x, y: brick.position.y - square.position.y };
                const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
                const dotProduct = (velocity.x * normalVector.x + velocity.y * normalVector.y) / (speed * Math.sqrt(normalVector.x ** 2 + normalVector.y ** 2));
                const reflection = { x: velocity.x - 2 * normalVector.x * dotProduct, y: velocity.y - 2 * normalVector.y * dotProduct };
                velocity.x = reflection.x;
                velocity.y = reflection.y;
                if (brick.hp <= 0) {
                    score++;
                    return false;
                }
            }
            return true;
        });

        if (hitTop) {
            velocity.y *= -1;
        }
        if (hitSide) {
            velocity.x *= -1;
        }

        if (square.position.x < 0 || square.position.x + square.size > canvas.width) {
            velocity.x *= -1;
        }
        if (square.position.y < 0 || square.position.y + square.size > canvas.height) {
            velocity.y *= -1;
            squares = squares.filter(s => s.id !== square.id);
            if (squares.length === 0) {
                gameOver();
            }
        }

        square.velocity.x = velocity.x > 0 ? 1 : -1;
        square.velocity.y = velocity.y > 0 ? 1 : -1;
    };

    const checkCollision = (rectangle: RectangleProps | BrickProps, square: SquareProps & { size: number }) => {
        const withinHorizontalBounds = square.position.x + square.size > rectangle.position.x && square.position.x < rectangle.position.x + rectangle.width;
        const withinVerticalBounds = square.position.y + square.size > rectangle.position.y && square.position.y < rectangle.position.y + rectangle.height;

        let hitTop = false;
        let hitSide = false;
        let hitBrick = false;

        if (withinHorizontalBounds && withinVerticalBounds) {
            if ("id" in rectangle) {
                hitBrick = true;
                rectangle.hp -= 1;
            }
            if (square.position.y + square.size > rectangle.position.y && square.position.y < rectangle.position.y) {
                hitTop = true;
            }
            if (square.position.x + square.size > rectangle.position.x && square.position.x < rectangle.position.x) {
                hitSide = true;
            }
        }
        return { hitSide, hitTop, hitBrick };
    };

    const addSquare = () => {
        const lastSquare = squares[squares.length - 1];
        const intialSpeed = 5;
        const newSquare: SquareProps = {
            id: squareId++,
            position: {
                x: lastSquare ? lastSquare.position.x : canvas.width / 2,
                y: lastSquare ? lastSquare.position.y : canvas.height / 2,
            },
            color: "grey",
            size: 12.5,
            speed: intialSpeed,
            velocity: {
                x: 0,
                y: 0,
            },
        };
        squares.push(newSquare);
    };

    const gameLoop = () => {
        if (start) {
            if (keys["ArrowRight"] && rectangle.position.x < canvas.width - rectangle.width) {
                rectangle.position.x += 15;
            }
            if (keys["ArrowLeft"] && rectangle.position.x > 0) {
                rectangle.position.x -= 15;
            }
            animate();
            requestAnimationFrame(gameLoop);
        }
    };
    const startGame = () => {
        start = true;
        addSquare();
        requestAnimationFrame(gameLoop);
    }

    const getScore = () => score;
    return { startGame, getScore }
}
export default game;


