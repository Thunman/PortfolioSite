import { createBall, drawBall, moveBall } from "../Game/Balls";
import { createBricks, drawBrick } from "../Game/Bricks";
import { checkBorderCollision, checkPaddleCollision, checkBrickCollision, checkOutOfBounds } from "../Game/CollisionLogic";
import { createPaddle, drawPaddle } from "../Game/Paddle";
import { BallProps, PaddleProps, BrickProps } from "./GameTypes";

function game(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let start = false;
  let score = 0;
  let keys: { [key: string]: boolean } = {};
  let balls: BallProps[] = [];
  let bricks: BrickProps[] = [];

  const animate = (paddle: PaddleProps) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;

    drawPaddle(paddle, ctx);
    balls.forEach((ball) => {
      drawBall(ball, ctx);
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
    balls = [];
    start = false;
    score = 0;
    bricks = [];
  };

  const gameOver = () => {
    alert("Game Over");
    resetGame();
  };

  const gameLoop = (balls: BallProps[], paddle: PaddleProps) => {
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
      balls = balls.filter((ball) => {
        moveBall(ball);
        checkPaddleCollision(paddle, ball);
        checkBorderCollision(ball, canvas)
        const outOfBounds = checkOutOfBounds(ball, canvas);
        if(outOfBounds){
          return false;
        }
        bricks.forEach((brick, index) => {
          checkBrickCollision(ball, [brick]);
          if (brick.hp <= 0) {
            bricks.splice(index, 1);
          }
        });
        return true;
      });
  
      if (balls.length === 0) {
        gameOver();
      }
  
      animate(paddle);
      requestAnimationFrame(() => gameLoop(balls, paddle));
    }
  };
  const startGame = () => {
    const paddle = createPaddle(canvas);
    bricks = createBricks(canvas);
    start = true;
    balls.push(createBall(balls, canvas));
    gameLoop(balls, paddle);
  };
  
  const getScore = () => score;
  return { startGame, getScore };
}
export default game;
