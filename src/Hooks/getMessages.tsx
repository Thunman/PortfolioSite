import { useEffect, useState } from "react";
import { getAllMsgs } from "../Services/Getters";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const useGetMessages = () => {
    const [messages, setMessages] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    const fetchMessages = async () => {
        const messagesFromDb = await getAllMsgs();
        setMessages(messagesFromDb);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const refresh = () => {
		console.log("refreash")
        fetchMessages();
    };

    return { messages, refresh };
};

export default useGetMessages;