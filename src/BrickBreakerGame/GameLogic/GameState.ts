import {
	BallProps,
	BrickProps,
	GameStateProps,
	LaserProps,
	PaddleProps,
	PowerUpProps,
} from "../HelperFunctions/GameTypes";

export let gameState: GameStateProps = {
	start: false,
	keys: new Set<string>(),
	balls: [] as BallProps[],
	bricks: [] as BrickProps[],
	powerUps: [] as PowerUpProps[],
	paddle: {} as PaddleProps,
	flags: { launchBall: false, debuggMode: false},
	lastTime: 0,
	timeStamp: 0,
	lasers: [] as LaserProps[],
};
