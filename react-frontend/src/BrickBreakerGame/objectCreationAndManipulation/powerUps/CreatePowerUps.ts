import { BrickProps, PowerUpProps } from "../../HelperFunctions/GameTypes";

export const createPowerUp = (powerUps: PowerUpProps[], brick: BrickProps) => {
	const randomPowerUp = () => {
		const randomNr = Math.random();
		if (randomNr < 0.51) return "+1";
		else return "<->";
	};
	const newPowerUp: PowerUpProps = {
		id: powerUps.length,
		text: randomPowerUp(),
		position: {
			x: brick.position.x,
			y: brick.position.y,
		},
		color: "yellow",
		size: 35,
		speed: 5,
		velocity: {
			y: 1,
		},
	};
	return newPowerUp;
};