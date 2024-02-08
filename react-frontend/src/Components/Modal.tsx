
import { StyledModal, StyledBackdrop, Test } from "../Styles/Styles";
import { SettingsModalProps } from "../Interfaces/Interfaces";

interface ModalProps {
    levels: string[];
    handleClose: (
		event?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) => void;
    handleSelect: (
		event?: React.MouseEvent<HTMLDivElement>
	) => void;
  }

export const Modal = ({ levels, handleClose, handleSelect }: ModalProps) => {


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
                <div>
                    {levels.map((str, index) => (
                        <Test 
                        data-name={str}
                        key={index}
                        onClick={handleSelect}>{str}</Test>
                    ))}
                </div>
            </StyledModal>
        </StyledBackdrop>
    );
};

