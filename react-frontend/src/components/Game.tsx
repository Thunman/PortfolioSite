import {
	StyledGameBackground,
	StyledGameContainer,
	StyledGameButtonContainer,
	StyledGameButton,
	StyledHighScore,
} from "../Styles/GameStyles";
import { useEffect, useRef, useState } from "react";
import { HighScoreModal } from "./HighScoreModal";
import { AnimatePresence } from "framer-motion";
import game from "../BrickBreakerGame/mainGameLoop";
import { Link } from "react-router-dom";
import { GameInstance } from "../Interfaces/Interfaces";

const Game = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [gameInstance, setGameInstance] = useState<GameInstance | null>(null);
	const openHighScore = () => setModalOpen(true);
	const closeHighScore = () => setModalOpen(false);
	const exportedLevel = JSON.parse(
		localStorage.getItem("exportedLevel") || "[]"
	);
	const brickSettings = JSON.parse(
		localStorage.getItem("brickSettings") || "{}"
	);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		if (canvasRef.current) {
			const instance = game(canvasRef.current, exportedLevel, brickSettings);
			setGameInstance(instance);
		}
	}, [brickSettings, exportedLevel]);

	return (
		<StyledGameBackground>
			<StyledGameContainer>
				<canvas ref={canvasRef} className="full-canvas" />
			</StyledGameContainer>
			<StyledGameButtonContainer>
				<StyledGameButton
					onClick={() => gameInstance?.startGame()}
				>
					Start Game
				</StyledGameButton>
				<StyledHighScore
					onClick={() => (modalOpen ? closeHighScore() : openHighScore())}
				>
					High Score
				</StyledHighScore>
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
				<StyledGameButton as={Link} to="/LevelEditor">
					Level Editor
				</StyledGameButton>
			</StyledGameButtonContainer>
		</StyledGameBackground>
	);
};
export default Game;
