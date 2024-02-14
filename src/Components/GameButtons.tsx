import { GameButtonProps } from "../Interfaces/Interfaces";
import { GameButtonContainer, MenuButton, StyledLink } from "../Styles/Styles";

const GameButtons: React.FC<GameButtonProps> = ({ showGameButtons }) => {
    if (!showGameButtons) {
        return null;
    }
    return (
        showGameButtons && (
            <GameButtonContainer>
                <MenuButton as={StyledLink} to="/game">
                    BrickBreaker
                </MenuButton>
                <MenuButton as={StyledLink} to="/levelEditor">
                    Level Editor
                </MenuButton>
            </GameButtonContainer>
        )
    )
};
export default GameButtons;