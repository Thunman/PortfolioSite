import { BrickProps, BrickSettingsProps, EmptyBrickProps } from "./GameTypes";

export const createBrickArrays = (
	canvas: HTMLCanvasElement,
	brickSettings: BrickSettingsProps,
	empty: boolean = true
) => {
	let flag = 0;
	if (!empty) {
		flag = 1;
	}
	const nrOfRows = Math.floor(
		(canvas.height * 0.75 - brickSettings._padding * 2) /
			(brickSettings._height + brickSettings._spacing)
	);
	const nrOfCols = Math.floor(
		(canvas.width - brickSettings._padding * 2) /
			(brickSettings._width + brickSettings._spacing)
	);
	let bricks: number[][] = [];

	for (let row = 0; row < nrOfRows; row++) {
		let brickRow: number[] = [];
		for (let col = 0; col < nrOfCols; col++) {
			brickRow.push(flag);
		}
		bricks.push(brickRow);
	}
	return bricks;
};

export const applyRandomPatternToBricks = (bricks: number[][]): number[][] => {
	for (let row = 0; row < bricks.length; row++) {
		for (let col = 0; col < bricks[row].length; col++) {
			bricks[row][col] = Math.round(Math.random());
		}
	}
	return bricks;
};

export const createBricks = (
	brickArrays: number[][],
	brickSettings: BrickSettingsProps
) => {
	let bricks = [];
	for (let row = 0; row < brickArrays.length; row++) {
		for (let col = 0; col < brickArrays[row].length; col++) {
			if (brickArrays[row][col] === 1) {
				bricks.push(createBrick(row, col, brickSettings));
			}
		}
	}
	return bricks;
};

const createBrick = (() => {
	let id = 0;
	return (row: number, col: number, brickSettings: BrickSettingsProps) => {
		const x =
			brickSettings._padding +
			col * (brickSettings._width + brickSettings._spacing);
		const y =
			brickSettings._padding +
			row * (brickSettings._height + brickSettings._spacing);

		const newBrick: BrickProps = {
			id: id++,
			hp: 1,
			width: brickSettings._width,
			height: brickSettings._height,
			position: {
				x: x,
				y: y,
			},
			getColor() {
				let baseColor = 64;
				let decrement = 5;
				let colorValue = baseColor - (this.hp - 1) * decrement;
				colorValue = Math.max(colorValue, 0);
				let colorString = colorValue.toString(16);
				colorString =
					colorString.length < 2 ? "0" + colorString : colorString;
				return "#" + colorString + colorString + "80";
			},
		};
		return newBrick;
	};
})();

const createEmptyBrick = (() => {
	let id = 0;
	return (row: number, col: number, brickSettings: BrickSettingsProps) => {
		const x =
			brickSettings._padding +
			col * (brickSettings._width + brickSettings._spacing);
		const y =
			brickSettings._padding +
			row * (brickSettings._height + brickSettings._spacing);

		const newBrick: EmptyBrickProps = {
			id: id++,
			hp: 1,
			width: brickSettings._width,
			height: brickSettings._height,
			position: {
				x: x,
				y: y,
			},
			getColor() {
				if (this.hp === 1) {
					return "black";
				} else {
					return "green";
				}
			},
			handleClick() {
				this.hp = this.hp === 1 ? 2 : 1;
			},
		};
		return newBrick;
	};
})();

export const createEmptyBricks = (
  brickArrays: number[][],
	brickSettings: BrickSettingsProps
) => {
  let bricks = [];
	for (let row = 0; row < brickArrays.length; row++) {
		for (let col = 0; col < brickArrays[row].length; col++) {
			if (brickArrays[row][col] === 1) {
				bricks.push(createEmptyBrick(row, col, brickSettings));
			}
		}
	}
	return bricks;
};


export const drawBrick = (brick: BrickProps, ctx: CanvasRenderingContext2D) => {
	ctx.beginPath();
	ctx.rect(brick.position.x, brick.position.y, brick.width, brick.height);
	ctx.fillStyle = brick.getColor();
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "black";
	ctx.font = "12px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	const textX = brick.position.x + brick.width / 2;
	const textY = brick.position.y + brick.height / 2;
	ctx.fillText(brick.hp.toString(), textX, textY);
};
export const drawEmptyBrick = (
	brick: EmptyBrickProps,
	ctx: CanvasRenderingContext2D
) => {
	ctx.beginPath();
	ctx.rect(brick.position.x, brick.position.y, brick.width, brick.height);
	ctx.fillStyle = brick.getColor();
	ctx.fill();
	ctx.stroke();
};
