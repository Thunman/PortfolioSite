import { EmptyBrickProps, BrickSettingsProps } from "./GameTypes";

const brickSettings: BrickSettingsProps = {
  _padding: 20,
  _width: 100,
  _height: 50,
  _spacing: 1,
  setHeight(number) {
    this._height = number;
  },
  setPadding(number) {
    this._padding = number;
  },
  setSpaceing(number) {
    this._spacing = number;
  },
  setWidth(number) {
    this._width = number;
  },
};

export const createTable = (
  brickSettings: BrickSettingsProps,
  canvas: HTMLCanvasElement
) => {
  const nrOfRows = Math.floor(
    (canvas.height * 0.75 - brickSettings._padding * 2) /
      (brickSettings._height + brickSettings._spacing)
  );
  const nrOfCols = Math.floor(
    (canvas.width - brickSettings._padding * 2) /
      (brickSettings._width + brickSettings._spacing)
  );
  let bricks: EmptyBrickProps[][] = [];

  for (let row = 0; row < nrOfRows; row++) {
    let brickRow: EmptyBrickProps[] = [];
    for (let col = 0; col < nrOfCols; col++) {
      brickRow.push(createEmptyBrick(row, col, brickSettings));
    }
    bricks.push(brickRow);
  }
  return bricks;
};

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
      hp: 1,
      width: brickSettings._width,
      height: brickSettings._height,
      position: {
        x: x,
        y: y,
      },
      getColor() {
        if(this.hp === 1) return "red"
        else return "green"
      },
      handleClick() {
          if(this.hp === 1) this.hp = 2;
          else if(this.hp === 2) this.hp = 1;
      },
    };
    return newBrick;
  };
})();
