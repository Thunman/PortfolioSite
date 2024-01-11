// a simple browser game, it renders circles and when they are clicked they disapear and the score counter increments


import * as Styles from "../styles/styles"
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

    const handleClick = (id: number) => {
        console.log(circles);
        removeCircle(id);
        console.log(circles)
        setTimeout(() => {
            addCircle();
            console.log(circles)
        }, 500)
        
        setScore(score + 1);
    }
    const addCircle = () => {
        setCircles(circles => [...circles, { color: randomColorPicker(), id: Math.random(), top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }]);
    }
    const removeCircle = (id: number) => {
        console.log(id)
        setCircles(circles => circles.filter(circle => circle.id !== id));
    }

    const startGame = () => {
        setStart(true);
        addCircle();
    }

    useEffect(() => {
        if (start) {
            const timeoutId = setTimeout(() => {
                setStart(false);
            }, 30000);

            return () => clearTimeout(timeoutId);
        }
    }, [start]);


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


            </GameStyles.GameContainer><br />
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