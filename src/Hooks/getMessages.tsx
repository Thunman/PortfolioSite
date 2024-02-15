import { useEffect, useState } from "react";
import { getAllMsgs } from "../Services/Getters";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";


const getMessages = () => {

    const [messages, setMessages] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    useEffect(() => {
        const getMessages = async () => {
            const messagesFromDb = await getAllMsgs();
            setMessages(messagesFromDb);
        }
        getMessages();
    },[]);
    return messages

}
export default getMessages