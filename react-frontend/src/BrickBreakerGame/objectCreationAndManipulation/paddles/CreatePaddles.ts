import { GameStateProps, PaddleProps } from "../../HelperFunctions/GameTypes";
import { createLasers } from "../Lasers/CreateLasers";

export const createPaddle = (canvas: HTMLCanvasElement, gameState: GameStateProps) => {
	const paddle: PaddleProps = {
		color: "#202040",
		position: {
			x: canvas.width / 2,
			y: canvas.height - 50,
		},
		width: canvas.width * 0.1,
		height: 25,
		hasGuns: false,
		ammo: 0,
		activateLaser() {
			this.hasGuns = true;
            this.ammo += 10;
        },
		fireGuns(){
			if(this.ammo > 0 && this.hasGuns){
				this.ammo -= 1;
				createLasers(gameState);
				if(this.ammo <= 0){
					this.deactivateLaser();
				}
			}
		},
		deactivateLaser() {
				this.hasGuns = false;
			
			
		}
	};

	return paddle;
};
export const biggerPaddle = (
	paddle: PaddleProps,
	canvas: HTMLCanvasElement
) => {
	if (paddle.width < canvas.width * 0.5) {
		paddle.width = paddle.width * 1.2;
	}
};
export const smallerPaddle = (
	paddle: PaddleProps,
	canvas: HTMLCanvasElement
) => {
	if (paddle.width > canvas.width * 0.05) {
		paddle.width = paddle.width * 0.8;
	}
}
