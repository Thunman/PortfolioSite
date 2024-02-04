import { BallProps, PaddleProps } from "../../HelperFunctions/GameTypes";

export const moveBall = (
	ball: BallProps,
	paddle: PaddleProps,
	launchBall: boolean
) => {
	const speedMultiplier = 15;
	if (launchBall) {
		ball.velocity = {
			x: ball.velocity.x || 0 * speedMultiplier,
			y: ball.velocity.y || -1 * speedMultiplier,
		};
	}

	if (!launchBall) {
		ball.position.x = paddle.position.x + paddle.width / 2;
		ball.position.y = paddle.position.y - ball.size;
	} else {
		ball.position.x += ball.velocity.x;
		ball.position.y += ball.velocity.y;
	}

	ball.position.x = Math.round(ball.position.x);
	ball.position.y = Math.round(ball.position.y);
};