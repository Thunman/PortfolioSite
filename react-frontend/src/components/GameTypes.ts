export type CircleProps = {
    color: string;
    id: number;
    top: number;
    left: number;
    radius: number;
    x: number;
    y: number;
};
export type GameStateProps = {
    score: number;
    timeLeft: number;
    circles: CircleProps[];
};