import styled from "styled-components";

export const StyledGameContainer = styled.div`
	position: relative;
	width: 80%;
	height: 80%;
	background: radial-gradient(circle, #000020, #000000);
	border: 4px solid #202040;
	border-radius: 20px;
	box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
	transition: box-shadow 0.3s ease;

	.full-canvas {
		width: 100%;
		height: 100%;
	}
	&:hover {
		box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
	}
`;
export const StyledCircle = styled.div<{
	randomcolor: string;
	top: string;
	left: string;
}>`
	position: absolute;
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: ${(props) => props.randomcolor};
`;

export const StyledGameBackground = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to bottom, #475569, #1a202c);
	position: relative;
`;

export const StyledGameButton = styled.button`
	text-decoration: none;
	display: flex;
	justify-content: center;
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
`;

export const StyledScore = styled.button`
	display: flex;
	justify-content: center;
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
`;

export const StyledTimer = styled.button`
	display: flex;
	justify-content: center;
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
`;

export const StyledHighScore = styled.button`
	display: flex;
	justify-content: center;
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
`;

export const StyledGameButtonContainer = styled.div`
	padding: 20px;
	display: flex;
	justify-content: space-between;
	gap: 20px;
`;
export const StyledSaveGameButton = styled.button`
	display: flex;
	justify-content: center;
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
`;
