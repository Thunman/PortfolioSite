import { ReactNode, createContext, useContext } from "react";
import useGetMessages from "./getMessages";
import { DocumentData } from "firebase/firestore";

interface MessagesContextType {
	messages: DocumentData[];
	hasUnreadMessages: boolean;
}
const MessagesContext = createContext<MessagesContextType | null>(null);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
	const { messages, hasUnreadMessages } = useGetMessages();
	return (
		<MessagesContext.Provider value={{ messages, hasUnreadMessages }}>
			{children}
		</MessagesContext.Provider>
	);
};
export const useMessages = () => {
	const context = useContext(MessagesContext);
	if (context === null) {
		throw new Error("useMessages must be used within a MessagesProvider");
	}
	return context;
};
