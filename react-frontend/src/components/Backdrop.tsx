import { StyledBackdrop } from "../Styles/Styles";
import { BackdropProps } from "../Interfaces/Interfaces";

const Backdrop = ({ children, onClick }: BackdropProps) => {
	return (
		<StyledBackdrop
			onClick={onClick}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{children}
		</StyledBackdrop>
	);
};
export default Backdrop;
