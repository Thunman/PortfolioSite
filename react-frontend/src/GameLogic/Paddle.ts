import { PaddleProps } from "./GameTypes";

export const createPaddle = (canvas: HTMLCanvasElement) => {
  const paddle: PaddleProps = {
    color: "#202040", 
    position: {
      x: canvas.width / 2,
      y: canvas.height - 50,
    },
    width: canvas.width * 0.1,
    height: 25,
  };
  return paddle;
};
let gradientOffset = 0;
export const drawPaddle = (
  paddle: PaddleProps,
  ctx: CanvasRenderingContext2D
) => {
  const cornerRadius = 10;
  ctx.beginPath();
  ctx.moveTo(paddle.position.x + cornerRadius, paddle.position.y);
  ctx.lineTo(
    paddle.position.x + paddle.width - cornerRadius,
    paddle.position.y
  );
  ctx.arcTo(
    paddle.position.x + paddle.width,
    paddle.position.y,
    paddle.position.x + paddle.width,
    paddle.position.y + cornerRadius,
    cornerRadius
  );
  ctx.lineTo(
    paddle.position.x + paddle.width,
    paddle.position.y + paddle.height - cornerRadius
  );
  ctx.arcTo(
    paddle.position.x + paddle.width,
    paddle.position.y + paddle.height,
    paddle.position.x + paddle.width - cornerRadius,
    paddle.position.y + paddle.height,
    cornerRadius
  );
  ctx.lineTo(
    paddle.position.x + cornerRadius,
    paddle.position.y + paddle.height
  );
  ctx.arcTo(
    paddle.position.x,
    paddle.position.y + paddle.height,
    paddle.position.x,
    paddle.position.y + paddle.height - cornerRadius,
    cornerRadius
  );
  ctx.lineTo(paddle.position.x, paddle.position.y + cornerRadius);
  ctx.arcTo(
    paddle.position.x,
    paddle.position.y,
    paddle.position.x + cornerRadius,
    paddle.position.y,
    cornerRadius
  );
  ctx.closePath();

  const gradient = ctx.createLinearGradient(
    paddle.position.x,
    paddle.position.y,
    paddle.position.x + paddle.width,
    paddle.position.y + paddle.height
  );
  
  for (let i = 0; i <= 1; i += 0.1) {
    const color = i % 0.2 < 0.1 ? "#000020" : "#202040"; 
    gradient.addColorStop((i + gradientOffset) % 1, color);
  }

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();

  gradientOffset += 0.01;
  if (gradientOffset > 1) {
    gradientOffset -= 1;
  }
};
