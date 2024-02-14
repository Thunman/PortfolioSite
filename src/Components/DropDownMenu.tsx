import { slideInMenu } from "../Animations/Animations";
import { Menu } from "../Styles/Styles";
import { DropDownMenuProps } from "../Interfaces/Interfaces";


const DropDownMenu: React.FC<DropDownMenuProps> = ({
	isMenuOpen,
	children,
}) => {
	return (
		<Menu
			onClick={(e) => e.stopPropagation()}
			variants={slideInMenu}
			initial="hidden"
			animate={isMenuOpen ? "visible" : "hidden"}
			exit="exit"
		>
			{children}
		</Menu>
	);
};

export default DropDownMenu;
