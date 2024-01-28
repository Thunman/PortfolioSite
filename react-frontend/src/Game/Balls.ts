import { BallProps, PaddleProps } from "../components/GameTypes";

export const drawBall = (ball: BallProps, ctx: CanvasRenderingContext2D) => {
    const cornerRadius = 5;
    ctx.beginPath();
    const x = ball.position.x;
    const y = ball.position.y;
    const width = ball.size;
    const height = ball.size;

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
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.stroke();
};

export const createBall = (balls: BallProps[], canvas: HTMLCanvasElement) => {
    const lastBall = balls[balls.length - 1];
    const initialSpeed = 5;
    const newBall: BallProps = {
      id: balls.length,
      position: {
        x: lastBall ? lastBall.position.x : canvas.width / 2,
        y: lastBall ? lastBall.position.y : canvas.height / 2,
      },
      color: "grey",
      size: 12.5,
      speed: initialSpeed,
      velocity: {
        x: 0,
        y: 1,
      },
    };
    return newBall;
};

export const moveBall = (ball: BallProps) => {
    const speedMultiplier = ball.speed;
    const velocity = {
      x: ball.velocity.x * speedMultiplier,
      y: ball.velocity.y * speedMultiplier,
    };

    ball.position.x += velocity.x;
    ball.position.y += velocity.y;
    ball.position.x = Math.round(ball.position.x);
    ball.position.y = Math.round(ball.position.y);
    ball.velocity.x = velocity.x > 0 ? 1 : -1;
    ball.velocity.y = velocity.y > 0 ? 1 : -1;
};