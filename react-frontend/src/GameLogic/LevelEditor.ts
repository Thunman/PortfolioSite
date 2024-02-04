import exp from "constants";
import {
	createBrickArrays,
	createEmptyBricks,
	createExportArray,
	drawEmptyBrick,
} from "./Bricks";
import { EmptyBrickProps, BrickSettingsProps } from "./GameTypes";

function levelEditor(
	canvas: HTMLCanvasElement,
	brickSettings: BrickSettingsProps
) {
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	let bricks: EmptyBrickProps[][] = [];

	const brickArrays = createBrickArrays(canvas, brickSettings, false);

	const animate = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let row = 0; row < bricks.length; row++) {
			for (let col = 0; col < bricks[row].length; col++) {
				drawEmptyBrick(bricks[row][col], ctx);
			}
		}
	};

	canvas.addEventListener("click", (e) => {
		const x = e.clientX - canvas.getBoundingClientRect().left;
		const y = e.clientY - canvas.getBoundingClientRect().top;
		bricks.flat().forEach((brick) => {
			if (
				x >= brick.position.x &&
				x <= brick.position.x + brick.width &&
				y >= brick.position.y &&
				y <= brick.position.y + brick.height
			) {
				brick.handleClick();
				animate();
			}
		});
	});

	const start = () => {
		bricks = createEmptyBricks(brickArrays, brickSettings);
		animate();
	};

	const exportLevel = () => {
		const level = createExportArray(bricks);
		return level;
	};

	return { start, exportLevel };
}
export default levelEditor;
