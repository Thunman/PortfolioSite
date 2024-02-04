import { PaddleProps } from "../../HelperFunctions/GameTypes";

export const createPaddle = (canvas: HTMLCanvasElement) => {
	const paddle: PaddleProps = {
		color: "#202040",
		position: {
			x: canvas.width / 2,
			y: canvas.height - 50,
		},
		width: canvas.width * 0.1,
		height: 25,
	};
	return paddle;
};

export const biggerPaddle = (
	paddle: PaddleProps,
	canvas: HTMLCanvasElement
) => {
	paddle.width = canvas.width * 0.2;
};