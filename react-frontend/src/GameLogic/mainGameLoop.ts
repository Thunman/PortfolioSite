import { createBall, drawBall, moveBall } from "./Balls";
import {
	applyRandomPatternToBricks,
	createBrickArrays,
	createBricks,
	drawBrick,
} from "./Bricks";
import {
	checkBorderCollision,
	checkPaddleCollision,
	checkBrickCollision,
	checkOutOfBounds,
	checkPowerUpCollision,
} from "./CollisionLogic";
import { biggerPaddle, createPaddle, drawPaddle } from "./Paddle";
import {
	BallProps,
	PaddleProps,
	BrickProps,
	PowerUpProps,
	BrickSettingsProps,
} from "./GameTypes";
import { createPowerUp, drawPowerUps, movePowerUp } from "./PowerUps";
import {
	addCanvasClickListener,
	addMouseMoveListener,
	addMoveKeyListener,
	addPointerLockCancelListener,
} from "./EventListeners";

function game(canvas: HTMLCanvasElement, brickArrays: number[][]) {
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	let start = false;
	let score = 0;
	let keys: Set<string> = new Set();
	let balls: BallProps[] = [];
	let bricks: BrickProps[] = [];
	let powerUps: PowerUpProps[] = [];
	let launchBall = false;
	let paddle: PaddleProps;
	let gameLevel = 1;

	const brickSettings: BrickSettingsProps = {
		_padding: 20,
		_width: 100,
		_height: 50,
		_spacing: 1,
	};

	const animate = (paddle: PaddleProps, balls: BallProps[]) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 10;

		drawPaddle(paddle, ctx);
		balls.forEach((ball) => {
			drawBall(ball, ctx);
		});
		bricks.forEach((brick) => {
			drawBrick(brick, ctx);
		});
		powerUps.forEach((powerUp) => {
			drawPowerUps(powerUp, ctx);
		});
	};

	document.addEventListener("keydown", (event) => {
		if (event.key === " ") {
			launchBall = true;
			console.log(launchBall);
		}
	});

	const resetGame = () => {
		balls = [];
		start = false;
		score = 0;
		bricks = [];
		powerUps = [];
		launchBall = false;
	};

	const gameOver = () => {
		alert("Game Over");
	};
	const levelComplete = () => {
		alert("Level Complete!");
		gameLevel++;
		resetGame();
	};

	const gameLoop = (balls: BallProps[], paddle: PaddleProps) => {
		if (start) {
			const maxPaddleX = canvas.width - paddle.width;
			if (keys.has("ArrowRight") && paddle.position.x < maxPaddleX) {
				paddle.position.x += 15;
			}
			if (keys.has("ArrowLeft") && paddle.position.x > 0) {
				paddle.position.x -= 15;
			}
			for (let i = powerUps.length - 1; i >= 0; i--) {
				const powerUp = powerUps[i];
				movePowerUp(powerUp);
				const powerUpGain = checkPowerUpCollision(paddle, powerUp, canvas);
				if (powerUpGain.collision || powerUpGain.outsideCanvas) {
					if (powerUpGain.text === "+1") {
						balls.push(createBall(balls, paddle, canvas));
					} else if (powerUpGain.text === "<->") {
						biggerPaddle(paddle, canvas);
					}
					powerUps.splice(i, 1);
				}
			}
			for (let i = balls.length - 1; i >= 0; i--) {
				const ball = balls[i];
				for (let j = bricks.length - 1; j >= 0; j--) {
					const brick = bricks[j];
					checkBrickCollision(ball, [brick]);
					if (brick.hp <= 0) {
						const randomNr = parseFloat(Math.random().toFixed(2));
						if (randomNr < 0.75) {
							powerUps.push(createPowerUp(powerUps, brick));
						}
						bricks.splice(j, 1);
						if (bricks.length <= 0) {
							levelComplete();
						}
					}
				}
				moveBall(ball, paddle, launchBall);
				checkPaddleCollision(paddle, ball);
				checkBorderCollision(ball, canvas);
				if (checkOutOfBounds(ball, canvas)) {
					balls.splice(i, 1);
					continue;
				}
			}
			if (balls.length === 0) {
				start = false;
				gameOver();
			}
			animate(paddle, balls);
			requestAnimationFrame(() => gameLoop(balls, paddle));
		}
	};
	const startGame = () => {
		resetGame();
		paddle = createPaddle(canvas);
		bricks = createBricks(brickArrays, brickSettings);
		balls.push(createBall(balls, paddle, canvas));
		addCanvasClickListener(canvas);
		addMouseMoveListener(canvas, paddle);
		addPointerLockCancelListener();
		addMoveKeyListener(keys);
		start = true;
		gameLoop(balls, paddle);
	};

	const getScore = () => score;
	return { startGame, getScore };
}
export default game;
