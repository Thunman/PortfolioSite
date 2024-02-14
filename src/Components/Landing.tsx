import {
	Container,
	ImgContainer,
	AboutMeContainer,
	TextContainer,
	BasicInfoContainer,
	BasicInfo,
	BasicInfoDiv,
} from "../Styles/Styles";
import { useEffect, useState } from "react";
import { fadeBoxIn } from "../Animations/Animations";
import { getAboutAuthor } from "../Services/Getters";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Landing = () => {
	const [aboutText, setAboutText] = useState("");
	const [aboutHeaderText, setAboutHeaderText] = useState("");
	
	useEffect(() => {
		const fetchData = async () => {
			const aboutData = await getAboutAuthor();
			if (aboutData) {
				if (typeof aboutData.aboutText === "string") {
					setAboutText(aboutData.aboutText);
				}
				if (typeof aboutData.aboutTextHeader === "string") {
					setAboutHeaderText(aboutData.aboutTextHeader);
				}
			}
		};
		fetchData();
	}, []);

	return (
		<Container>
			<AboutMeContainer
				variants={fadeBoxIn}
				initial="hidden"
				animate={"visible"}
				exit="exit"
			>
				<BasicInfoContainer>
					<ImgContainer
						src={"/images/selfie.jpg"}
						alt="My Image"
					></ImgContainer>
					<BasicInfo>
						<BasicInfoDiv>
							Name: Daniel Thunman
						</BasicInfoDiv>
						<BasicInfoDiv>
							UserName: Thunman
						</BasicInfoDiv>
						<BasicInfoDiv>
							Age: 37
						</BasicInfoDiv>
						<BasicInfoDiv>
							Location: Gävle, SE
						</BasicInfoDiv>
						<BasicInfoDiv>
							Contact: Thunman42@gmail.com
						</BasicInfoDiv>
					</BasicInfo>
				</BasicInfoContainer>
				<TextContainer>
					<h1>{aboutHeaderText}</h1>
					<ReactQuill value={aboutText} readOnly={true} theme={"bubble"} />
				</TextContainer>
			</AboutMeContainer>
		</Container>
	);
};
export default Landing;
