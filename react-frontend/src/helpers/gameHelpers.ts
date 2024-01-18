import { GameStateProps } from "../components/GameTypes";
import { gameStateSchema, scoreSchema } from "../Schemas/yupSchemas";

export const saveState = async (gameState: GameStateProps) => {
    try {
        await gameStateSchema.validate(gameState);

        
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        const response = await fetch("/api/users/saveGameState", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email,
                gameState
            })
        });
        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        
        alert(data.message);


    } catch (error) {
        alert(error);
    }
};

export const saveScore = async (score: number) => {
    try {
        await scoreSchema.validate({ email: localStorage.getItem("email"), score });
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        const response = await fetch("/api/users/saveHighScore", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email,
                score
            })
        });
        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert(error);
    }
};


export const randomColorPicker = () => {
    let randomNr = Math.floor(Math.random() * 3) + 1;
    switch (randomNr) {
        case 1: return "red";
        case 2: return "green";
        case 3: return "blue";
        default: return "white";
    }
};
