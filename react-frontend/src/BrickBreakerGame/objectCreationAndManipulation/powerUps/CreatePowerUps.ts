import { BrickProps, PowerUpProps } from "../../HelperFunctions/GameTypes";


export const randomPowerUp = (powerUps: PowerUpProps[], brick: BrickProps) => {
	const randomNr = Math.floor(Math.random() * 5);
	switch (randomNr) {
		case 0:
			return {
				id: powerUps.length,
				type: "addBall",
				text: "+1",
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

		case 1:
			return {
				id: powerUps.length,
				type: "biggerPaddle",
				text: "<-->",
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
		case 2:
			return {
				id: powerUps.length,
				type: "smallerPaddle",
				text: "-><-",
				position: {
					x: brick.position.x,
					y: brick.position.y,
				},
				color: "red",
				size: 35,
				speed: 5,
				velocity: {
					y: 1,
				},
			};
		case 3:
			return {
				id: powerUps.length,
				type: "speedUp",
				text: ">>>>",
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
		case 4:
			return {
				id: powerUps.length,
				type: "slowDown",
				text: "<<<<",
				position: {
					x: brick.position.x,
					y: brick.position.y,
				},
				color: "red",
				size: 35,
				speed: 5,
				velocity: {
					y: 1,
				},
			};
		default:
			return {
				id: powerUps.length,
				type: "addBall",
				text: "+1",
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
	}
};
