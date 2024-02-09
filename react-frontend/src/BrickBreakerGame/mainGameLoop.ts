import {
	addEventHandlers,
	removeEventHandlers,
} from "./HelperFunctions/EventHandlers";
import {
	calculateFPS,
	shouldAnimate,
	resetFPS,
} from "./HelperFunctions/FpsCounter";
import { BrickSettingsProps } from "./HelperFunctions/GameTypes";
import { resetGame } from "./HelperFunctions/ResetGame";
import { createBricks } from "./objectCreationAndManipulation/bricks/CreateBricks";
import { createBall } from "./objectCreationAndManipulation/balls/CreateBalls";
import { createPaddle } from "./objectCreationAndManipulation/paddles/CreatePaddles";
import { handlePaddleMovements } from "./objectCreationAndManipulation/paddles/HandlePaddleMovements";
import { handleBallMovement } from "./objectCreationAndManipulation/balls/HandleBallMovement";
import { handlePowerUpGains } from "./objectCreationAndManipulation/powerUps/HandlePowerUpGains";
import { animate, drawLevel } from "./GameLogic/AnimationLogic";
import { gameState } from "./GameLogic/GameState";
import { handleLaserMovement } from "./objectCreationAndManipulation/Lasers/HandleLaserMovement";

function game(
	canvas: HTMLCanvasElement,
	brickArrays: number[][],
	brickSettings: BrickSettingsProps
) {
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	const gameLoop = () => {
		if (gameState.start) {
			requestAnimationFrame((timeStamp) => {
				gameState.timeStamp = timeStamp;
				gameLoop();
			});
			if (!shouldAnimate(gameState.timeStamp)) {
				return;
			}
			const fps = calculateFPS(gameState.timeStamp);
			handlePaddleMovements(gameState, canvas);
			handlePowerUpGains(canvas, gameState);
			handleBallMovement(gameState, canvas);
			handleLaserMovement(gameState);
			if (gameState.balls.length === 0) {
				gameState.start = false;
				alert("Game Over");
				removeEventHandlers(canvas);
				return;
			}
			if (gameState.bricks.length === 0) {
				gameState.start = false;
				alert("Level Complete!");
				removeEventHandlers(canvas);
				return;
			}
			animate(gameState, ctx, canvas, fps);
		}
	};

	const startGame = () => {
		console.log("startGame")
		resetGame(gameState);
		resetFPS();
		gameState.paddle = createPaddle(canvas, gameState);
		gameState.bricks = createBricks(brickArrays, brickSettings, canvas);
		gameState.balls.push(createBall(gameState, canvas));
		addEventHandlers(gameState, canvas);
		gameState.start = true;
		gameLoop();
	};
	const drawImportedLevel = () => {
		resetGame(gameState);
		resetFPS();
		gameState.bricks = createBricks(brickArrays, brickSettings, canvas);
		drawLevel(gameState, ctx, canvas);
		console.log("drawImportedLevel")

	};
	return { startGame, drawImportedLevel };
}
export default game;
