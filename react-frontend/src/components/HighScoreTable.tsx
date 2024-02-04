import Backdrop from "./Backdrop";
import { StyledModal } from "../styles/styles";
import { ModalProps } from "./interface";

const Modal = ({ handleClose, text }: ModalProps) => {
	const dropIn = {
		hidden: {
			y: "-100vh",
			opacity: 0,
		},
		visible: {
			y: "0",
			opacity: 1,
			transition: {
				duration: 0.1,
				type: "spring",
				damping: 25,
				stiffness: 250,
			},
		},
		exit: {
			y: "-100vh",
			opacity: 0,
		},
	};

	return (
		<Backdrop onClick={handleClose}>
			<StyledModal
				onClick={(e: React.MouseEvent) => e.stopPropagation()}
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
			></StyledModal>
		</Backdrop>
	);
};

export default Modal;
