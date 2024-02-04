import { BrickProps, EmptyBrickProps } from "../../HelperFunctions/GameTypes";

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
	ctx.fillStyle = "black";
	ctx.font = "12px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	const textX = brick.position.x + brick.width / 2;
	const textY = brick.position.y + brick.height / 2;
	const text = `${brick.hp} hp`;
	ctx.fillText(text, textX, textY);
};
