import { Children, MouseEventHandler, ReactNode } from "react";

export interface LoginProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export interface BackdropProps {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLDivElement>;
};

export interface ModalProps {
    text: string;
    handleClose: MouseEventHandler<HTMLDivElement>
};