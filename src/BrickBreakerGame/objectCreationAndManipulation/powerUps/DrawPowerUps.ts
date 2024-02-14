import { PowerUpProps } from "../../HelperFunctions/GameTypes";

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
	ctx.font = "24px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	const textX = x + width / 2;
	const textY = y + height / 2;
	ctx.fillText(powerUp.text, textX, textY);
};
