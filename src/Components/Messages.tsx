import { useEffect, useRef, useState } from "react";
import {
	MessageBodyDiv,
	MessageDisplay,
	MessageHeaderDiv,
	MessageListDiv,
	MessageReplyInput,
	MessagesContainer,
	SendButton,
	StyledIoSendSharp,
	TextForMsgBottom,
	TextForMsgHeader,
} from "../Styles/Styles";
import { initMsgDB, sendMsg } from "../Services/Setters";
import { auth } from "../firebase";
import MessageCard from "./MessageCard";
import { useMessages } from "../Hooks/MessageContext";
import MessageBubble from "./MessageBubble";
import { getNameFromUid, getUidFromName } from "../Services/Getters";
import UserSelectorModal from "./UserSelectorModal";
import { AnimatePresence } from "framer-motion";
import { IoSendSharp } from "react-icons/io5";

const Messages = () => {
	const [clickedName, setClickedName] = useState("");
	const [recipient, setRecipient] = useState("");
	const [currentUser, setCurrentUser] = useState("");
	const { messages, refresh } = useMessages();
	const [cardClicked, setCardClicked] = useState(false);
	const [outgoingText, setOutgoingText] = useState("");
	const [messagesArray, setMessagesArray] = useState([]);
	const [isInputOpen, setIsInputOpen] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const closeModal = () => setIsModalOpen(false);
	const openModal = () => setIsModalOpen(true);

	const handleSend = async () => {
		const uid = auth.currentUser?.uid;
		if (!uid) return;

		const response = await sendMsg(recipient, uid, outgoingText);
		if (response.succes) {
			setOutgoingText("");
			refresh();
		} else {
			alert(response.message);
		}
	};

	useEffect(() => {
		const getName = async () => {
			const uid = auth.currentUser?.uid;
			if (!uid) return;
			const name = await getNameFromUid(uid);
			setCurrentUser(name);
		};
		getName();
	}, []);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOutgoingText(event.target.value);
	};

	const onClickHandler = async (id: string) => {
		setCardClicked(true);
		setClickedName(id);
		const uidPromise = auth.currentUser?.uid;
		const recipientUidPromise = getUidFromName(id);
		const [recipientUid, uid] = await Promise.all([
			recipientUidPromise,
			uidPromise,
		]);
		if (!recipientUid) {
			console.log("exit no rec uid");
			return;
		}
		if (!uid) {
			console.log("exit no uid");
			return;
		}
		setRecipient(recipientUid);
		closeModal();
	};
	useEffect(() => {
		const doc = messages.find((msg) => msg.id === clickedName);
		if (doc) {
			const data = doc.data();
			setMessagesArray(data.messages);
		}
	}, [recipient]);

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSend();
		}
	};
	useEffect(() => {
		scrollToBottom();
	}, [messagesArray]);

	useEffect(() => {
		const doc = messages.find((msg) => msg.id === clickedName);
		console.log(doc);
		if (doc) {
			const data = doc.data();
			setMessagesArray(data.messages);
		}
	}, [messages]);
	return (
		<>
			<AnimatePresence
				initial={false}
				mode="wait"
				onExitComplete={() => null}
			>
				{isModalOpen && (
					<UserSelectorModal
						handleClose={closeModal}
						handleSelect={onClickHandler}
					></UserSelectorModal>
				)}
			</AnimatePresence>

			<MessagesContainer>
				<MessageHeaderDiv>
					{clickedName && (
						<TextForMsgHeader>{`Conversation with ${clickedName}`}</TextForMsgHeader>
					)}
					{!clickedName && (
						<TextForMsgHeader>Conversations</TextForMsgHeader>
					)}
					
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
									<MessageBubble
										messages={messagesArray}
										currentUser={currentUser}
									/>
									<div style={{ flex: 1 }} />
									<div
										style={{
											position: "relative",
											display: "flex",
											alignItems: "center",
										}}
									>
										<MessageReplyInput
											type="text"
											placeholder="Write Message"
											value={outgoingText}
											onChange={handleTextChange}
											onKeyDown={handleKeyPress}
											style={{ flex: 1, paddingRight: "50px" }} // Add padding to prevent text going under the button
										/>
										<SendButton
											onClick={handleSend}
											style={{
												position: "absolute",
												right: "10px",
												top: "50%",
												transform: "translateY(-50%)", // This will center the button vertically
											}}
										>
											<StyledIoSendSharp />
										</SendButton>
									</div>
								</>
							)
						)}
						<div ref={messagesEndRef} />
					</MessageDisplay>
				</MessageBodyDiv>
				<AnimatePresence
					initial={false}
					mode="wait"
					onExitComplete={() => null}
				>
					{isModalOpen && (
						<UserSelectorModal
							handleClose={closeModal}
							handleSelect={onClickHandler}
						></UserSelectorModal>
					)}
				</AnimatePresence>
				<MessageHeaderDiv onClick={openModal} style={{ cursor: "pointer" }}>
					<TextForMsgBottom>New Conversation</TextForMsgBottom>
				</MessageHeaderDiv>
			</MessagesContainer>
		</>
	);
};

export default Messages;
