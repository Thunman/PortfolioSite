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
import { LoginProps, BasicInfoProps } from "../Interfaces/Interfaces";
import { useEffect, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import DropDownButton from "./DropDownButton";
import LogoutButton from "./LogoutButton";
import GameButtons from "./GameButtons";
import { fadeBoxIn } from "../Animations/Animations";
import { getBasicInfo } from "../Services/Retrivers";

const Landing: React.FC<LoginProps> = (props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showGameButtons, setShowGameButtons] = useState(false);
	const [basicInfo, setBasicInfo] = useState<Partial<BasicInfoProps>>({});
	const toggleGameButtons = () => {
		setShowGameButtons(!showGameButtons);
	};
	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = await getBasicInfo();
			if (data) {
				setBasicInfo(data);
			}
		};
		fetchData();
	}, []);

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
			<AboutMeContainer
				variants={fadeBoxIn}
				initial="hidden"
				animate={"visible"}
				exit="exit"
			>
				<BasicInfoContainer>
					<ImgContainer>
						<Img src="/images/selfie.jpg" alt="My Image" />
					</ImgContainer>
					<BasicInfo>
						<p>Name: {basicInfo.name}</p>
						<p>Age: {basicInfo.age}</p>
						<p>Location: {basicInfo.location}</p>
						<p>Contact: {basicInfo.email}</p>
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
