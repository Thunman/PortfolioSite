import { BrickProps, PowerUpProps } from "./GameTypes";

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
		size: 15,
		speed: 5,
		velocity: {
			y: 1,
		},
	};
	return newPowerUp;
};

export const drawPowerUps = (
	powerUp: PowerUpProps,
	ctx: CanvasRenderingContext2D
) => {
	const cornerRadius = 5;
	ctx.beginPath();
	const x = powerUp.position.x;
	const y = powerUp.position.y;
	const width = powerUp.size;
	const height = powerUp.size;

	ctx.moveTo(x + cornerRadius, y);
	ctx.lineTo(x + width - cornerRadius, y);
	ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
	ctx.lineTo(x + width, y + height - cornerRadius);
	ctx.arcTo(
		x + width,
		y + height,
		x + width - cornerRadius,
		y + height,
		cornerRadius
	);
	ctx.lineTo(x + cornerRadius, y + height);
	ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
	ctx.lineTo(x, y + cornerRadius);
	ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
	ctx.fillStyle = powerUp.color;
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "black";
	ctx.font = "12px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	const textX = x + width / 2;
	const textY = y + height / 2;
	ctx.fillText(powerUp.text, textX, textY);
};

export const movePowerUp = (powerUp: PowerUpProps) => {
	const velocity = {
		y: powerUp.velocity.y * powerUp.speed,
	};
	powerUp.position.y += velocity.y;
	powerUp.position.x = Math.round(powerUp.position.x);
	powerUp.position.y = Math.round(powerUp.position.y);
	powerUp.velocity.y = velocity.y > 0 ? 1 : -1;
};
