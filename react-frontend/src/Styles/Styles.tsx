import styled from "styled-components";
import { motion } from "framer-motion";

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

`;
export const Menu = styled(motion.div)`
	position: fixed; 
    top: 50%; 
    left: 0;
    transform: translateY(-50%); 
	width: 200px;
	background: #1a202c;
	display: flex;
	flex-direction: column; 
	padding: 5px 0 5px 0px;
	justify-content: flex-start;
	overflow-y: hidden;
	gap: 5px;
	border-radius: 0 8px 8px 0;
	border: 4px solid #1a202c;
`;

export const Header = styled(motion.div)`
	position: absolute;
	top: 50%;
	left: 0;
	width: 50px;
	height: 50px;
	color: white;
	display: flex;
	align-items: center;
	justify-content: left;
	background: linear-gradient(to bottom, #475569, #1a202c);
	box-sizing: border-box;
	border-radius: 0 15px 15px 0;
	border-top: 4px solid #1a202c;
    border-right: 4px solid #1a202c;
    border-bottom: 4px solid #1a202c;
	
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
	display: flex;
	height: 100vh;
	width: 100%;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to bottom, #475569, #1a202c);
	position: relative;
`;

export const FormContainer = styled(motion.div)`
	width: 100%;
	max-width: 320px;
	padding: 2rem;
	background: #fff;
	border: 4px solid #475569;
	border-radius: 8px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
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


