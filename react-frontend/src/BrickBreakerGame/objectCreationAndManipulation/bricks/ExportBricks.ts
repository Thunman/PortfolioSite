import { EmptyBrickProps } from "../../HelperFunctions/GameTypes";

export const createExportArray = (bricks: EmptyBrickProps[][]) => {
	let exportArray: number[][] = [];
	for (let row = 0; row < bricks.length; row++) {
		let rowArray: number[] = [];
		for (let col = 0; col < bricks[row].length; col++) {
			if (bricks[row][col].hp !== 0) {
				rowArray.push(bricks[row][col].hp);
			} else {
				rowArray.push(0);
			}
		}
		exportArray.push(rowArray);
	}
	return exportArray;
};