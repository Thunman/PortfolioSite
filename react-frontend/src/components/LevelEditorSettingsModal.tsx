import { useState } from "react";
import { StyledModal, StyledBackdrop } from "../Styles/styles";
import { SettingsModalProps } from "../Interfaces/Interfaces";

export const LevelEditorSettingsModal = ({
	handleClose,
	handleSave,
}: SettingsModalProps) => {
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [spacing, setSpacing] = useState("");
	const [padding, setPadding] = useState("");

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

	const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWidth(event.target.value);
	};
	const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHeight(event.target.value);
	};
	const handleSpacingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSpacing(event.target.value);
	};
	const handlePaddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPadding(event.target.value);
	};
	const handleSaveClick = () => {
		handleSave(width, height, padding, spacing);
		handleClose();
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
				<div style={{ display: "flex", alignItems: "center" }}>
					<p style={{ marginRight: "10px" }}>Width</p>
					<input
						type="number"
						placeholder="Brick Width"
						value={width}
						onChange={handleWidthChange}
					/>
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<p style={{ marginRight: "10px" }}>Height</p>
					<input
						type="number"
						placeholder="Brick Height"
						value={height}
						onChange={handleHeightChange}
					/>
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<p style={{ marginRight: "10px" }}>Spacing</p>
					<input
						type="number"
						placeholder="Spacing"
						value={spacing}
						onChange={handleSpacingChange}
					/>
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<p style={{ marginRight: "10px" }}>Padding</p>
					<input
						type="number"
						placeholder="Padding"
						value={padding}
						onChange={handlePaddingChange}
					/>
				</div>
				<div>
					<button onClick={handleSaveClick}>Save</button>
				</div>
			</StyledModal>
		</StyledBackdrop>
	);
};

