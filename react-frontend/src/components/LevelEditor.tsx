import { useEffect, useRef, useState } from "react";
import * as GameStyles from "../styles/GameStyles";
import levelEditor from "../GameLogic/LevelEditor";

interface LevelEditorInstance {
    start: () => void;
}
const LevelEditor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [levelEditorInstance, setLevelEditorInstance] = useState<LevelEditorInstance | null>(null);
    useEffect(() => {
        if (canvasRef.current) {
            const instance = levelEditor(canvasRef.current);
            setLevelEditorInstance(instance);
        }
    }, []);
    return (
        <GameStyles.StyledGameBackground>
          <GameStyles.StyledGameContainer>
            <canvas ref={canvasRef} className="full-canvas" />
          </GameStyles.StyledGameContainer>
          <GameStyles.StyledGameButtonContainer>
            <GameStyles.StyledGameButton onClick={() => levelEditorInstance?.start()}>
              startGame
            </GameStyles.StyledGameButton>
            <GameStyles.StyledSaveGameButton
            //add save game function
            >
              Save
            </GameStyles.StyledSaveGameButton>
          </GameStyles.StyledGameButtonContainer>
        </GameStyles.StyledGameBackground>
      );
};

export default LevelEditor;
