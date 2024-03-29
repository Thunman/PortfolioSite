import { useEffect, useState } from "react";
import { getAllMsgs } from "../Services/Getters";
import { DocumentData, collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { DataProps } from "../Interfaces/Interfaces";

const useGetMessages = () => {
	const [messages, setMessages] = useState<DocumentData[]>([]);
	const [uid, setUid] = useState(auth.currentUser?.uid || "");

	const fetchMessages = async () => {
		const messagesFromDb = await getAllMsgs();
		setMessages(messagesFromDb);
	};
	useEffect(() => {
		fetchMessages();
	}, []);

	useEffect(() => {
		if (uid) {
			const messageRef = collection(doc(db, "Users", uid), "messages");
			const unsubscribe = onSnapshot(messageRef, (querySnapshot) => {
				const messagesFromDb: DataProps[] = querySnapshot.docs.map(
					(doc) => ({
						id: doc.id,
						...(doc.data() as DataProps),
					})
				);
				setMessages(messagesFromDb);
			});
			return () => unsubscribe();
		}
	}, [uid]);

	return { messages };
};

export default useGetMessages;
