import * as GameStyles from "../styles/GameStyles";
import { useEffect, useRef, useState } from "react";
import { CircleProps, GameStateProps } from "../components/GameTypes"
import { saveState, randomColorPicker, saveScore } from "../helpers/gameHelpers";
import Modal from "./Modal"
import { AnimatePresence } from "framer-motion";
import game from "./gameCanvas"


interface GameInstance {
    startGame: () => void;
    timer: number;
    score: number;
}

const Game = () => {


    const [modalOpen, setModalOpen] = useState(false);
    const [gameInstance, setGameInstance] = useState<GameInstance | null>(null);
    const openHighScore = () => setModalOpen(true);
    const closeHighScore = () => setModalOpen(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        
        if (canvasRef.current) {
            
            const instance = game(canvasRef.current);
            setGameInstance(instance);
        }
    }, []);



    return (
        <GameStyles.StyledGameBackground>
            <GameStyles.StyledGameContainer>
                <canvas ref={canvasRef} className="full-canvas" />
            </GameStyles.StyledGameContainer>
            <GameStyles.StyledGameButtonContainer>
                <GameStyles.StyledGameButton onClick={() => gameInstance?.startGame()}>startGame</GameStyles.StyledGameButton>
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
                <GameStyles.StyledScore>placeHolder</GameStyles.StyledScore>
                <GameStyles.StyledTimer>placeHolder</GameStyles.StyledTimer>
                <GameStyles.StyledSaveGameButton
                //add save game function
                >Save</GameStyles.StyledSaveGameButton>
            </GameStyles.StyledGameButtonContainer>
        </GameStyles.StyledGameBackground>
    )
}
export default Game;



