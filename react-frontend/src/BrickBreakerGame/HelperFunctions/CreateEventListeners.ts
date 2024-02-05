import { PaddleProps } from "./GameTypes";

export const addCanvasClickListener = (canvas: HTMLCanvasElement) => {
	canvas.addEventListener("click", () => canvas.requestPointerLock());
};

export const addMouseMoveListener = (
	canvas: HTMLCanvasElement,
	paddle: PaddleProps
) => {
	document.addEventListener("mousemove", (e) => {
		if (document.pointerLockElement === canvas) {
			paddle.position.x += e.movementX;
			if (paddle.position.x > canvas.width - paddle.width) {
				paddle.position.x = canvas.width - paddle.width;
			}
			if (paddle.position.x < 0) {
				paddle.position.x = 0;
			}
		}
	});
};


export const addPointerLockCancelListener = () => {
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			document.exitPointerLock();
		}
	});
};
export const addMoveKeyListener = (keys: Set<string>) => {
	window.addEventListener("keydown", (e) => {
		keys.add(e.key);
	});
	window.addEventListener("keyup", (e) => {
		keys.delete(e.key);
	});
};
