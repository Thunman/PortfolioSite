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
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import { Modal } from "./Modal"




const Game = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const openPicker = () => setModalOpen(true);
	const closePicker = () => setModalOpen(false);
	
	const [savedLevels, setSavedLevels] = useState<string[]>([]);
	const [level, setLevel] = useState<number[][]>([]);
    const [settings, setSettings] = useState({
        _padding: 1,
        _width: 75,
        _height: 50,
        _spacing: 1,
    });
	const [gameInstance, setGameInstance] = useState<GameInstance | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	
	useEffect(() => {
		if (canvasRef.current) {
			const instance = game(canvasRef.current, level, settings);
			setGameInstance(instance);
		}
	}, [level, settings]);

	const handleImportClick = async () => {
		modalOpen ? closePicker() : openPicker()
		if (auth.currentUser) {
			const colRef = collection(db, "Users", auth.currentUser.uid, "levels");
			const querySnapshot = await getDocs(colRef);
			const savedLevelsFromDB = querySnapshot.docs.map(doc => {
				const pathParts = doc.ref.path.split('/');
				return pathParts[pathParts.length - 1];
			});
			setSavedLevels(savedLevelsFromDB);
		}
	};
	const handleSelect = async (event?: React.MouseEvent<HTMLDivElement>) => {
		const selected = event?.currentTarget.getAttribute("data-name");
		if(selected){
			if(auth.currentUser){
				const levelRef = doc(db, "Users", auth.currentUser.uid, "levels", selected);
				const levelFromDB = await getDoc(levelRef)
				const levelObject = levelFromDB.data()
				if(levelObject){
					const parse = JSON.parse(levelObject.level)
					const parseSetting = JSON.parse(levelObject.brickSettings)
					setLevel(parse)
					setSettings(parseSetting)
					closePicker()
				}
			}
		}
	};
	const handleDelete = async (event?: React.MouseEvent<HTMLButtonElement>) => {
		const selected = event?.currentTarget.parentElement?.getAttribute("data-name");
		if(selected){
			if(auth.currentUser){
				const confirm = window.confirm("Are you sure you want to delete this level?");
				if (!confirm) {
					return;
				}
				const levelRef = doc(db, "Users", auth.currentUser.uid, "levels", selected);
				await deleteDoc(levelRef)
				const colRef = collection(db, "Users", auth.currentUser.uid, "levels");
				const querySnapshot = await getDocs(colRef);
				const savedLevelsFromDB = querySnapshot.docs.map(doc => {
					const pathParts = doc.ref.path.split('/');
					return pathParts[pathParts.length - 1];
				});
				setSavedLevels(savedLevelsFromDB);
			}
		}
	}

	const handleExport = async (event?: React.MouseEvent<HTMLButtonElement>) => {
		const selected = event?.currentTarget.parentElement?.getAttribute("data-name");
		if(selected){
			if(auth.currentUser){
				const levelRef = doc(db, "Users", auth.currentUser.uid, "levels", selected);
				const levelFromDB = await getDoc(levelRef)
				let levelObject = levelFromDB.data()
				if(levelObject){
					levelObject = { ...levelObject, levelName: selected}
					const parse = JSON.stringify(levelObject)
					const encoded = btoa(parse)
					navigator.clipboard.writeText(encoded)
					alert("Level copied to clipboard!")
				}
			}
		}
	}
	const handleImport = async (event?: React.MouseEvent<HTMLDivElement>) => {
		if(auth.currentUser){
			const encoded = prompt("Please paste your level string here")
			if(encoded){
				const decoded = atob(encoded)
				const levelObject = JSON.parse(decoded)
				const level = JSON.parse(levelObject.level)
				const settings = JSON.parse(levelObject.brickSettings)
				const levelRef = doc(db, "Users", auth.currentUser.uid, "levels", levelObject.levelName);
				const levelSnap = await getDoc(levelRef);
				if (levelSnap.exists()) {
					const confirm = window.confirm("Level already exists, overwrite?");
					if (!confirm) {
						return;
					}
				}
				await setDoc(
					doc(db, "Users", auth.currentUser.uid, "levels", levelObject.levelName),
					{
						level: JSON.stringify(level),
						brickSettings: JSON.stringify(settings),
					},
					{ merge: true }
				);
				alert("Level saved!");
			}
		}
	}
					
				

	return (	
		<StyledGameBackground>
			<StyledGameContainer>
				<canvas ref={canvasRef} className="full-canvas" />
			</StyledGameContainer>
			<StyledGameButtonContainer>
				<StyledGameButton onClick={() => gameInstance?.startGame()}>
					Start Game
				</StyledGameButton>
				<StyledGameButton onClick={handleImportClick}>Saved Levels</StyledGameButton>
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
				<StyledGameButton as={Link} to="/LevelEditor">
					Level Editor
				</StyledGameButton>
				<StyledGameButton as={Link} to="/">
					Landing
				</StyledGameButton>
			</StyledGameButtonContainer>
		</StyledGameBackground>
	);
};
export default Game;
