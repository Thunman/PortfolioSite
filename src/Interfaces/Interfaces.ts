import { MouseEventHandler, ReactNode } from "react";

export interface MessageTextContainerProps {
	$isCurrentUser: boolean;
}

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
export interface MessageCardProps {
	handleClick: (userName: string) => void;
}
export interface UserSelectorModalProps {
	handleClose: (
		event?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	) => void;
	handleSelect: (id: string) => void;
}

export interface MessageProps {
	msg: string;
	timestamp: { seconds: number; nanoseconds: number };
	name: string;
}
export interface DataProps {
	messages: [MessageProps];
	reciverId: string;
	senderId: string;
	unread: boolean;
}
export interface MessageDivProps {
	sender: string;
	uid: string;
}

export interface BasicInfoProps {
	name?: string;
	email?: string;
	userName?: string;
	location?: string;
	age?: string;
	profilePicUrl?: string;
	showEmail?: string;
	uid?: string;
}
export interface DropDownButtonProps {
	isMenuOpen: boolean;
	handleMenuToggle: () => void;
}
export interface aboutTextProps {
	aboutTextHeader: string | undefined;
	aboutText: string | undefined;
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
