import { useEffect, useState } from "react";
import { getAllMsgs } from "../Services/Getters";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const useGetMessages = () => {
	const [messages, setMessages] = useState<
		QueryDocumentSnapshot<DocumentData>[]
	>([]);
	useEffect(() => {
		const fetchMessages = async () => {
			const messagesFromDb = await getAllMsgs();
			setMessages(messagesFromDb);
		};
		fetchMessages();
	}, []);
	return messages;
};
export default useGetMessages;
