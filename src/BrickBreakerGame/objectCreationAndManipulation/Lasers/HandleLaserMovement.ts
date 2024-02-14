import { checkBrickCollision } from "../../GameLogic/CollisionLogic";
import { GameStateProps } from "../../HelperFunctions/GameTypes";
import { randomPowerUp } from "../powerUps/CreatePowerUps";
import { moveLaser } from "./MoveLaser";

export const handleLaserMovement = (gameState: GameStateProps) => {
	for (let i = gameState.lasers.length - 1; i >= 0; i--) {
		const laser = gameState.lasers[i];
		for (let j = gameState.bricks.length - 1; j >= 0; j--) {
			const brick = gameState.bricks[j];
			if (checkBrickCollision(laser, [brick])) {
				gameState.lasers.splice(i, 1);
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
		}
		if (laser.position.y < 0) gameState.lasers.splice(i, 1);
		moveLaser(laser);
	}
};
