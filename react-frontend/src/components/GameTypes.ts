export type Circle = {
    color: string;
    id: number;
    top: string;
    left: string;
};
export type GameState = {
    score: number;
    timeLeft: number;
    circles: Circle[];
};