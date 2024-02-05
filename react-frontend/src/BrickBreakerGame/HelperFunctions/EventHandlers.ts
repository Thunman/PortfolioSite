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

const addKeyListeners = (keys: Set<string>, flags: FlagProps) => {
    const keyHandler = (e: KeyboardEvent) => {
        if (e.type === "keydown") {
            keys.add(e.key);
        } else if (e.type === "keyup") {
            keys.delete(e.key);
        }
        if (e.type === "keypress") {
            if (e.key === " ") {
                flags.launchBall = true;
            }
            if (e.key === "d") {
                flags.debuggMode = !flags.debuggMode;
            }
        }
    };

    window.addEventListener("keydown", keyHandler);
    window.addEventListener("keyup", keyHandler);
    window.addEventListener("keypress", keyHandler);
    return keyHandler;
};

const addMouseClickListener = (canvas: HTMLCanvasElement, flags: FlagProps) => {
    const listener = () => {
        if (document.pointerLockElement === canvas) {
            flags.launchBall = true;
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
    keyHandler = addKeyListeners(gameState.keys, gameState.flags);
    mouseClickListener = addMouseClickListener(canvas, gameState.flags);
};

export const removeEventHandlers = (canvas: HTMLCanvasElement) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("keydown", pointerLockCancelListener);
    document.removeEventListener("keyup", keyHandler);
    document.removeEventListener("keypress", keyHandler);
    canvas.removeEventListener("click", canvasClickListener);
    canvas.removeEventListener("click", mouseClickListener);
};