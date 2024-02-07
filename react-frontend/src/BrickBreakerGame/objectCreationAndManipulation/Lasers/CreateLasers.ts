import { GameStateProps, LaserProps } from "../../HelperFunctions/GameTypes";

export const createLaser = (gameState: GameStateProps) => {
    const newLaser: LaserProps = {
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
    return newLaser;
};