import * as GameStyles from "../styles/GameStyles";
import { useEffect, useRef, useState } from "react";
import HighScoreModal from "./HighScoreModal";
import { AnimatePresence } from "framer-motion";
import game from "../GameLogic/mainGameLoop";

interface GameInstance {
  startGame: () => void;
  getScore: () => number;
}

const Game = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
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
        <GameStyles.StyledGameButton onClick={() => gameInstance?.startGame()}>
          startGame
        </GameStyles.StyledGameButton>
        <GameStyles.StyledHighScore
          onClick={() => (modalOpen ? closeHighScore() : openHighScore())}
        >
          HighScore
        </GameStyles.StyledHighScore>
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {modalOpen && (
            <HighScoreModal
              handleClose={closeHighScore}
              text="no way this works"
            ></HighScoreModal>
          )}
        </AnimatePresence>
        <GameStyles.StyledScore>{score}</GameStyles.StyledScore>
        <GameStyles.StyledTimer>{timer}</GameStyles.StyledTimer>
        <GameStyles.StyledSaveGameButton
        //add save game function
        >
          Save
        </GameStyles.StyledSaveGameButton>
      </GameStyles.StyledGameButtonContainer>
    </GameStyles.StyledGameBackground>
  );
};
export default Game;
