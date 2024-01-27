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

export type RectangleProps = {
     color: string;
     position: {
        x: number;
        y: number;
    };
     width: number;
     height: number;
};

export type GameStateProps = {
    score: number;
    timeLeft: number;
    circles: CircleProps[];
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
    size: number;
};