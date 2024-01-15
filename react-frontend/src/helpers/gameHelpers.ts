import { GameState } from "../components/GameTypes";
import { gameStateSchema } from "../Schemas/yupSchemas";

export const saveState = async (gameState: GameState) => {
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
        const data = await response.json();
        alert(data.message);


    } catch (error) {
        alert(error)
    }
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