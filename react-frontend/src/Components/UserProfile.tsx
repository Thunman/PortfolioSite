import { useEffect, useRef, useState } from "react";
import {
	AboutMeContainer,
	BasicInfo,
	BasicInfoContainer,
	Container,
	H1,
	ImgContainer,
	MenuButton,
	SaveButton,
	TextContainer,
} from "../Styles/Styles";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { fadeBoxIn } from "../Animations/Animations";
import { getBasicInfo } from "../Services/Getters";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, fileStorage } from "../firebase";
import { saveBasicInfo, setProfilePicUrl } from "../Services/Setters";

const UserProfile = () => {
	const [basicInfo, setBasicInfo] = useState<BasicInfoProps>({
		profilePicUrl: "",
		name: "",
		email: "",
		userName: "",
		location: "",
		age: "",
	});
	const fileInput = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const fetchData = async () => {
			const data: BasicInfoProps | undefined = await getBasicInfo();
			if (data) {
                const validData: BasicInfoProps = {
                    profilePicUrl: data.profilePicUrl || "",
                    name: data.name || "",
                    email: data.email || "",
                    userName: data.userName || "",
                    location: data.location || "",
                    age: data.age || "",
                };
                setBasicInfo(validData);
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
		} catch (error) {
			alert(`Error uploading file: ${error}`);
		}
	};
	const handleInfoChange = (e: React.MouseEvent<HTMLElement>) => {
		const field = e.currentTarget.id;
		const newInfo = prompt(`Enter ${field}`);
		if (newInfo !== null && field in basicInfo) {
			setBasicInfo((prevState) => ({ ...prevState, [field]: newInfo }));
		}
	};
    const handleSaveInfo = () => {
        saveBasicInfo(basicInfo);

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
						<p onClick={handleInfoChange} id="name">
							Name: {basicInfo.name}
						</p>
                        <p onClick={handleInfoChange} id="userName">
							User Name: {basicInfo.userName}
						</p>
						<p onClick={handleInfoChange} id="age">
							Age: {basicInfo.age}
						</p>
						<p onClick={handleInfoChange} id="location">
							Location: {basicInfo.location}
						</p>
						<p>Contact: {basicInfo.email}</p>
					</BasicInfo>
                    <SaveButton onClick={handleSaveInfo}>Save</SaveButton>
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
