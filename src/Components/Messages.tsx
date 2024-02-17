import { useEffect, useRef, useState } from "react";
import {
	MessageBodyDiv,
	MessageDisplay,
	MessageHeaderDiv,
	MessageListDiv,
	MessageReplyInput,
	MessagesContainer,
} from "../Styles/Styles";
import { sendMsg } from "../Services/Setters";
import { auth } from "../firebase";
import MessageCard from "./MessageCard";
import { useMessages } from "../Hooks/MessageContext";
import MessageBubble from "./MessageBubble";


const Messages = () => {
	const [clickedName, setClickedName] = useState("");
	const [recipient, setRecipient] = useState("");
	const { messages, refresh } = useMessages();
	const [cardClicked, setCardClicked] = useState(false);
	const [outgoingText, setOutgoingText] = useState("");
	const [messagesArray, setMessagesArray] = useState([]);
	const [isInputOpen, setIsInputOpen] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const handleSend = async () => {
		const uid = auth.currentUser?.uid;
		if (!uid) return;
		const response = await sendMsg(recipient, uid, outgoingText);
		if (response.succes) {
			refresh();
			alert(response.message);
		} else {
			alert(response.message);
		}
	};
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOutgoingText(event.target.value);
	};
	const toggleInput = () => {
		setIsInputOpen((prevState) => !prevState);
	};
	const onClickHandler = (id: string) => {
		setCardClicked(true);
		setClickedName(id)
		const doc = messages.find((msg) => msg.id === id);
		if (doc) {
			const data = doc.data();
			setRecipient(data.senderId);
			setMessagesArray(data.messages);
		}
	};
	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSend();
		}
	};
	useEffect(() => {
		scrollToBottom();
	}, [messagesArray]);

	useEffect(() => {
		console.log(messages);
		console.log(recipient);
		const doc = messages.find((msg) => msg.id === clickedName);
		console.log(doc);
		if (doc) {
			const data = doc.data();
			setMessagesArray(data.messages);
			console.log("trigger");
		}
	}, [messages]);
	return (
		<MessagesContainer>
			<MessageHeaderDiv>
				<h1>Messages</h1>
			</MessageHeaderDiv>
			<MessageBodyDiv>
				<MessageListDiv>
					<MessageCard handleClick={onClickHandler} />
				</MessageListDiv>
				<MessageDisplay>
					{isInputOpen ? (
						<div />
					) : (
						cardClicked && (
							<>
								<MessageBubble messages={messagesArray} />
								<div style={{ flex: 1 }} />
								<MessageReplyInput
									type="text"
									placeholder="Reply"
									onChange={handleTextChange}
									onKeyDown={handleKeyPress}
								/>
							</>
						)
					)}
					<div ref={messagesEndRef} />
				</MessageDisplay>
			</MessageBodyDiv>
			{isInputOpen ? (
				<MessageHeaderDiv
					onClick={handleSend}
					style={{ cursor: "pointer" }}
				>
					<h3>Send</h3>
				</MessageHeaderDiv>
			) : (
				<MessageHeaderDiv
					onClick={toggleInput}
					style={{ cursor: "pointer" }}
				>
					<h3>Write a message</h3>
				</MessageHeaderDiv>
			)}
		</MessagesContainer>
	);
};

export default Messages;
