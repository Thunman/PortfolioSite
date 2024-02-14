import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { slideInHeader } from "../Animations/Animations";
import { Cutout, Header, HeaderButton } from "../Styles/Styles";
import { DropDownButtonProps } from "../Interfaces/Interfaces";




const DropDownButton: React.FC<DropDownButtonProps> = ({
	isMenuOpen,
    handleMenuToggle,
}) => {
	return (
		<Header
			onClick={(e) => e.stopPropagation()}
			variants={slideInHeader}
			initial="hidden"
			animate={isMenuOpen ? "visible" : "hidden"}
			exit="exit"
		>
			<Cutout></Cutout>
			<HeaderButton onClick={handleMenuToggle}>
				{isMenuOpen ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
			</HeaderButton>
		</Header>
	);
};
export default DropDownButton;
