import { BallProps, BrickProps, PaddleProps } from "../components/GameTypes";

export const checkPaddleCollision = (
  paddle: PaddleProps,
  ball: BallProps & { size: number }
) => {
  const distX = Math.abs(
    ball.position.x - paddle.position.x - paddle.width / 2
  );
  const distY = Math.abs(
    ball.position.y - paddle.position.y - paddle.height / 2
  );

  if (
    distX <= paddle.width / 2 + ball.size &&
    distY <= paddle.height / 2 + ball.size
  ) {
    if (distX <= paddle.width / 2) {
      ball.velocity.y *= -1;
    }

    if (distY <= paddle.height / 2) {
      ball.velocity.x *= -1;
    }

    const dx = distX - paddle.width / 2;
    const dy = distY - paddle.height / 2;
    if (dx * dx + dy * dy <= ball.size * ball.size) {
      ball.velocity.x *= -1;
      ball.velocity.y *= -1;
    }
  }
};
export const checkBorderCollision = (ball: BallProps, canvas: HTMLCanvasElement) => {
  const distLeft = ball.position.x;
  const distRight = canvas.width - (ball.position.x + ball.size);
  const distTop = ball.position.y;

  if (distLeft < 0) {
    ball.velocity.x *= -1;
  }
  if (distRight < 0) {
    ball.velocity.x *= -1;
  }
  if (distTop < 0) {
    ball.velocity.y *= -1;
  }
};
export const checkOutOfBounds = (
  ball: BallProps,
  canvas: HTMLCanvasElement
) => {
  let outOfBounds = false
  const distBottom = canvas.height - (ball.position.y + ball.size);
  if (distBottom < 0) {
    outOfBounds = true
    return outOfBounds;
  }
};
export const checkBrickCollision = (
  ball: BallProps,
  bricks: BrickProps[]
) => {
  for (let brick of bricks) {
    const distX = Math.abs(
      ball.position.x - brick.position.x - brick.width / 2
    );
    const distY = Math.abs(
      ball.position.y - brick.position.y - brick.height / 2
    );
    if (
      distX > brick.width / 2 + ball.size ||
      distY > brick.height / 2 + ball.size
    ) {
      continue;
    }
    if (distX <= brick.width / 2) {
      ball.velocity.y *= -1;
      brick.hp -= 1;
      return;
    }
    if (distY <= brick.height / 2) {
      ball.velocity.x *= -1;
      brick.hp -= 1;
      return;
    }
    const dx = distX - brick.width / 2;
    const dy = distY - brick.height / 2;
    if (dx * dx + dy * dy <= ball.size * ball.size) {
      ball.velocity.x *= -1;
      ball.velocity.y *= -1;
      brick.hp -= 1;
      return;
    }
  }
};
