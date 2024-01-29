import { createBall, drawBall, moveBall } from "./Balls";
import { createBricks, drawBrick } from "./Bricks";
import { checkBorderCollision, checkPaddleCollision, checkBrickCollision, checkOutOfBounds, checkPowerUpCollision } from "./CollisionLogic";
import { biggerPaddle, createPaddle, drawPaddle } from "./Paddle";
import { BallProps, PaddleProps, BrickProps, PowerUpProps } from "./GameTypes";
import { createPowerUp, drawPowerUps, movePowerUp } from "./PowerUps";

function game(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let start = false;
  let score = 0;
  let keys: { [key: string]: boolean } = {};
  let balls: BallProps[] = [];
  let bricks: BrickProps[] = [];
  let powerUps: PowerUpProps[] = [];

  const animate = (paddle: PaddleProps, balls: BallProps[]) => {
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
    powerUps.forEach((powerUp) => {
      drawPowerUps(powerUp, ctx);
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
    powerUps = [];
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
      powerUps.forEach((powerUp, index) => {
        movePowerUp(powerUp)
        const powerUpGain = checkPowerUpCollision(paddle, powerUp, canvas)
        if(powerUpGain.collision || powerUpGain.ofCanvas){
          if(powerUpGain.text === "+1"){
            balls.push(createBall(balls, canvas));
          }else if(powerUpGain.text === "<->"){
            biggerPaddle(paddle, canvas);
          }
          powerUps = powerUps.filter((_, i) => i !== index);
        }
      });
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
            const randomNr = parseFloat(Math.random().toFixed(2));
            if (randomNr < 0.75) {
              powerUps.push(createPowerUp(powerUps, brick));
            } 
            bricks.splice(index, 1);
          }
        });
        return true;
      });
  
      if (balls.length === 0) {
        gameOver();
      }
  
      animate(paddle, balls);
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
