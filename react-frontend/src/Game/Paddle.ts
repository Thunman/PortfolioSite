import { RectangleProps } from "../components/GameTypes";

export const createPaddle = (canvas: HTMLCanvasElement) => {
  const paddle: RectangleProps = {
    color: "grey",
    position: {
      x: canvas.width / 2,
      y: canvas.height - 50,
    },
    width: canvas.width * 0.1,
    height: 25,
  };
  return paddle;
};

export const drawPaddle = (
  paddle: RectangleProps,
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
  ctx.fillStyle = paddle.color;
  ctx.fill();
};
