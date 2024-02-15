import { useState } from "react";
import {
	H1,
	MessageBodyDiv,
	MessageDisplay,
	MessageHeaderDiv,
	MessageListDiv,
	MessagesContainer,
	TextArea,
	UserNameCard,
} from "../Styles/Styles";
import { sendMsg } from "../Services/Setters";
import { auth } from "../firebase";
import getMessages from "../Hooks/getMessages";
import MessageCard from "./MessageCard";

const Messages = () => {
	const hardCodedAddresToDebug = "o3jRWkCy1DXVmZNEZ3ThL8ChOaI2";
    const messages = getMessages();
	const [outgoingText, setOutgoingText] = useState("");
	const [incomingText, setIncomingText] = useState(
		"Click a message to display it here"
	);
	const [isInputOpen, setIsInputOpen] = useState(false);

    


	const handleSend = async () => {
		const uid = auth.currentUser?.uid;
		if (!uid) return;
		const response = await sendMsg(hardCodedAddresToDebug, uid, outgoingText);
		if (response.succes) {
			toggleInput();
			alert(response.message);
		} else {
			alert(response.message);
		}
	};
	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setOutgoingText(event.target.value);
	};
	const toggleInput = () => {
		setIsInputOpen((prevState) => !prevState);
	};

	return (
		<MessagesContainer>
			<MessageHeaderDiv>
				<h1>Messages</h1>
			</MessageHeaderDiv>
			<MessageBodyDiv>
				<MessageListDiv>
					<MessageCard />
				</MessageListDiv>
				<MessageDisplay>
					{isInputOpen ? (
						<TextArea
							placeholder="Your message here"
							onChange={handleTextChange}
						/>
					) : (
						<textarea readOnly>{incomingText}</textarea>
					)}
					
				</MessageDisplay>
			</MessageBodyDiv>

			{isInputOpen ? (
				<MessageHeaderDiv
                onClick={handleSend}
                style={{cursor: "pointer"}}
                >
					<h3>Send</h3>
				</MessageHeaderDiv>
			) : (
				<MessageHeaderDiv
                    onClick={toggleInput}
                    style={{cursor: "pointer"}}
                >
					<h3>Write a message</h3>
				</MessageHeaderDiv>
			)}
		</MessagesContainer>
	);
};

export default Messages;
