import { GameProgressProps } from "../GameLogic/GameTypes";
import { gameStateSchema, scoreSchema } from "../Schemas/yupSchemas";

export const saveState = async (gameState: GameProgressProps) => {
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
    let randomNr;
    if (Math.random() < 0.1) {
        randomNr = 0;
    } else {
        randomNr = Math.floor(Math.random() * 5) + 1;
    }
    switch (randomNr) {
        case 1: return "#FF6347"; 
        case 2: return "#3CB371"; 
        case 3: return "#1E90FF"; 
        case 4: return "#9370DB"; 
        case 5: return "#FFD700"; 
        default: return "gold"; 
    }
};
