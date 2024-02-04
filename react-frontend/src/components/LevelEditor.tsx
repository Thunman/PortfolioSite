import { useEffect, useRef, useState } from "react";
import * as GameStyles from "../styles/GameStyles";
import levelEditor from "../GameLogic/LevelEditor";
import { AnimatePresence } from "framer-motion";
import LevelEditorSettingsModal from "./LevelEditorSettingsModal";
import { Link } from "react-router-dom";

interface LevelEditorInstance {
	start: () => void;
	exportLevel: () => number[][];
}
const LevelEditor = () => {
	const [brickSettings, setBrickSettings] = useState({
		_padding: 20,
		_width: 100,
		_height: 50,
		_spacing: 1,
	});
	const handleSave = (
		width: string,
		height: string,
		padding: string,
		spacing: string
	) => {
		setBrickSettings(() => ({
			_padding: Number(padding),
			_spacing: Number(spacing),
			_width: Number(width),
			_height: Number(height),
		}));
	};

	const [modalOpen, setModalOpen] = useState(false);
	const openSettings = () => setModalOpen(true);
	const closeSettings = () => setModalOpen(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [levelEditorInstance, setLevelEditorInstance] =
		useState<LevelEditorInstance | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const instance = levelEditor(canvasRef.current, brickSettings);
			setLevelEditorInstance(instance);
		}
	}, [brickSettings]);

	return (
		<GameStyles.StyledGameBackground>
			<GameStyles.StyledGameContainer>
				<canvas ref={canvasRef} className="full-canvas" />
			</GameStyles.StyledGameContainer>
			<GameStyles.StyledGameButtonContainer>
				<GameStyles.StyledGameButton
					onClick={() => levelEditorInstance?.start()}
				>
					New Empty Board
				</GameStyles.StyledGameButton>
				<GameStyles.StyledHighScore
					onClick={() => (modalOpen ? closeSettings() : openSettings())}
				>
					Settings
				</GameStyles.StyledHighScore>
				<AnimatePresence
					initial={false}
					mode="wait"
					onExitComplete={() => null}
				>
					{modalOpen && (
						<LevelEditorSettingsModal
							handleClose={closeSettings}
							handleSave={handleSave}
						></LevelEditorSettingsModal>
					)}
				</AnimatePresence>
				<GameStyles.StyledSaveGameButton
					onClick={() => {
						const level = levelEditorInstance?.exportLevel() || [];
						localStorage.setItem("exportedLevel", JSON.stringify(level));
						alert("Level Saved");
					}}
				>
					Save
				</GameStyles.StyledSaveGameButton>
				<GameStyles.StyledGameButton as={Link} to="/Game">
					Back to Game
				</GameStyles.StyledGameButton>
			</GameStyles.StyledGameButtonContainer>
		</GameStyles.StyledGameBackground>
	);
};

export default LevelEditor;
