import { MouseEventHandler, ReactNode } from "react";


export interface DropDownMenuProps {
	isMenuOpen: boolean;
	children: ReactNode;
}
export interface LogoutButtonProps {
	setIsLoggedIn: (isLoggedIn: boolean) => void;
}
export interface GameButtonProps {
	showGameButtons: boolean;
}
export interface BasicInfoProps {
	name: string;
	age: string;
	location: string;
	email: string;
	profilePicUrl: string;
}
export interface DropDownButtonProps {
	isMenuOpen: boolean;
    handleMenuToggle: () => void;
}

export interface LoginProps {
	setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export interface BackdropProps {
	children: ReactNode;
	onClick: MouseEventHandler<HTMLDivElement>;
}

export interface ModalProps {
	text: string;
	handleClose: MouseEventHandler<HTMLDivElement>;
}

export interface SettingsModalProps {
	handleClose: (
		event?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) => void;

	handleSave: (
		width: string,
		height: string,
		padding: string,
		spacing: string
	) => void;
}
export interface GameInstance {
	startGame: () => void;
	drawImportedLevel: () => void;
}
export interface LevelEditorInstance {
	start: () => void;
	exportLevel: () => number[][];
	exportSettings: () => object;
}
export interface LevelSelectorModalProps {
	levels: string[];
	handleClose: (
		event?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) => void;
	handleSelect: (event?: React.MouseEvent<HTMLDivElement>) => void;
	handleDelete: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    handleExport: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    handleImportLevel: (event?: React.MouseEvent<HTMLDivElement>) => void;
}