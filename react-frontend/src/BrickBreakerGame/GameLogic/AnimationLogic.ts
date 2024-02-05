import { GameStateProps } from "../HelperFunctions/GameTypes";
import { drawBall } from "../objectCreationAndManipulation/balls/DrawBalls";
import { drawBrick } from "../objectCreationAndManipulation/bricks/DrawBricks";
import { drawPaddle } from "../objectCreationAndManipulation/paddles/DrawPaddles";
import { drawPowerUps } from "../objectCreationAndManipulation/powerUps/DrawPowerUps";

export const animate = (
	gameState: GameStateProps,
	ctx: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	fps: number
) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
	ctx.shadowBlur = 10;
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 10;

	drawPaddle(gameState.paddle, ctx);
	gameState.balls.forEach((ball) => {
		drawBall(ball, ctx);
		if (gameState.flags.debuggMode) {
			ctx.fillStyle = "white";
			ctx.font = "24px Arial";
			ctx.fillText(`Vel x: ${ball.velocity.x.toFixed(0)}`, 45, 90);
			ctx.fillText(`Vel y: ${ball.velocity.y.toFixed(0)}`, 45, 120);
			ctx.fillText(`Pos x: ${ball.position.x.toFixed(0)}`, 45, 150);
			ctx.fillText(`Pos y: ${ball.position.y.toFixed(0)}`, 45, 180);
			ctx.fillText(`Speed: ${ball.speed}`, 45, 60);
			ctx.fillText(`FPS: ${Math.round(fps)}`, 45, 30);
		}
	});
	gameState.bricks.forEach((brick) => {
		drawBrick(brick, ctx);
	});
	gameState.powerUps.forEach((powerUp) => {
		drawPowerUps(powerUp, ctx);
	});
};