import { LaserProps } from "../../HelperFunctions/GameTypes";

export const drawLaser = (laser: LaserProps, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.fillStyle = laser.color;
    ctx.fillRect(
        laser.position.x,
        laser.position.y,
        laser.width,
        laser.height
    );
    ctx.closePath();
};