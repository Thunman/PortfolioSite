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
import { auth, db } from "../firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
} from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import { Modal } from "./Modal";
import { BrickSettingsProps } from "../BrickBreakerGame/HelperFunctions/GameTypes";
import { fadeBoxIn } from "../Animations/Animations";
import { StyledLink } from "../Styles/Styles";

const Game = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const openPicker = () => setModalOpen(true);
	const closePicker = () => setModalOpen(false);
	const [activateDrawing, setActivateDrawing] = useState(false);
	const [savedLevels, setSavedLevels] = useState<string[]>([]);
	const [level, setLevel] = useState<number[][]>([]);
	const defaultBrickSettings = {
		_padding: 50,
		_width: canvasRef.current?.width ? canvasRef.current.width / 15 : 75,
		_height: canvasRef.current?.height ? canvasRef.current.height / 20 : 50,
		_spacing: 10,
	};
	const [settings, setSettings] =
		useState<BrickSettingsProps>(defaultBrickSettings);
	const [gameInstance, setGameInstance] = useState<GameInstance | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const instance = game(canvasRef.current, level, settings);
			setGameInstance(instance);
		}
	}, [level, settings]);

	useEffect(() => {
		if (gameInstance && activateDrawing) {
			gameInstance.drawImportedLevel();
		}
	}, [gameInstance]);

	const handleImportClick = async () => {
		modalOpen ? closePicker() : openPicker();
		if (auth.currentUser) {
			const colRef = collection(db, "Users", auth.currentUser.uid, "levels");
			const querySnapshot = await getDocs(colRef);
			const savedLevelsFromDB = querySnapshot.docs.map((doc) => {
				const pathParts = doc.ref.path.split("/");
				return pathParts[pathParts.length - 1];
			});
			setSavedLevels(savedLevelsFromDB);
		}
	};
	useEffect(() => {
		console.log("Game instance", gameInstance);
	}, []);
	const handleSelect = async (event?: React.MouseEvent<HTMLDivElement>) => {
		const selected = event?.currentTarget.getAttribute("data-name");
		if (selected) {
			if (auth.currentUser) {
				const levelRef = doc(
					db,
					"Users",
					auth.currentUser.uid,
					"levels",
					selected
				);
				const levelFromDB = await getDoc(levelRef);
				const levelObject = levelFromDB.data();
				if (levelObject) {
					const parse = JSON.parse(levelObject.level);
					const parseSetting = JSON.parse(levelObject.brickSettings);
					setLevel(parse);
					setSettings(parseSetting);
					setActivateDrawing(true);
					closePicker();
				}
			}
		}
	};
	const handleDelete = async (event?: React.MouseEvent<HTMLButtonElement>) => {
		const selected =
			event?.currentTarget.parentElement?.getAttribute("data-name");
		if (selected) {
			if (auth.currentUser) {
				const confirm = window.confirm(
					"Are you sure you want to delete this level?"
				);
				if (!confirm) {
					return;
				}
				const levelRef = doc(
					db,
					"Users",
					auth.currentUser.uid,
					"levels",
					selected
				);
				await deleteDoc(levelRef);
				const colRef = collection(
					db,
					"Users",
					auth.currentUser.uid,
					"levels"
				);
				const querySnapshot = await getDocs(colRef);
				const savedLevelsFromDB = querySnapshot.docs.map((doc) => {
					const pathParts = doc.ref.path.split("/");
					return pathParts[pathParts.length - 1];
				});
				setSavedLevels(savedLevelsFromDB);
			}
		}
	};

	const handleExport = async (event?: React.MouseEvent<HTMLButtonElement>) => {
		const selected =
			event?.currentTarget.parentElement?.getAttribute("data-name");
		if (selected) {
			if (auth.currentUser) {
				const levelRef = doc(
					db,
					"Users",
					auth.currentUser.uid,
					"levels",
					selected
				);
				const levelFromDB = await getDoc(levelRef);
				let levelObject = levelFromDB.data();
				if (levelObject) {
					levelObject = { ...levelObject, levelName: selected };
					const parse = JSON.stringify(levelObject);
					const encoded = btoa(parse);
					navigator.clipboard.writeText(encoded);
					alert("Level copied to clipboard!");
				}
			}
		}
	};
	const handleImport = async (event?: React.MouseEvent<HTMLDivElement>) => {
		if (auth.currentUser) {
			const encoded = prompt("Please paste your level string here");
			if (encoded) {
				const decoded = atob(encoded);
				const levelObject = JSON.parse(decoded);
				const level = JSON.parse(levelObject.level);
				const settings = JSON.parse(levelObject.brickSettings);
				const levelRef = doc(
					db,
					"Users",
					auth.currentUser.uid,
					"levels",
					levelObject.levelName
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
					doc(
						db,
						"Users",
						auth.currentUser.uid,
						"levels",
						levelObject.levelName
					),
					{
						level: JSON.stringify(level),
						brickSettings: JSON.stringify(settings),
					},
					{ merge: true }
				);
				const colRef = collection(
					db,
					"Users",
					auth.currentUser.uid,
					"levels"
				);
				const querySnapshot = await getDocs(colRef);
				const savedLevelsFromDB = querySnapshot.docs.map((doc) => {
					const pathParts = doc.ref.path.split("/");
					return pathParts[pathParts.length - 1];
				});
				setSavedLevels(savedLevelsFromDB);
				alert("Level saved!");
			}
		}
	};
	return (
		<StyledGameBackground>
			<StyledGameContainer
				variants={fadeBoxIn}
				initial="hidden"
				animate={"visible"}
				exit="exit"
			>
				<canvas ref={canvasRef} className="full-canvas" />
			</StyledGameContainer>
			<StyledGameButtonContainer>
				<StyledGameButton as={StyledLink} to={"#"}
					onClick={() => gameInstance?.startGame()}>
					Start Game
				</StyledGameButton>
				<StyledGameButton as={StyledLink} to={"#"}
					onClick={handleImportClick}>
					Saved Levels
				</StyledGameButton>
				<AnimatePresence
					initial={false}
					mode="wait"
					onExitComplete={() => null}
				>
					{modalOpen && (
						<Modal
							levels={savedLevels}
							handleClose={closePicker}
							handleSelect={handleSelect}
							handleDelete={handleDelete}
							handleExport={handleExport}
							handleImportLevel={handleImport}
						></Modal>
					)}
				</AnimatePresence>
				<StyledGameButton as={StyledLink} to="/LevelEditor">
					Level Editor
				</StyledGameButton>
				<StyledGameButton as={StyledLink} to={"#"}
					onClick={() => {
						setLevel([]);
						setSettings(defaultBrickSettings);
						setActivateDrawing(true);
					}}
				>
					Create Random Level
				</StyledGameButton>
				<StyledGameButton as={StyledLink} to="/">
					Landing
				</StyledGameButton>
			</StyledGameButtonContainer>
		</StyledGameBackground>
	);
};
export default Game;
