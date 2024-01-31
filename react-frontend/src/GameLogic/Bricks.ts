import { BrickProps } from "./GameTypes";

export const createBricks = (canvas: HTMLCanvasElement, level: number) => {
  const paddingTop = 20;
  const paddingLeft = 20;
  const paddingRight = 20;
  const width = 25;
  const height = 15;
  const spacing = 1;
  const nrOfRows = level * 2;

  let bricks: BrickProps[] = [];
  let brickId = 0;

  



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
        id: brickId,
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
      brickId++;
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
  ctx.fillStyle = "black";
  ctx.font = "12px Arial"; 
  ctx.textAlign = "center"; 
  ctx.textBaseline = "middle"; 
  const textX = brick.position.x + brick.width / 2;
  const textY = brick.position.y + brick.height / 2;
  ctx.fillText(brick.hp.toString(), textX, textY);
};
