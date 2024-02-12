import {
	Container,
	ImgContainer,
	AboutMeContainer,
	TextContainer,
	H1,
	BasicInfoContainer,
	BasicInfo,
	BasicInfoChangeDiv,
	BasicInfoDiv,
} from "../Styles/Styles";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { useEffect, useState } from "react";
import { fadeBoxIn } from "../Animations/Animations";
import { getBasicInfo } from "../Services/Getters";

const Landing = () => {
	const [basicInfo, setBasicInfo] = useState<Partial<BasicInfoProps>>({});

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
					<H1>Placeholder for about me</H1>
					<p>All work and no play makes Daniel a dull boy!</p>
				</TextContainer>
			</AboutMeContainer>
		</Container>
	);
};
export default Landing;
