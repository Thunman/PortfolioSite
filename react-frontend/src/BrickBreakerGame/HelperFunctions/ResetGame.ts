import { GameStateProps } from "./GameTypes";



export const resetGame = (gameState: GameStateProps) => {
    gameState.balls = [];
    gameState.start = false;
    gameState.bricks = [];
    gameState.powerUps = [];
    gameState.flags.launchBall = false;
    gameState.lasers = [];
    gameState.paddle.ammo = 0;
    gameState.paddle.hasGuns = false;
};