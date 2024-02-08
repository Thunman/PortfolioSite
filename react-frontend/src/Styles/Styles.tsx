import styled from "styled-components";
import { motion } from "framer-motion";

const StyledBackdrop = styled(motion.div)`
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
const LevelSelectorBackdrop = styled(motion.div)`
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

const LevelSelectorModal = styled(motion.div)`
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

const StyledModal = styled(motion.div)`
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
const Container = styled.div`
	display: flex;
	height: 100vh;
	width: 100%;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to bottom, #475569, #1a202c);
	position: relative;
`;

const FormContainer = styled.div`
	width: 100%;
	max-width: 320px;
	padding: 2rem;
	background: #fff;
	border: 4px solid #475569;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Button = styled.button`
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
const ExportButton = styled.button`
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
const DeleteButton = styled.button`
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

const Input = styled.input`
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

const Div = styled.div`
	position: absolute;
	top: 50;
	left: 50;
	width: 100%;
	height: 10px;
	box-shadow: 0px 0px 2px -2px rgba(0, 0, 0, 0.25);
	background-color: #4a5568;
`;

const LevelSelector = styled.div`
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

const TooltipContainer = styled.div`
	position: relative;
	width: 100%;
	padding: 0;
	margin: 0;
`;

const Tooltip = styled.div`
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

export {
	Container,
	Button,
	Form,
	FormContainer,
	Input,
	Div,
	Tooltip,
	TooltipContainer,
	StyledBackdrop,
	StyledModal,
	LevelSelector,
	LevelSelectorModal,
	LevelSelectorBackdrop,
	DeleteButton,
	ExportButton,
};
