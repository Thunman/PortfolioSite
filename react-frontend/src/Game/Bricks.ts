import { BrickProps } from "../components/GameTypes";

export const createBricks = (canvas: HTMLCanvasElement) => {
  const paddingTop = 20;
  const paddingLeft = 20;
  const paddingRight = 20;
  const width = 25;
  const height = 15;
  const spacing = 1;
  const nrOfRows = 6;

  let bricks: BrickProps[] = [];
  let id = 0;
  for (let row = 0; row < nrOfRows; row++) {
    for (
      let col = 0;
      col < (canvas.width - paddingLeft - paddingRight) / (width + spacing);
      col++
    ) {
      const x = paddingLeft + col * (width + spacing);
      const y = paddingTop + row * (height + spacing);

      let hp: number;
      switch (row) {
        case 0:
        case 1:
          hp = 3;
          break;
        case 2:
        case 3:
          hp = 2;
          break;
        case 4:
        case 5:
          hp = 1;
          break;
        default:
          hp = 0;
      }

      const newBrick: BrickProps = {
        id: id,
        hp: hp,
        width: width,
        height: height,
        position: {
          x: x,
          y: y,
        },
        getColor() {
          switch (this.hp) {
            case 1:
              return "#404080"; 
            case 2:
              return "#202040"; 
            case 3:
              return "#000020"; 
            default:
              return "black";
          }
        },
      };
      id++;
      bricks.push(newBrick);
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
};
