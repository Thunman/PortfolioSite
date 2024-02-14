import { useEffect, useRef, useState } from "react";
import {
	StyledGameBackground,
	StyledGameContainer,
	StyledGameButtonContainer,
	StyledGameButton,
	StyledHighScore,
	StyledSaveGameButton,
} from "../Styles/GameStyles";
import levelEditor from "../BrickBreakerGame/LevelEditor";
import { AnimatePresence } from "framer-motion";
import { LevelEditorSettingsModal } from "./LevelEditorSettingsModal";
import { Link } from "react-router-dom";
import { LevelEditorInstance } from "../Interfaces/Interfaces";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { fadeBoxIn } from "../Animations/Animations";

const LevelEditor = () => {
	const [brickSettings, setBrickSettings] = useState({
		_padding: 1,
		_width: 75,
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
	const [levelName, setLevelName] = useState("");
	const [isSaveInputVisible, setIsSaveInputVisible] = useState(false);
	const handleSaveLevel = async () => {
		const level = levelEditorInstance?.exportLevel() || [];
		if (auth.currentUser) {
			try {
				const levelRef = doc(
					db,
					"Users",
					auth.currentUser.uid,
					"levels",
					levelName
				);
				const levelSnap = await getDoc(levelRef);
				if (levelSnap.exists()) {
					const confirm = window.confirm(
						"Level already exists, overwrite?"
					);
					if (!confirm) {
						return;
					}
				}
				await setDoc(
					doc(db, "Users", auth.currentUser.uid, "levels", levelName),
					{
						level: JSON.stringify(level),
						brickSettings: JSON.stringify(brickSettings),
					},
					{ merge: true }
				);
				alert("Level saved!");
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		} else {
			alert("You need to be logged in to save a level");
		}
	};
	const handleBackgroundClick = () => {
		setIsSaveInputVisible(false);
		setLevelName("");
	};

	return (
		<StyledGameBackground onClick={handleBackgroundClick}>
			<StyledGameContainer
				variants={fadeBoxIn}
				initial="hidden"
				animate={"visible"}
				exit="exit"
			>
				<canvas ref={canvasRef} className="full-canvas" />
			</StyledGameContainer>
			<StyledGameButtonContainer>
				<StyledGameButton onClick={() => levelEditorInstance?.start()}>
					New Empty Board
				</StyledGameButton>
				<StyledHighScore
					onClick={() => (modalOpen ? closeSettings() : openSettings())}
				>
					Settings
				</StyledHighScore>
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
				{isSaveInputVisible && (
					<input
						type="text"
						value={levelName}
						onChange={(e) => setLevelName(e.target.value)}
						placeholder="Enter level name"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSaveLevel();
								setIsSaveInputVisible(false);
							}
						}}
						onClick={(e) => e.stopPropagation()}
					/>
				)}
				{!isSaveInputVisible && (
					<StyledSaveGameButton
						onClick={(e) => {
							e.stopPropagation();
							setIsSaveInputVisible(true);
						}}
					>
						Save
					</StyledSaveGameButton>
				)}
				<StyledGameButton as={Link} to="/Game">
					Back to Game
				</StyledGameButton>
			</StyledGameButtonContainer>
		</StyledGameBackground>
	);
};

export default LevelEditor;
