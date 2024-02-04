import {
	StyledGameBackground,
	StyledGameContainer,
	StyledGameButtonContainer,
	StyledGameButton,
} from "../Styles/GameStyles";
import { useEffect, useRef, useState } from "react";
import game from "../BrickBreakerGame/mainGameLoop";
import { Link } from "react-router-dom";
import { GameInstance } from "../Interfaces/Interfaces";

const Game = () => {
	const [gameInstance, setGameInstance] = useState<GameInstance | null>(null);
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
				<StyledGameButton as={Link} to="/LevelEditor">
					Level Editor
				</StyledGameButton>
			</StyledGameButtonContainer>
		</StyledGameBackground>
	);
};
export default Game;
