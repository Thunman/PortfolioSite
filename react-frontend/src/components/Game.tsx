import * as GameStyles from "../styles/GameStyles";
import { useEffect, useRef, useState } from "react";
import HighScoreModal from "./HighScoreModal";
import { AnimatePresence } from "framer-motion";
import game from "../GameLogic/mainGameLoop";
import { Link } from "react-router-dom";

interface GameInstance {
	startGame: () => void;
	getScore: () => number;
}

const Game = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [gameInstance, setGameInstance] = useState<GameInstance | null>(null);
	const openHighScore = () => setModalOpen(true);
	const closeHighScore = () => setModalOpen(false);
	const exportedLevel = JSON.parse(
		localStorage.getItem("exportedLevel") || "[]"
	);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		if (canvasRef.current) {
			const instance = game(canvasRef.current, exportedLevel);
			setGameInstance(instance);
		}
	}, []);

	return (
		<GameStyles.StyledGameBackground>
			<GameStyles.StyledGameContainer>
				<canvas ref={canvasRef} className="full-canvas" />
			</GameStyles.StyledGameContainer>
			<GameStyles.StyledGameButtonContainer>
				<GameStyles.StyledGameButton
					onClick={() => gameInstance?.startGame()}
				>
					Start Game
				</GameStyles.StyledGameButton>
				<GameStyles.StyledHighScore
					onClick={() => (modalOpen ? closeHighScore() : openHighScore())}
				>
					High Score
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
				<GameStyles.StyledGameButton as={Link} to="/LevelEditor">
					Level Editor
				</GameStyles.StyledGameButton>
			</GameStyles.StyledGameButtonContainer>
		</GameStyles.StyledGameBackground>
	);
};
export default Game;
