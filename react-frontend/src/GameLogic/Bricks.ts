import { BrickProps } from "./GameTypes";

export const createBricks = (canvas: HTMLCanvasElement, level: number) => {
  const paddingTop = 20;
  const paddingLeft = 20;
  const paddingRight = 20;
  const width = 25;
  const height = 15;
  const spacing = 1;
  let nrOfRows = 6;

  let bricks: BrickProps[] = [];
  let id = 0;

  switch (level) {
    case 1:
      nrOfRows = 12;
      break;
    case 2:
      nrOfRows = 8;
      break;
    case 3:
      nrOfRows = 10;
      break;
    default:
      nrOfRows = 6;
  }

  for (let row = 0; row < nrOfRows; row++) {
    for (
      let col = 0;
      col < (canvas.width - paddingLeft - paddingRight) / (width + spacing);
      col++
    ) {
      const x = paddingLeft + col * (width + spacing);
      const y = paddingTop + row * (height + spacing);

      let hp: number;
      hp = nrOfRows - row;
      hp = hp < 1 ? 1 : hp; 

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
          let baseColor = 64;
          let decrement = 5; 
          let colorValue = baseColor - (this.hp - 1) * decrement;
          colorValue = Math.max(colorValue, 0); 
          let colorString = colorValue.toString(16); 
          colorString = colorString.length < 2 ? '0' + colorString : colorString; 
          return "#" + colorString + colorString + '80'; 
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
