import { GameStateProps } from "../../HelperFunctions/GameTypes";

const PADDLE_SPEED = 15;

export const handlePaddleMovements = (
	gameState: GameStateProps,
	canvas: HTMLCanvasElement
) => {
	const maxPaddleX = canvas.width - gameState.paddle.width;
	if (
		gameState.keys.has("ArrowRight") &&
		gameState.paddle.position.x < maxPaddleX
	) {
		gameState.paddle.position.x += PADDLE_SPEED;
	}
	if (gameState.keys.has("ArrowLeft") && gameState.paddle.position.x > 0) {
		gameState.paddle.position.x -= PADDLE_SPEED;
	}
};
