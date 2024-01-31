export type CircleProps = {
  color: string;
  id: number;
  x: number;
  y: number;
  radius: number;
};

export type BallProps = {
  color: string;
  id: number;
  position: {
    x: number;
    y: number;
  };
  size: number;
  speed: number;
  velocity: {
    x: number;
    y: number;
  };
};

export type PaddleProps = {
  color: string;
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
};

export type GameProgressProps = {
  level: number;
};

export type BrickProps = {
  id: number;
  hp: number;
  width: number;
  height: number;
  getColor: () => string;
  position: {
    x: number;
    y: number;
  };
};

export type EmptyBrickProps = {
  id: number;
  hp: number;
  width: number;
  height: number;
  getColor: () => string;
  handleClick: () => void;
  position: {
    x: number;
    y: number;
  };
};



export type PowerUpProps = {
  text: string;
  color: string;
  id: number;
  position: {
    x: number;
    y: number;
  };
  size: number;
  speed: number;
  velocity: {
    y: number;
  };
};

export type BrickSettingsProps = {
  _padding: number;
  _width: number;
  _height: number;
  _spacing: number;
  setPadding(number: number): void;
  setWidth(number: number): void;
  setHeight(number: number): void;
  setSpaceing(number: number): void;
};
