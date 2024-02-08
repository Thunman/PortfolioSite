import { LevelSelectorBackdrop, StyledBackdrop, LevelSelector, LevelSelectorModal } from "../Styles/Styles";


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
        <LevelSelectorBackdrop onClick={handleClose}>
            <LevelSelectorModal
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {levels.map((str, index) => (
                        <LevelSelector 
                        data-name={str}
                        key={index}
                        onClick={handleSelect}>{str}</LevelSelector>
                    ))}
                </div>
            </LevelSelectorModal>
        </LevelSelectorBackdrop>
    );
};

