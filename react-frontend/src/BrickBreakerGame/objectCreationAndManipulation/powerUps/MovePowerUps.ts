import { PowerUpProps } from "../../HelperFunctions/GameTypes";



export const movePowerUp = (powerUp: PowerUpProps) => {
	const velocity = {
		y: powerUp.velocity.y * powerUp.speed,
	};
	powerUp.position.y += velocity.y;
	powerUp.position.x = Math.round(powerUp.position.x);
	powerUp.position.y = Math.round(powerUp.position.y);
	powerUp.velocity.y = velocity.y > 0 ? 1 : -1;
};
