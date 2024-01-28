import { createBricks, drawBrick } from "../Game/Bricks";
import { createPaddle, drawPaddle } from "../Game/Paddle";
import { SquareProps, RectangleProps, BrickProps } from "./GameTypes";

function game(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let start = false;
  let score = 0;
  let squareId = 0;
  let keys: { [key: string]: boolean } = {};



  let squares: SquareProps[] = [];

  let bricks: BrickProps[] = [];


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
    ctx.arcTo(
      x + width,
      y + height,
      x + width - cornerRadius,
      y + height,
      cornerRadius
    );
    ctx.lineTo(x + cornerRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
    ctx.lineTo(x, y + cornerRadius);
    ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
    ctx.fillStyle = square.color;
    ctx.fill();
    ctx.stroke();
  };

  const animate = (paddle: RectangleProps) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    drawPaddle(paddle, ctx)
    squares.forEach((square) => {
      moveSquare(square, paddle);
      drawSquare(square);
    });
    bricks.forEach((brick) => {
      drawBrick(brick, ctx);
    });
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
    bricks = [];
  };
  const gameOver = () => {
    alert("Game Over");
    resetGame();
  };

  const moveSquare = (square: SquareProps, paddle: RectangleProps) => {
    const speedMultiplier = square.speed;
    const velocity = {
      x: square.velocity.x * speedMultiplier,
      y: square.velocity.y * speedMultiplier,
    };

    square.position.x += velocity.x;
    square.position.y += velocity.y;
    square.position.x = Math.round(square.position.x);
    square.position.y = Math.round(square.position.y);

    let { hitSide, hitTop } = checkCollision(paddle, square);

    bricks = bricks.filter((brick) => {
      const brickCollision = checkCollision(brick, square);
      if (brickCollision.hitBrick) {
        const normalVector = {
          x: brick.position.x - square.position.x,
          y: brick.position.y - square.position.y,
        };
        const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
        const dotProduct =
          (velocity.x * normalVector.x + velocity.y * normalVector.y) /
          (speed * Math.sqrt(normalVector.x ** 2 + normalVector.y ** 2));
        const reflection = {
          x: velocity.x - 2 * normalVector.x * dotProduct,
          y: velocity.y - 2 * normalVector.y * dotProduct,
        };
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

    if (
      square.position.x < 0 ||
      square.position.x + square.size > canvas.width
    ) {
      velocity.x *= -1;
    }
    if (
      square.position.y < 0 ||
      square.position.y + square.size > canvas.height
    ) {
      velocity.y *= -1;
      squares = squares.filter((s) => s.id !== square.id);
      if (squares.length === 0) {
        gameOver();
      }
    }

    square.velocity.x = velocity.x > 0 ? 1 : -1;
    square.velocity.y = velocity.y > 0 ? 1 : -1;
  };

  const checkCollision = (
    rectangle: RectangleProps | BrickProps,
    square: SquareProps & { size: number }
  ) => {
    const withinHorizontalBounds =
      square.position.x + square.size > rectangle.position.x &&
      square.position.x < rectangle.position.x + rectangle.width;
    const withinVerticalBounds =
      square.position.y + square.size > rectangle.position.y &&
      square.position.y < rectangle.position.y + rectangle.height;

    let hitTop = false;
    let hitSide = false;
    let hitBrick = false;

    if (withinHorizontalBounds && withinVerticalBounds) {
      if ("id" in rectangle) {
        hitBrick = true;
        rectangle.hp -= 1;
      }
      if (
        square.position.y + square.size > rectangle.position.y &&
        square.position.y < rectangle.position.y
      ) {
        hitTop = true;
      }
      if (
        square.position.x + square.size > rectangle.position.x &&
        square.position.x < rectangle.position.x
      ) {
        hitSide = true;
      }
    }
    return { hitSide, hitTop, hitBrick };
  };

  const addSquare = () => {
    const lastSquare = squares[squares.length - 1];
    const initialSpeed = 5;
    const newSquare: SquareProps = {
      id: squareId++,
      position: {
        x: lastSquare ? lastSquare.position.x : canvas.width / 2,
        y: lastSquare ? lastSquare.position.y : canvas.height / 2,
      },
      color: "grey",
      size: 12.5,
      speed: initialSpeed,
      velocity: {
        x: 0,
        y: 0,
      },
    };
    console.log(`New Square Speed: ${newSquare.speed}`)
    squares.push(newSquare);
  };

  const gameLoop = (paddle: RectangleProps) => {
    if (start) {
      if (
        keys["ArrowRight"] &&
        paddle.position.x < canvas.width - paddle.width
      ) {
        paddle.position.x += 15;
      }
      if (keys["ArrowLeft"] && paddle.position.x > 0) {
        paddle.position.x -= 15;
      }
      animate(paddle);
      requestAnimationFrame(() => gameLoop(paddle));
    }
  };
  const startGame = async () => {
    const paddle = createPaddle(canvas);
    bricks = createBricks(canvas);
    start = true;
    addSquare();
    gameLoop(paddle);
  };

  const getScore = () => score;
  return { startGame, getScore };
}
export default game;
