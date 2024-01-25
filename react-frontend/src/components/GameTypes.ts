export type CircleProps = {
    color: string;
    id: number;
    x: number;
    y: number;
    radius: number;
};

export type SquareProps = {
    color: string;
    id: number;
    x: number;
    y: number;
    sideLength: number;
    speed: number;
    dx: "left" | "right";
    dy: "up" | "down";
};

export type RectangleProps = {
     color: string;
     x: number;
     y: number;
     width: number;
     height: number;
};

export type GameStateProps = {
    score: number;
    timeLeft: number;
    circles: CircleProps[];
};