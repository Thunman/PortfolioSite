import { createBrickArrays, createEmptyBricks, drawEmptyBrick } from "./Bricks";
import { EmptyBrickProps, BrickSettingsProps } from "./GameTypes";

const brickSettings: BrickSettingsProps = {
	_padding: 20,
	_width: 100,
	_height: 50,
	_spacing: 1,
	setHeight(number) {
		this._height = number;
	},
	setPadding(number) {
		this._padding = number;
	},
	setSpacing(number) {
		this._spacing = number;
	},
	setWidth(number) {
		this._width = number;
	},
};

function levelEditor(canvas: HTMLCanvasElement) {
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	let bricks: EmptyBrickProps[] = [];

	const brickArrays = createBrickArrays(canvas, brickSettings, false);
	

	const animate = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		bricks.forEach((brick) => {
			drawEmptyBrick(brick, ctx);
		});
	};

	canvas.addEventListener("click", (e) => {
		const x = e.clientX - canvas.getBoundingClientRect().left;
		const y = e.clientY - canvas.getBoundingClientRect().top;
		const clickedBrick = bricks.find(
			(brick) =>
				x > brick.position.x &&
				x < brick.position.x + brick.width &&
				y > brick.position.y &&
				y < brick.position.y + brick.height
		);
		if (clickedBrick) {
			clickedBrick.handleClick();
			animate();
		}
	});

  const start = () => {
    bricks = createEmptyBricks(brickArrays, brickSettings);
    animate();
  };
  return { start };
}

export default levelEditor;
