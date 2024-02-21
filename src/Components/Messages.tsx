import { useEffect, useRef, useState } from "react";
import {
	MessageBodyDiv,
	MessageBottomDiv,
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
import { sendMsg, setReadTrue } from "../Services/Setters";
import { auth } from "../firebase";
import MessageCard from "./MessageCard";
import MessageBubble from "./MessageBubble";
import { getNameFromUid, getUidFromName } from "../Services/Getters";
import UserSelectorModal from "./UserSelectorModal";
import { AnimatePresence } from "framer-motion";
import useGetMessages from "../Hooks/getMessages";
import { DocumentData } from "firebase/firestore";

const Messages = () => {
	const [uid, setUid] = useState(auth.currentUser?.uid || "");
	const [clickedName, setClickedName] = useState("");
	const [recipient, setRecipient] = useState("");
	const [currentUser, setCurrentUser] = useState("");
	const { messages } = useGetMessages();
	const [cardClicked, setCardClicked] = useState(false);
	const [outgoingText, setOutgoingText] = useState("");
	const [messagesArray, setMessagesArray] = useState<DocumentData>([]);
	const [isInputOpen, setIsInputOpen] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const closeModal = () => setIsModalOpen(false);
	const openModal = () => setIsModalOpen(true);

	const handleSend = async () => {
		if (!uid) return;
		const response = await sendMsg(recipient, uid, outgoingText);
		if (response.succes) {
			setOutgoingText("");
			scrollToBottom();
		} else {
			alert(response.message);
		}
	};

	useEffect(() => {
		const getName = async () => {
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
		setClickedName(id);
		const recipientUidPromise = getUidFromName(id);
		await setReadTrue(uid, id);
		const [recipientUid] = await Promise.all([recipientUidPromise]);
		if (!recipientUid) return;
		if (!uid) return;
		setRecipient(recipientUid);
		setCardClicked(true);
		scrollToBottom();
		closeModal();
	};
	useEffect(() => {
		const doc = messages.find((msg) => msg.id === clickedName);
		if (doc) {
			setMessagesArray(doc.messages);
		}
		scrollToBottom();
	}, [clickedName]);
	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSend();
		}
	};
	useEffect(() => {
		scrollToBottom();
	}, [messagesArray]);

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
									<MessageBubble sender={clickedName} uid={uid} />
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
											style={{ flex: 1, paddingRight: "50px" }}
										/>
										<SendButton
											onClick={handleSend}
											style={{
												position: "absolute",
												right: "10px",
												top: "50%",
												transform: "translateY(-50%)",
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
				<MessageBottomDiv onClick={openModal} style={{ cursor: "pointer" }}>
					<TextForMsgBottom>New Conversation</TextForMsgBottom>
				</MessageBottomDiv>
			</MessagesContainer>
		</>
	);
};

export default Messages;
