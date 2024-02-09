import { FlagProps, GameStateProps, PaddleProps } from "./GameTypes";

let handleMouseMove: (e: MouseEvent) => void;

const addCanvasClickListener = (canvas: HTMLCanvasElement) => {
    const listener = () => canvas.requestPointerLock();
    canvas.addEventListener("click", listener);
    return listener;
};

const createMouseMoveHandler = (canvas: HTMLCanvasElement, paddle: PaddleProps) => {
    return (e: MouseEvent) => {
        if (document.pointerLockElement === canvas) {
            paddle.position.x += e.movementX;
            if (paddle.position.x > canvas.width - paddle.width) {
                paddle.position.x = canvas.width - paddle.width;
            }
            if (paddle.position.x < 0) {
                paddle.position.x = 0;
            }
        }
    };
};

const addMouseMoveListener = (canvas: HTMLCanvasElement, paddle: PaddleProps) => {
    handleMouseMove = createMouseMoveHandler(canvas, paddle);
    document.addEventListener("mousemove", handleMouseMove);
};

const addPointerLockCancelListener = () => {
    const listener = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            document.exitPointerLock();
        }
    };
    document.addEventListener("keydown", listener);
    return listener;
};

const addKeyListeners = (gameState: GameStateProps) => {
    const keyHandler = (e: KeyboardEvent) => {
        if (e.type === "keydown") {
            gameState.keys.add(e.key);
        } else if (e.type === "keyup") {
            gameState.keys.delete(e.key);
        }
        if (e.type === "keypress") {
            if (e.key === " ") {
                if(gameState.flags.launchBall !== true){
                    gameState.flags.launchBall = true;
                }
                if (gameState.paddle.hasGuns) {
                    gameState.paddle.fireGuns();
                }
            }
            if (e.key === "d") {
                gameState.flags.debuggMode = !gameState.flags.debuggMode;
				console.log("debugmode: ", gameState.flags.debuggMode);
            }
            
        }
    };

    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keyup", keyHandler);
    window.addEventListener("keypress", keyHandler);
    return keyHandler;
};

const addMouseClickListener = (canvas: HTMLCanvasElement, gameState: GameStateProps) => {
    const listener = () => {
        if (document.pointerLockElement === canvas) {
            if(gameState.flags.launchBall !== true){
                gameState.flags.launchBall = true;
            }
            if (gameState.paddle.hasGuns) {
                gameState.paddle.fireGuns();
            }
        }
    };
    canvas.addEventListener("click", listener);
    return listener;
};

let keyHandler: (e: KeyboardEvent) => void;
let canvasClickListener: () => void;
let mouseClickListener: () => void;
let pointerLockCancelListener: (e: KeyboardEvent) => void;

export const addEventHandlers = (gameState: GameStateProps, canvas: HTMLCanvasElement) => {
    canvasClickListener = addCanvasClickListener(canvas);
    addMouseMoveListener(canvas, gameState.paddle);
    pointerLockCancelListener = addPointerLockCancelListener();
    keyHandler = addKeyListeners(gameState);
    mouseClickListener = addMouseClickListener(canvas, gameState);
};

export const removeEventHandlers = (canvas: HTMLCanvasElement) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("keydown", pointerLockCancelListener);
    document.removeEventListener("keyup", keyHandler);
    document.removeEventListener("keypress", keyHandler);
    canvas.removeEventListener("click", canvasClickListener);
    canvas.removeEventListener("click", mouseClickListener);
};