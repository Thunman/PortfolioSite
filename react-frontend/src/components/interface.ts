import { MouseEventHandler, ReactNode } from "react";

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
