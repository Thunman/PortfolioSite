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
import { doc, getDoc } from "firebase/firestore";



const Game = () => {

	const [level, setLevel] = useState([[]]);
    const [settings, setSettings] = useState({
        _padding: 1,
        _width: 75,
        _height: 50,
        _spacing: 1,
    });
	const [gameInstance, setGameInstance] = useState<GameInstance | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const getSettingsAndLevel = async () => {
        if (auth.currentUser) {
            const docRef = doc(db, "Users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const brickSettings = JSON.parse(docSnap.data().brickSettings);
                if (typeof brickSettings === "object") {
                    setSettings(brickSettings);
                }
                const newLevel = JSON.parse(docSnap.data().level);
                setLevel(newLevel);

            } else {
                console.log("No such document!");
            }
        } else {
            console.log("No user signed in");
        }
    };
	useEffect(() => {
        getSettingsAndLevel();
    }, []);
	useEffect(() => {
		if (canvasRef.current) {
			const instance = game(canvasRef.current, level, settings);
			setGameInstance(instance);
		}
	}, [level, settings]);

	return (
		<StyledGameBackground>
			<StyledGameContainer>
				<canvas ref={canvasRef} className="full-canvas" />
			</StyledGameContainer>
			<StyledGameButtonContainer>
				<StyledGameButton onClick={() => gameInstance?.startGame()}>
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
