import { BallProps, PaddleProps } from "./GameTypes";

export const drawBall = (ball: BallProps, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  const x = ball.position.x;
  const y = ball.position.y;
  const radius = ball.size / 2;

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, ball.color);

  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.stroke();
};

export const createBall = (balls: BallProps[],paddle: PaddleProps, canvas: HTMLCanvasElement) => {
  const firstBall = balls[0];
  const lastBall = balls[balls.length - 1];
  const initialSpeed = 5;
  const offset = 0.25; 
  const newBall: BallProps = {
    id: balls.length,
    position: {
      x: balls.length === 0 ? paddle.position.x + paddle.width / 2 : (lastBall ? lastBall.position.x + 20 : canvas.width / 2),
      y: balls.length === 0 ? paddle.position.y - 12.5 : (lastBall ? lastBall.position.y + 20 : canvas.height / 2),
    },
    color: "white",
    size: 12.5,
    speed: initialSpeed,
    velocity: firstBall 
      ? { 
          x: firstBall.velocity.x * 1 + offset, 
          y: firstBall.velocity.y * 1 + offset 
        } 
      : { x: 0, y: 0 },
  };
  return newBall;
};

export const moveBall = (ball: BallProps, paddle: PaddleProps, launchBall: boolean) => {
  const speedMultiplier = 5;
  if (launchBall) {
    ball.velocity = {
      x: ball.velocity.x || 0 * speedMultiplier,
      y: ball.velocity.y || -1 * speedMultiplier,
    };
  }

  if (!launchBall) {
    ball.position.x = paddle.position.x + paddle.width / 2;
    ball.position.y = paddle.position.y - ball.size;
  } else {
    ball.position.x += ball.velocity.x;
    ball.position.y += ball.velocity.y;
  }

  ball.position.x = Math.round(ball.position.x);
  ball.position.y = Math.round(ball.position.y);
};