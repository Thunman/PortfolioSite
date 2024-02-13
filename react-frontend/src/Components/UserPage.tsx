import {
	Container,
	ImgContainer,
	AboutMeContainer,
	TextContainer,
	BasicInfoContainer,
	BasicInfo,
	BasicInfoDiv,
} from "../Styles/Styles";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { useEffect, useState } from "react";
import { fadeBoxIn } from "../Animations/Animations";
import { getBasicInfo, getAboutInfo } from "../Services/Getters";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UserPage = () => {
	const [basicInfo, setBasicInfo] = useState<Partial<BasicInfoProps>>({});
	const [aboutText, setAboutText] = useState("");
	const [aboutHeaderText, setAboutHeaderText] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			const data = await getBasicInfo();
			if (data) {
				setBasicInfo(data);
			}
			const aboutData = await getAboutInfo();
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
						src={basicInfo.profilePicUrl}
						alt="My Image"
					></ImgContainer>
					<BasicInfo>
						<BasicInfoDiv>
							Name: {basicInfo.name}
						</BasicInfoDiv>
						<BasicInfoDiv>
							UserName: {basicInfo.userName}
						</BasicInfoDiv>
						<BasicInfoDiv>
							Age: {basicInfo.age}
						</BasicInfoDiv>
						<BasicInfoDiv>
							Location: {basicInfo.location}
						</BasicInfoDiv>
						<BasicInfoDiv>
							Contact: {basicInfo.email}
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
export default UserPage;