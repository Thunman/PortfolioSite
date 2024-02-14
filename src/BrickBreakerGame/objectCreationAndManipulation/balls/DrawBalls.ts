import { BallProps } from "../../HelperFunctions/GameTypes";

export const drawBall = (ball: BallProps, ctx: CanvasRenderingContext2D) => {
	ctx.beginPath();
	const x = ball.position.x;
	const y = ball.position.y;
	const radius = ball.size / 2;
	const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
	gradient.addColorStop(0, "white");
	gradient.addColorStop(1, ball.color);
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	ctx.fillStyle = gradient;
	ctx.fill();
	ctx.stroke();
};