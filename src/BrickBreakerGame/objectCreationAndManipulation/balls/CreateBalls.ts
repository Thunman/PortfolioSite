
import { BallProps, GameStateProps} from "../../HelperFunctions/GameTypes";

export const createBall = (
	gameState: GameStateProps,
	canvas: HTMLCanvasElement
) => {
	const firstBall = gameState.balls[0];
	const lastBall = gameState.balls[gameState.balls.length - 1];
	const offset = 0.25;
	const newBall: BallProps = {
		type: "ball",
		id: gameState.balls.length,
		position: {
			x:
				gameState.balls.length === 0
					? gameState.paddle.position.x + gameState.paddle.width / 2
					: lastBall
					? lastBall.position.x + 20
					: canvas.width / 2,
			y:
				gameState.balls.length === 0
					? gameState.paddle.position.y - 12.5
					: lastBall
					? lastBall.position.y + 20
					: canvas.height / 2,
		},
		color: "white",
		size: 12.5,
		speed: lastBall ? lastBall.speed : 10,
		velocity: firstBall
			? {
					x: firstBall.velocity.x * 1 + offset,
					y: firstBall.velocity.y * 1 + offset,
			  }
			: { x: 0, y: 0 },
	};
	return newBall;
};