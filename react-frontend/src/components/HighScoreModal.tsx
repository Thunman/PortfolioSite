import { StyledModal, StyledBackdrop } from "../Styles/styles";
import { ModalProps } from "../Interfaces/Interfaces";

export const HighScoreModal = ({ handleClose, text }: ModalProps) => {
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
				stiffnes: 500,
			},
		},
		exit: {
			y: "100vh",
			opacity: 0,
		},
	};

	return (
		<StyledBackdrop onClick={handleClose}>
			<StyledModal
				onClick={(e) => e.stopPropagation()}
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<p>{text}</p>
			</StyledModal>
		</StyledBackdrop>
	);
};

