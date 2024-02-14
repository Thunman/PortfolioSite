import { FaShareSquare, FaTrash } from "react-icons/fa";
import { LevelSelectorModalProps } from "../Interfaces/Interfaces";
import {
	LevelSelectorBackdrop,
	LevelSelector,
	LevelSelectorModal,
    DeleteButton,
    ExportButton,
    ImportButton,
} from "../Styles/Styles";

export const Modal = ({
	levels,
	handleClose,
	handleSelect,
	handleDelete,
    handleExport,
    handleImportLevel,
}: LevelSelectorModalProps) => {
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
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
					}}
				>
					{levels.map((str, index) => (
						<LevelSelector
							data-name={str}
							key={index}
							onClick={handleSelect}
						>
							{str}
                            <ExportButton
                                 style={{ position: "absolute", top: 0, left: 0 }}
                                 onClick={handleExport}
                            >
                                <FaShareSquare />
                            </ExportButton>
							<DeleteButton
                                style={{ position: "absolute", top: 0, right: 0 }}
								onClick={handleDelete}
							>
								<FaTrash />
							</DeleteButton>
						</LevelSelector>
					))}
                    <ImportButton
                        onClick={handleImportLevel}
                    >
                        Import Level
                    </ImportButton>
				</div>
			</LevelSelectorModal>
		</LevelSelectorBackdrop>
	);
};
