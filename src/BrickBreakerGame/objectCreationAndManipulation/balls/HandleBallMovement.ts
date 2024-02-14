import { checkBorderCollision, checkBrickCollision, checkOutOfBounds, checkPaddleCollision } from "../../GameLogic/CollisionLogic";
import { GameStateProps } from "../../HelperFunctions/GameTypes";
import { randomPowerUp } from "../powerUps/CreatePowerUps";
import { moveBall } from "./MoveBalls";

export const handleBallMovement = (gameState: GameStateProps, canvas: HTMLCanvasElement) => {
	for (let i = gameState.balls.length - 1; i >= 0; i--) {
		const ball = gameState.balls[i];
		for (let j = gameState.bricks.length - 1; j >= 0; j--) {
			const brick = gameState.bricks[j];
			checkBrickCollision(ball, [brick]);
			if (brick.hp <= 0) {
				const randomNr = parseFloat(Math.random().toFixed(2));
				if (randomNr < 0.75) {
					gameState.powerUps.push(
						randomPowerUp(gameState.powerUps, brick)
					);
				}
				gameState.bricks.splice(j, 1);
			}
		}
		moveBall(ball, gameState.paddle, gameState.flags.launchBall);
		checkPaddleCollision(gameState.paddle, ball);
		checkBorderCollision(ball, canvas);
		if (checkOutOfBounds(ball, canvas)) {
			gameState.balls.splice(i, 1);
			continue;
		}
	}
    
};
