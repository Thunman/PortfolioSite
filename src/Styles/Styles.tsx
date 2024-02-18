import styled from "styled-components";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { IoSendSharp } from "react-icons/io5";
import { MessageTextContainerProps } from "../Interfaces/Interfaces";

export const UserFinderContainer = styled(motion.div)`
	position: fixed;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(7, 1fr);
	width: 75%;
	height: 75%;
	background-color: #fff;
	border-radius: 16px;
	border: 4px solid #475569;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	overflow: auto;
	padding: 5px;
	gap: 5px;
`;
export const StyledUserSeletorModal = styled(motion.div)`
	position: fixed;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(7, 1fr);
	width: 50%;
	height: 50%;
	background-color: #000000a6;
	border-radius: 16px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	overflow: auto;
	padding: 5px;
	gap: 5px;
`;
export const UserNameCardForModal = styled.div`
	background-color: #ffffff6e;
	min-height: 25%;
	border-radius: 16px;
	border: 4px solid #475569;
	padding-top: 5px;
	padding-bottom: 5px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	box-sizing: border-box;
	justify-content: center;
	cursor: pointer;
	&:hover {
		background-color: #fff;
		border: 4px solid #1a202c;
	}
`;
export const MessagesContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	position: fixed;
	border: 8px solid #475569;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	border-radius: 16px;
	background-color: #fff;
	height: 75vh;
	width: 75vw;
	max-height: 75vh;
	max-width: 75vw;
	padding: 10px;
	overflow: hidden;
`;
export const MessageHeaderDiv = styled.div`
	display: flex;
	background-color: #475569;
	border: 4px solid #1a202c;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	border-radius: 16px;
	justify-content: center;
	height: 10%;
	align-items: center;
	cursor: default;
`;
export const MessageBottomDiv = styled.div`
	display: flex;
	background-color: #475569;
	border: 4px solid #1a202c;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	border-radius: 16px;
	justify-content: center;
	height: 10%;
	align-items: center;
	cursor: pointer;
	&:hover {
		background-color: #1a202c;
		border: 4px solid #1a202c;
	}
`;
export const MessageBodyDiv = styled.div`
	height: 100%;
	width: auto;
	display: flex;
	justify-content: flex-start;
	padding-top: 5px;
	padding-bottom: 5px;
	gap: 5px;
	overflow: hidden;
`;
export const MessageListDiv = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-template-rows: repeat(8, 1fr);
	border: 4px solid #1a202c;
	border-radius: 16px;
	box-shadow: 0 0 0 rgba(0, 0, 0, 0.8);
	background-color: #475569;
	justify-content: center;
	width: 20%;
	overflow: auto;
	gap: 5px;
	padding: 5px;
`;
export const TextForMsgHeader = styled.h1`
	color: #fff;
	text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;
export const TextForMsgBottom = styled.h3`
	color: #fff;
	text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;
export const UserNameCard = styled.div`
	background-color: #fff;
	border-radius: 16px;
	border: 4px solid #475569;
	padding-top: 5px;
	padding-bottom: 5px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	box-sizing: border-box;
	cursor: pointer;
	&:hover {
		background: #475569;
		border: 4px solid #1a202c;
	}
`;

export const MessageTextContainer = styled.div<MessageTextContainerProps>`
	display: flex;
	min-height: fit-content;
	justify-content: ${(props) =>
		props.$isCurrentUser ? "flex-end" : "flex-start"};
`;
export const MessageContentBubble = styled.div`
	font-size: larger;
	border-radius: 8px;
	margin: 5px;
	padding: 15px;

	background-color: #475569;
	color: #fff;
	&:hover {
		background: #475569;
		border: 1px solid #1a202c;
	}
`;
export const SendButton = styled.button`
	width: 35px;
	height: 35px;
	align-items: center;
	display: flex;
	justify-content: center;
	border-radius: 20px;
	border: 1px solid #fff;
	background-color: #fff;

	padding: 2px;
	margin: 2px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	&:hover {
		background: #475569;
		border: 1px solid #475569;
		color: #fff;
	}
`;
export const StyledIoSendSharp = styled(IoSendSharp)`
	color: #475569;
	font-size: x-large;
	&:hover {
		color: #fff;
	}
`;

export const MessageDisplay = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 5px;
	border: 4px solid #475569;
	box-shadow: 0 0 0 rgba(0, 0, 0, 0.8);
	border-radius: 16px;
	background-color: #fff;
	justify-content: left;
	width: 100%;
	flex: 1;

	overflow: auto;
	&::-webkit-scrollbar {
		width: 0%;
	}
`;
export const MessageReplyInput = styled.input`
	border-radius: 8px;
	background-color: #475569;
	color: #fff;
	min-height: 5vh;
	font-size: 1vw;
	border: 1px solid #000000;
	box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
`;
export const UserDiv = styled.div`
	background-color: #fff;
	border-radius: 16px;
	color: black;
	border: 4px solid #475569;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	box-sizing: border-box;
	cursor: pointer;
	&:hover {
		background: #475569;
		border: 4px solid #1a202c;
	}
`;

export const StyledBackdrop = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: #00000073;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow-y: hidden;
`;
export const StyledMenuBackdrop = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: #00000073;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow-y: hidden;
`;
export const LevelSelectorBackdrop = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: #00000073;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow-y: hidden;
`;
export const HeaderButton = styled.div`
	background: transparent;
	color: white;
	padding: 10px;
	font-size: 24px;
	border-radius: 8px;
	margin-right: 10px;
	text-decoration: none;
	display: flex;
`;
export const SaveButton = styled.div`
	background: #475569;
	justify-content: center;
	color: white;
	padding: 5px;
	font-size: 16px;
	border: 4px solid #475569;
	border-radius: 8px;
	display: flex;
	cursor: pointer;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	&:hover {
		background: #1a202c;
		border: 4px solid #1a202c;
	}
`;

export const MenuButton = styled.div`
	display: flex;
	background: #475569;
	color: white;
	padding: 10px;
	font-size: 16px;
	border-radius: 8px;
	margin-inline-start: 5px;
	margin-inline-end: 5px;
	text-decoration: none;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	cursor: pointer;
	&:hover {
		background: #1a202c;
		border: 4px solid #ffffff;
	}
`;

export const GameButtonContainer = styled.div`
	display: flex;
	align-self: flex-start;
`;

export const Menu = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	width: 100%;
	top: 0;
	height: 50px;
	background: #1a202c;
	padding: 5px;
	overflow-y: hidden;
	border-right: 4px solid #475569;
	border-left: 4px solid #475569;
	border-bottom: 4px solid #475569;
	border-radius: 0 0 8px 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	z-index: 500;
`;

export const Cutout = styled.div`
	position: absolute;
	top: -4px;
	left: -50%;
	transform: translateX(50%);
	width: 42px;
	height: 4px;
	background: #1a202c;
	border: none;
	z-index: 1001;
`;

export const StyledLink = styled(RouterLink)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Header = styled(motion.div)`
	position: fixed;
	top: 0%;
	left: 50%;
	width: 50px;
	height: 50px;
	color: white;
	display: flex;
	align-items: center;
	justify-content: left;
	background-color: #1a202c;
	box-sizing: border-box;
	border-right: 4px solid #475569;
	border-left: 4px solid #475569;
	border-bottom: 4px solid #475569;
	border-radius: 0 0 8px 8px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
	z-index: 1000;
`;

export const LevelSelectorModal = styled(motion.div)`
	width: clamp(50%, 700px, 90%);
	height: min-content(50%, 900px);
	margin: auto;
	padding: 0 2rem;
	border-radius: 12px;
	z-index: 1000;
	background: #0000006c;
	color: #fff;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: flex-start;
`;

export const StyledModal = styled(motion.div)`
	width: clamp(50%, 700px, 90%);
	height: min-content(50%, 900px);
	margin: auto;
	padding: 0 2rem;
	border-radius: 12px;
	z-index: 1000;
	background: #0000006c;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export const Container = styled.div`
	text-align: center;
	display: grid;
	place-items: center;
	min-height: 100vh;
	min-width: 100vw;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to bottom, #475569, #1a202c);
	position: absolute;
`;

export const FormContainer = styled(motion.div)`
	width: 100%;
	padding: 2rem;
	background: #fff;
	border: 4px solid #475569;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

export const AboutMeContainer = styled(motion.div)`
	display: flex;
	padding: 2rem;
	width: 75vw;
	background: #fff;
	border: 4px solid #475569;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	gap: 2rem;
`;

export const UserSettingsContainer = styled(motion.div)`
	padding: 2rem;
	width: 75vw;
	background: #fff;
	border: 4px solid #475569;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	gap: 2rem;
`;
export const ImgContainer = styled.img`
	min-width: 200px;
	min-height: 250px;
	max-width: 200px;
	max-height: 250px;
	background: #475569;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;
export const Img = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;
export const BasicInfoContainer = styled.div`
	padding: 1rem;
	width: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 2rem;
`;
export const BasicInfoChangeDiv = styled.div`
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	display: flex;
	border: 4px solid #ffffff;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
	&:hover {
		border: 4px solid #1a202c;
	}
`;
export const BasicInfoDiv = styled.div`
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	display: flex;
	border: 4px solid #ffffff;
	flex-direction: column;
	justify-content: center;
`;
export const BasicInfoInput = styled.input`
	padding: 8px;
	margin: 0;
	border: 8px solid #ccc;
	border-radius: 8px;
	background-color: #f7fafc;
	&:focus {
		outline: none;
		border: 4px solid #1a202c;
		box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.5);
	}
`;
export const HeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;
export const ParagraphContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;
export const TextArea = styled.textarea`
	padding: 8px;
	margin: 0;
	border: 8px solid #ccc;
	border-radius: 8px;
	background-color: #f7fafc;
	width: 90%;
	height: 90%;
	&:focus {
		outline: none;
		border: 4px solid #1a202c;
		box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.5);
	}
`;
export const HeaderInput = styled.input`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	padding: 8px;
	margin: 0;
	border: 4px solid #ccc;
	border-radius: 8px;
	background-color: #f7fafc;
	&:focus {
		outline: none;
		border: 4px solid #1a202c;
		box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.5);
	}
`;
export const BasicInfo = styled.div`
	border-radius: 8px;

	width: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
`;
export const TextContainer = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	width: 80%;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
export const H1 = styled.h1`
	font-size: 2rem;
	margin-bottom: 1rem;
	font-family: "Roboto", sans-serif;
	color: #1a202c;
	cursor: pointer;
`;

export const Button = styled.button`
	background: #475569;
	color: white;
	&:hover {
		background: #1a202c;
		border: 4px solid #1a202c;
	}
	padding: 10px;
	font-size: 16px;
	border: 4px solid #475569;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	margin-right: 10px;
	text-decoration: none;
`;
export const ExportButton = styled.button`
	position: "absolute";
	top: 0;
	left: 0;
	font-size: 8px;
	border: 1px solid #475569;
	background: transparent;
	color: white;
	&:hover {
		background: #000000;
		border: 1px solid #1a202c;
	}
`;
export const DeleteButton = styled.button`
	position: "absolute";
	top: 0;
	right: 0;
	font-size: 8px;
	border: 1px solid #475569;
	background: transparent;
	color: white;
	&:hover {
		background: #000000;
		border: 1px solid #1a202c;
	}
`;

export const Input = styled.input`
	padding: 8px;
	margin: 0;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 3px;
	background-color: #f7fafc;
	width: 100%;

	&:focus {
		outline: none;
		border-color: #6b7280;
		box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.5);
	}
`;

export const Div = styled.div`
	position: absolute;
	top: 50;
	left: 50;
	width: 100%;
	height: 10px;
	box-shadow: 0px 0px 2px -2px rgba(0, 0, 0, 0.25);
	background-color: #4a5568;
`;

export const LevelSelector = styled.div`
	background: #475569;
	color: white;
	padding: 10px;
	font-size: 16px;
	border: 4px solid #475569;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	margin-right: 10px;
	width: 100px;
	height: 35px;
	text-align: center;
	cursor: pointer;
	margin-bottom: 10px;
	position: relative;
	&:hover {
		background: #1a202c;
		border: 4px solid #1a202c;
	}
`;

export const ImportButton = styled.div`
	background: transparent;
	color: white;
	padding: 10px;
	font-size: 16px;
	border: 4px solid transparent;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	margin-right: 10px;
	width: 100px;
	height: 35px;
	text-align: center;
	cursor: pointer;
	margin-bottom: 10px;
	position: relative;
	&:hover {
		background: #1a202c;
		border: 4px solid #1a202c;
	}
`;

export const TooltipContainer = styled.div`
	position: relative;
	width: 100%;
	padding: 0;
	margin: 0;
`;

export const Tooltip = styled.div`
	visibility: hidden;
	width: 120%;
	background-color: #475569;
	color: #fff;

	text-align: center;
	padding: 5px 0;
	border-radius: 6px;
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	opacity: 0;
	transition: opacity 2.5s;

	${TooltipContainer}:hover &,
  ${TooltipContainer}:focus-within & {
		visibility: visible;
		opacity: 1;
	}
`;
