import { checkPowerUpCollision } from "../../GameLogic/CollisionLogic";
import { GameStateProps } from "../../HelperFunctions/GameTypes";
import { createBall } from "../balls/CreateBalls";
import { biggerPaddle, smallerPaddle } from "../paddles/CreatePaddles";
import { movePowerUp } from "./MovePowerUps";

export const handlePowerUpGains = (
	canvas: HTMLCanvasElement,
	gameState: GameStateProps
) => {
	for (let i = gameState.powerUps.length - 1; i >= 0; i--) {
		const powerUp = gameState.powerUps[i];
		movePowerUp(powerUp);
		const powerUpGain = checkPowerUpCollision(
			gameState.paddle,
			powerUp,
			canvas
		);
		if (powerUpGain.collision || powerUpGain.outsideCanvas) {
			switch (powerUp.type) {
				case "addBall":
					gameState.balls.push(
						createBall(gameState, canvas)
					);
					break;
				case "biggerPaddle":
					biggerPaddle(gameState.paddle, canvas);
					break;
				case "smallerPaddle":
					smallerPaddle(gameState.paddle, canvas);
					break;
				case "speedUp":
					gameState.balls.forEach((ball) => {
						ball.speed = ball.speed < 20 ? ball.speed + 5 : ball.speed;
					});
					break;
				case "slowDown":
					gameState.balls.forEach((ball) => {
						ball.speed = ball.speed > 5 ? ball.speed - 5 : ball.speed;
					});
					break;
				case "laserGun": 
					gameState.paddle.activateLaser();
			}
			gameState.powerUps.splice(i, 1);
		}
	}
};
