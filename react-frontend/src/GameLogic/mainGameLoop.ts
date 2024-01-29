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
  let keys: Set<string> = new Set();
  let balls: BallProps[] = [];
  let bricks: BrickProps[] = [];
  let powerUps: PowerUpProps[] = [];
  let gameLevel = 1;



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
    keys.add(e.key);
  });
  window.addEventListener("keyup", (e) => {
    keys.delete(e.key);
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
      const maxPaddleX = canvas.width - paddle.width;
      if (keys.has("ArrowRight") && paddle.position.x < maxPaddleX) {
        paddle.position.x += 15;
      }
      if (keys.has("ArrowLeft") && paddle.position.x > 0) {
        paddle.position.x -= 15;
      }
      for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        movePowerUp(powerUp)
        const powerUpGain = checkPowerUpCollision(paddle, powerUp, canvas)
        if(powerUpGain.collision || powerUpGain.ofCanvas){
          if(powerUpGain.text === "+1"){
            balls.push(createBall(balls, canvas));
          }else if(powerUpGain.text === "<->"){
            biggerPaddle(paddle, canvas);
          }
          powerUps.splice(i, 1);
        }
      }
      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        moveBall(ball);
        
        checkPaddleCollision(paddle, ball);
        checkBorderCollision(ball, canvas)
        const outOfBounds = checkOutOfBounds(ball, canvas);
        if(outOfBounds){
          balls.splice(i, 1);
          continue;
        }
        for (let j = bricks.length - 1; j >= 0; j--) {
          const brick = bricks[j];
          checkBrickCollision(ball, [brick]);
          if (brick.hp <= 0) {
            const randomNr = parseFloat(Math.random().toFixed(2));
            if (randomNr < 0.75) {
              powerUps.push(createPowerUp(powerUps, brick));
            } 
            bricks.splice(j, 1);
          }
        }
      }
      if (balls.length === 0) {
        gameOver();
      }
      animate(paddle, balls);
      requestAnimationFrame(() => gameLoop(balls, paddle));
    }
  };
  const startGame = () => {
    const paddle = createPaddle(canvas);
    bricks = createBricks(canvas, gameLevel);
    start = true;
    balls.push(createBall(balls, canvas));
    canvas.addEventListener('click', () => {
      canvas.requestPointerLock();
    });
    document.addEventListener('mousemove', (event) => {
      if (document.pointerLockElement === canvas) {
        paddle.position.x += event.movementX;
        
        if (paddle.position.x < 0) paddle.position.x = 0;
        if (paddle.position.x > canvas.width - paddle.width) paddle.position.x = canvas.width - paddle.width;
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        document.exitPointerLock();
      }
    });
    gameLoop(balls, paddle);
  };
  
  const getScore = () => score;
  return { startGame, getScore };
}
export default game;
