export type CircleProps = {
    color: string;
    id: number;
    top: string;
    left: string;
};
export type GameStateProps = {
    score: number;
    timeLeft: number;
    circles: CircleProps[];
};