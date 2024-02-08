import { GameStateProps, LaserProps } from "../../HelperFunctions/GameTypes";

const createLeftLaser = (gameState: GameStateProps) => {
    const newLeftLaser: LaserProps = {
        type: "laser",
        color: "green",
        id: gameState.lasers.length + 1,
        position: {
            x: gameState.paddle.position.x,
            y: gameState.paddle.position.y,
        },
        width: 5,
        height: 15,
        size: 5,
        speed: 15,
        velocity: {
            y: -1,
            x: 0,
        },
    };
    return newLeftLaser;
};

const createRightLaser = (gameState: GameStateProps) => {
    const newRightLaser: LaserProps = {
        type: "laser",
        color: "green",
        id: gameState.lasers.length + 1,
        position: {
            x: gameState.paddle.position.x + gameState.paddle.width,
            y: gameState.paddle.position.y,
        },
        width: 5,
        height: 15,
        size: 5,
        speed: 15,
        velocity: {
            y: -1,
            x: 0,
        },
    };
    return newRightLaser;
};

export const createLasers = (gameState: GameStateProps) => {
    gameState.lasers.push(createLeftLaser(gameState));
    gameState.lasers.push(createRightLaser(gameState));
}