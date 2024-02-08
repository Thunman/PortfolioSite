import { LaserProps } from "../../HelperFunctions/GameTypes";


export const moveLaser = (laser: LaserProps) => {
    const velocity = {
		y: laser.velocity.y * laser.speed,
	};
	laser.position.y += velocity.y;
	laser.position.x = Math.round(laser.position.x);
	laser.position.y = Math.round(laser.position.y);
	
}