import {
	Container,
	ImgContainer,
	MenuButton,
	AboutMeContainer,
	TextContainer,
	H1,
	BasicInfoContainer,
	BasicInfo,
	Img,
} from "../Styles/Styles";
import { LoginProps } from "../Interfaces/Interfaces";
import { useState } from "react";
import DropDownMenu from "./DropDownMenu";
import DropDownButton from "./DropDownButton";
import LogoutButton from "./LogoutButton";
import GameButtons from "./GameButtons";

const Landing: React.FC<LoginProps> = (props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showGameButtons, setShowGameButtons] = useState(false);
	const toggleGameButtons = () => {
		setShowGameButtons(!showGameButtons);
	};
	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<Container
			onClick={() => {
				setIsMenuOpen(false);
				setShowGameButtons(false);
			}}
		>
			<DropDownMenu isMenuOpen={isMenuOpen}>
				<MenuButton
					onClick={(e) => {
						e.stopPropagation();
						toggleGameButtons();
					}}
					style={{
						backgroundColor: showGameButtons ? "#1a202c" : "#475569",
					}}
				>
					Games
				</MenuButton>
				<GameButtons showGameButtons={showGameButtons} />
				<div style={{ flexGrow: 1 }}></div>
				<LogoutButton setIsLoggedIn={props.setIsLoggedIn} />
			</DropDownMenu>
			<DropDownButton
				isMenuOpen={isMenuOpen}
				handleMenuToggle={handleMenuToggle}
			/>
			<AboutMeContainer>
			<BasicInfoContainer>
				<ImgContainer>
					<Img
						src="/images/selfie.jpg"
						alt="My Image"
					/>
				</ImgContainer>
				<BasicInfo>
					<p>Name: Daniel Thunman</p>
					<p>Age: 37</p>
					<p>Location: Gävle, SE</p>
					<p>Contact: <a href="mailto:thunman42@gmail.com"> Thunman42@gmail.com </a></p>
				</BasicInfo>
				</BasicInfoContainer>
				<TextContainer>
				<H1>Placeholder for about me</H1>
				<p>All work and no play makes Daniel a dull boy!</p>
				</TextContainer>
				
			</AboutMeContainer>
		</Container>
	);
};
export default Landing;
