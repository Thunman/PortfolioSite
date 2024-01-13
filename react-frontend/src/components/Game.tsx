// a simple browser game, it renders circles and when they are clicked they disapear and the score counter increments

import * as GameStyles from "../styles/GameStyles";
import { useEffect, useState } from "react";

interface Circle {
    color: string;
    id: number;
    top: string;
    left: string;
}

const Game = () => {

    const [score, setScore] = useState(0);
    const [circles, setCircles] = useState<Circle[]>([])
    const [start, setStart] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);

    const resetGame = () => {
        setStart(false);
        setCircles([]);
        setScore(0);
        setTimeLeft(5);
    };

    const handleClick = (id: number) => {
        removeCircle(id);
        addCircle();

        setScore(score + 1);
    }
    const addCircle = () => {
        setCircles(circles => [...circles, { color: randomColorPicker(), id: Math.random(), top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }]);
    }
    const removeCircle = (id: number) => {

        setCircles(circles => circles.filter(circle => circle.id !== id));
    }

    const startGame = () => {
        setStart(true);
        addCircle();
    }
    const saveState = async () => {
        const gameState = {
            score,
            timeLeft,
            circles
        };
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        const response = await fetch("/api/users/saveGameState", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token})}`
            },
            body: JSON.stringify({
                email,
                gameState
            })
        });
        const data = await response.json();
        alert(data.message);
    };

    useEffect(() => {
        
        window.addEventListener("beforeunload", saveState);
        return () => window.removeEventListener("beforeunload", saveState);

    }, []);

    useEffect(() => {
        if (start && timeLeft > 0) {

            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            resetGame();
        }
    }, [start, timeLeft]);



    return (
        <GameStyles.GameBackground>
            <GameStyles.Score>{score}</GameStyles.Score>
            <GameStyles.GameContainer>
                {circles.map(circle => (
                    <GameStyles.Circle
                        key={circle.id}
                        top={circle.top}
                        left={circle.left}
                        randomColor={circle.color}
                        onClick={() => handleClick(circle.id)}
                    />
                ))}
            </GameStyles.GameContainer>
            <GameStyles.Timer>{timeLeft}</GameStyles.Timer>
            <GameStyles.Button onClick={startGame}>startGame</GameStyles.Button>
        </GameStyles.GameBackground>

    )
}
export default Game;

const randomColorPicker = () => {
    let randomNr = Math.floor(Math.random() * 3) + 1;
    switch (randomNr) {
        case 1: return "red"
        case 2: return "green"
        case 3: return "blue"
        default: return "white"
    }
}

