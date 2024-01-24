export type CircleProps = {
    color: string;
    id: number;
    x: number;
    y: number;
    radius: number;

};
export type GameStateProps = {
    score: number;
    timeLeft: number;
    circles: CircleProps[];
};