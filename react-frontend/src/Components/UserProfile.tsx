import { useEffect, useRef, useState } from "react";
import {
	AboutMeContainer,
	BasicInfo,
	BasicInfoContainer,
	BasicInfoDiv,
	Container,
	H1,
	ImgContainer,
	SaveButton,
	TextContainer,
} from "../Styles/Styles";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { fadeBoxIn } from "../Animations/Animations";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, fileStorage } from "../firebase";
import { saveBasicInfo, setProfilePicUrl } from "../Services/Setters";

import { useInput } from "../Hooks/InfoInput";

import { getBasicInfo } from "../Services/Getters";

const UserProfile = () => {
	const [basicInfo, setBasicInfo] = useState<BasicInfoProps>({
		name: "",
		email: "",
		userName: "",
		location: "",
		age: "",
		profilePicUrl: "",
	});
    const handleInputChange = (name: string, value: string) => {
        setBasicInfo(prevState => ({ ...prevState, [name]: value }));
      };
      const [name, NameInput] = useInput(basicInfo.name, "name", handleInputChange);
      const [userName, UserNameInput] = useInput(basicInfo.userName, "userName", handleInputChange);
      const [age, AgeInput] = useInput(basicInfo.age, "age", handleInputChange);
      const [location, LocationInput] = useInput(basicInfo.location, "location", handleInputChange);
    
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
      const handleImgClick = () => {
		if (fileInput.current) fileInput.current.click();
	};
 
	const handleSaveInfo = () => {
        console.log(basicInfo);
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
						{NameInput}
						{UserNameInput}
						{AgeInput}
						{LocationInput}
                        <BasicInfoDiv>
                            {basicInfo.email}
                        </BasicInfoDiv>
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
