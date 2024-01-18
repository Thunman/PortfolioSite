// a simple browser game, it renders circles and when they are clicked they disapear and the score counter increments

import * as GameStyles from "../styles/GameStyles";
import { useEffect, useState } from "react";
import { CircleProps, GameStateProps } from "../components/GameTypes"
import { saveState, randomColorPicker, saveScore } from "../helpers/gameHelpers";
import Modal from "./Modal"
import { AnimatePresence } from "framer-motion";


const Game = () => {

    const [score, setScore] = useState(0);
    const [circles, setCircles] = useState<CircleProps[]>([])
    const [start, setStart] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);
    const [modalOpen, setModalOpen] = useState(false);

    const openHighScore = () => setModalOpen(true);
    const closeHighScore = () => setModalOpen(false);

    const resetGame = () => {
        setStart(false);
        setCircles([]);
        setScore(0);
        setTimeLeft(5);
    };

    const handleClick = (id: number) => {
        const circle = circles.find(circle => circle.id === id);
        if (circle?.color === "white") {
            whiteCircleClick();
        }
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
    const whiteCircleClick = () => {
        setTimeLeft(timeLeft + 5);
    }
    const startGame = () => {
        setStart(true);
        addCircle();
    }

    const gameState: GameStateProps = {
        score,
        timeLeft,
        circles
    }

    useEffect(() => {
        if (start && timeLeft > 0) {

            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            saveScore(score);
            resetGame();
        }
    }, [start, timeLeft]);

    return (
        <GameStyles.StyledGameBackground>

            <GameStyles.StyledGameContainer>
                {circles.map(circle => (
                    <GameStyles.StyledCircle
                        key={circle.id}
                        top={circle.top}
                        left={circle.left}
                        randomcolor={circle.color}
                        onClick={() => handleClick(circle.id)}
                    />
                ))}
            </GameStyles.StyledGameContainer>

            <GameStyles.StyledGameButtonContainer>
                <GameStyles.StyledGameButton onClick={startGame}>startGame</GameStyles.StyledGameButton>
                <GameStyles.StyledHighScore
                    onClick={() => (modalOpen ? closeHighScore() : openHighScore())}
                >HighScore</GameStyles.StyledHighScore>
                <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => null}
                >
                    {modalOpen && <Modal handleClose={closeHighScore} text="no way this works"></Modal>}
                </AnimatePresence>
                <GameStyles.StyledScore>{score}</GameStyles.StyledScore>
                <GameStyles.StyledTimer>{timeLeft}</GameStyles.StyledTimer>
                <GameStyles.StyledSaveGameButton
                    onClick={async () => await saveState(gameState)}
                    >Save</GameStyles.StyledSaveGameButton>
            </GameStyles.StyledGameButtonContainer>
        </GameStyles.StyledGameBackground>
    )
}
export default Game;



