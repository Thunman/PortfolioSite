import { useEffect, useRef, useState } from "react";
import {
	AboutMeContainer,
	BasicInfo,
	BasicInfoContainer,
	Container,
	H1,
	ImgContainer,
	TextContainer,
} from "../Styles/Styles";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { fadeBoxIn } from "../Animations/Animations";
import { getBasicInfo } from "../Services/Getters";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, fileStorage } from "../firebase";
import { setProfilePicUrl } from "../Services/Setters";
const UserProfile = () => {
	const [basicInfo, setBasicInfo] = useState<Partial<BasicInfoProps>>({});
	const fileInput = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const fetchData = async () => {
			const data = await getBasicInfo();
			if (data) {
				setBasicInfo(data);
			}
		};
		fetchData();
	}, []);

	const handleImgClick = () => {
		if (fileInput.current) fileInput.current.click();
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		const storageRef = ref(
			fileStorage,
			`users/${auth.currentUser?.uid}/profilePicture`
		);
		try {
			const res = await uploadBytes(storageRef, file);
			alert(res.metadata.name + " uploaded successfully");
            const url = await getDownloadURL(storageRef);
            setProfilePicUrl(url);
            console.log(url);
		} catch (error) {
			alert(`Error uploading file: ${error}`);
		}
	};

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
						src={basicInfo.profilePicUrl || "Not found"}
						alt="Click to upload a profile picture"
						onClick={handleImgClick}
						style={{ cursor: "pointer" }}
					/>
					<input
						type="file"
						ref={fileInput}
						style={{ display: "none" }}
						onChange={handleFileChange}
					/>
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

export default UserProfile;
