import { GameState } from "../components/GameTypes";
import { gameStateSchema } from "../Schemas/joiSchemas";

export const saveState = async (gameState: GameState) => {

    const { error } = gameStateSchema.validate(gameState);

    if (error) {
        alert(error.details)
    } else {
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
        const data = await response.json();
        alert(data.message);
    };
};


export const randomColorPicker = () => {
    let randomNr = Math.floor(Math.random() * 3) + 1;
    switch (randomNr) {
        case 1: return "red"
        case 2: return "green"
        case 3: return "blue"
        default: return "white"
    }
}