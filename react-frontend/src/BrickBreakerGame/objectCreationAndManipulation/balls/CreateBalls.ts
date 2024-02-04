import { BallProps, PaddleProps } from "../../HelperFunctions/GameTypes";

export const createBall = (
	balls: BallProps[],
	paddle: PaddleProps,
	canvas: HTMLCanvasElement
) => {
	const firstBall = balls[0];
	const lastBall = balls[balls.length - 1];
	const initialSpeed = 5;
	const offset = 0.25;
	const newBall: BallProps = {
		id: balls.length,
		position: {
			x:
				balls.length === 0
					? paddle.position.x + paddle.width / 2
					: lastBall
					? lastBall.position.x + 20
					: canvas.width / 2,
			y:
				balls.length === 0
					? paddle.position.y - 12.5
					: lastBall
					? lastBall.position.y + 20
					: canvas.height / 2,
		},
		color: "white",
		size: 12.5,
		speed: initialSpeed,
		velocity: firstBall
			? {
					x: firstBall.velocity.x * 1 + offset,
					y: firstBall.velocity.y * 1 + offset,
			  }
			: { x: 0, y: 0 },
	};
	return newBall;
};