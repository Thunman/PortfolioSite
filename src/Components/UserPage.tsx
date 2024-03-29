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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const UserPage = () => {
	const { userId } = useParams();
	const [basicInfo, setBasicInfo] = useState<Partial<BasicInfoProps>>({});
	const [aboutText, setAboutText] = useState("");
	const [aboutHeaderText, setAboutHeaderText] = useState("");
	useEffect(() => {

		const fetchData = async () => {
			if (!userId) return
			const data = await getBasicInfo(userId);
			if (data) {
				setBasicInfo(data);
			}
			const aboutData = await getAboutInfo(userId);
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
	}, [userId]);

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
						<BasicInfoDiv>Name: {basicInfo.name}</BasicInfoDiv>
						<BasicInfoDiv>UserName: {basicInfo.userName}</BasicInfoDiv>
						<BasicInfoDiv>Age: {basicInfo.age}</BasicInfoDiv>
						<BasicInfoDiv>Location: {basicInfo.location}</BasicInfoDiv>
						{basicInfo.showEmail === "true" && <BasicInfoDiv>Contact: <a href={`mailto:${basicInfo.email}`}>{basicInfo.email}</a></BasicInfoDiv>}
						
					</BasicInfo>
				</BasicInfoContainer>
				<TextContainer>
					<h1>{aboutHeaderText}</h1>
					<ReactQuill
						value={aboutText}
						readOnly={true}
						theme={"bubble"}
						style={{ height: "80%", width: "100%" }}
					/>
				</TextContainer>
			</AboutMeContainer>
		</Container>
	);
};
export default UserPage;
