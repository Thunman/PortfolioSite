import {
	BrickProps,
	BrickSettingsProps,
	EmptyBrickProps,
} from "../../HelperFunctions/GameTypes";

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
		canvas.width / (brickSettings._width + brickSettings._spacing)
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

export const createBricks = (
	brickArrays: number[][],
	brickSettings: BrickSettingsProps
) => {
	let bricks = [];
	for (let row = 0; row < brickArrays.length; row++) {
		for (let col = 0; col < brickArrays[row].length; col++) {
			if (brickArrays[row][col] !== 0) {
				bricks.push(
					createBrick(row, col, brickSettings, brickArrays[row][col])
				);
			}
		}
	}
	return bricks;
};

const createBrick = (() => {
	let id = 0;
	return (
		row: number,
		col: number,
		brickSettings: BrickSettingsProps,
		hp: number
	) => {
		const x =
			brickSettings._padding +
			col * (brickSettings._width + brickSettings._spacing);
		const y =
			brickSettings._padding +
			row * (brickSettings._height + brickSettings._spacing);

		const newBrick: BrickProps = {
			id: id++,
			hp: hp,
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
			hp: 0,
			width: brickSettings._width,
			height: brickSettings._height,
			position: {
				x: x,
				y: y,
			},
			getColor() {
				if (this.hp === 0) {
					return "red";
				} else {
					return "green";
				}
			},
			handleLeftClick() {
				this.hp = this.hp + 1;
			},
			handleRightClick() {
				if (this.hp > 0) {
					this.hp = this.hp - 1;
				}
			},
		};
		return newBrick;
	};
})();

export const createEmptyBricks = (
	brickArrays: number[][],
	brickSettings: BrickSettingsProps
): EmptyBrickProps[][] => {
	let bricks: EmptyBrickProps[][] = [];
	for (let row = 0; row < brickArrays.length; row++) {
		let rowBricks: EmptyBrickProps[] = [];
		for (let col = 0; col < brickArrays[row].length; col++) {
			if (brickArrays[row][col] === 1) {
				rowBricks.push(createEmptyBrick(row, col, brickSettings));
			}
		}
		bricks.push(rowBricks);
	}
	return bricks;
};
