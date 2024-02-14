import {
	BallProps,
	BrickProps,
	LaserProps,
	PaddleProps,
	PowerUpProps,
} from "../HelperFunctions/GameTypes";

export const checkPaddleCollision = (
	paddle: PaddleProps,
	ball: BallProps & { size: number }
) => {
	const distX = Math.abs(
		ball.position.x - paddle.position.x - paddle.width / 2
	);
	const distY = Math.abs(
		ball.position.y - paddle.position.y - paddle.height / 2
	);
	if (
		distX <= paddle.width / 2 + ball.size &&
		distY <= paddle.height / 2 + ball.size
	) {
		let hitPoint =
			(ball.position.x - (paddle.position.x + paddle.width / 2)) /
			(paddle.width / 2);
		hitPoint = hitPoint || 0.01;
		let angle = hitPoint * (Math.PI / 4);
		let speed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2);
		ball.velocity.x = speed * Math.sin(angle);
		ball.velocity.y = -speed * Math.cos(angle);
	}
};

export const checkBorderCollision = (
	ball: BallProps,
	canvas: HTMLCanvasElement
) => {
	if (
		ball.position.x < 0 ||
		canvas.width - (ball.position.x + ball.size) < 0
	) {
		ball.velocity.x *= -1;
	}
	if (ball.position.y < 0) {
		ball.velocity.y *= -1;
	}
};

export const checkOutOfBounds = (
	ball: BallProps,
	canvas: HTMLCanvasElement
) => {
	return canvas.height - (ball.position.y + ball.size) < 0;
};

export const checkBrickCollision = (
	projectile: BallProps | LaserProps,
	bricks: BrickProps[]
) => {
	for (let brick of bricks) {
		const distX = Math.abs(
			projectile.position.x - brick.position.x - brick.width / 2
		);
		const distY = Math.abs(
			projectile.position.y - brick.position.y - brick.height / 2
		);
		if (
			distX > brick.width / 2 + projectile.size + 2 ||
			distY > brick.height / 2 + projectile.size + 2
		) {
			continue;
		}
		if (projectile.type === "laser") {
			if (distY <= brick.height / 2) {
				brick.hp -= 1;
				return true;
			}
		} else {
			if (distX <= brick.width / 2) {
				projectile.velocity.y *= -1;
				brick.hp -= 1;
				return;
			}
			if (distY <= brick.height / 2) {
				projectile.velocity.x *= -1;
				brick.hp -= 1;
				return;
			}
			const dx = distX - brick.width / 2;
			const dy = distY - brick.height / 2;
			if (dx * dx + dy * dy <= projectile.size * projectile.size) {
				projectile.velocity.x *= -1;
				projectile.velocity.y *= -1;
				brick.hp -= 1;
				return;
			}
		}
	}
	return false;
};
export const checkPowerUpCollision = (
	paddle: PaddleProps,
	powerUp: PowerUpProps,
	canvas: HTMLCanvasElement
) => {
	const distX = Math.abs(
		powerUp.position.x - paddle.position.x - paddle.width / 2
	);
	const distY = Math.abs(
		powerUp.position.y - paddle.position.y - paddle.height / 2
	);

	let collisionResult;

	if (
		distX <= paddle.width / 2 + powerUp.size &&
		distY <= paddle.height / 2 + powerUp.size
	) {
		collisionResult = { collision: true, text: powerUp.text };
	} else if (powerUp.position.y > canvas.height) {
		collisionResult = { collision: false, outsideCanvas: true };
	} else {
		collisionResult = { collision: false, outsideCanvas: false };
	}
	return collisionResult;
};
