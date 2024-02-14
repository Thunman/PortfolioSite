import { useEffect, useRef, useState } from "react";
import {
	AboutMeContainer,
	BasicInfo,
	BasicInfoContainer,
	Container,
	H1,
	ImgContainer,
	SaveButton,
	TextContainer,
	BasicInfoDiv,
	HeaderInput,
	HeaderContainer,
	ParagraphContainer,
} from "../Styles/Styles";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { fadeBoxIn } from "../Animations/Animations";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, fileStorage } from "../firebase";
import {
    adminSave,
	saveAboutHeaderText,
	saveAboutText,
	saveBasicInfo,
	setProfilePicUrl,
} from "../Services/Setters";
import { useInput } from "../Hooks/InfoInput";
import { getAboutInfo, getBasicInfo, getIsAdmin } from "../Services/Getters";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { aboutTextProps } from "../Interfaces/Interfaces";

const UserProfile = () => {
	const [basicInfo, setBasicInfo] = useState<BasicInfoProps>({
		name: "",
		email: "",
		userName: "",
		location: "",
		age: "",
		profilePicUrl: "",
		showEmail: ""
	});
	const handleInputChange = (name: string, value: string) => {
		setBasicInfo((prevState) => ({ ...prevState, [name]: value }));
	};
	const [name, NameInput] = useInput(
		basicInfo.name,
		"name",
		handleInputChange
	);
	const [userName, UserNameInput] = useInput(
		basicInfo.userName,
		"userName",
		handleInputChange
	);
	const [age, AgeInput] = useInput(basicInfo.age, "age", handleInputChange);
	const [location, LocationInput] = useInput(
		basicInfo.location,
		"location",
		handleInputChange
	);
	
	const [aboutText, setAboutText] = useState("");
	const [isHeaderInputVisible, setHeaderInputVisible] = useState(false);
	const [aboutHeaderText, setAboutHeaderText] = useState("");
	const inputHeaderRef = useRef<HTMLInputElement>(null);
	const fileInput = useRef<HTMLInputElement>(null);
	const [amIAdmin, setAmIAdmin] = useState(false);
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
					showEmail: data.showEmail || "false",
				};
				setBasicInfo(validData);
			}
			const aboutInfo: aboutTextProps | undefined = await getAboutInfo();
			if (typeof aboutInfo?.aboutText === "string") {
				setAboutText(aboutInfo.aboutText);
			}
			if (typeof aboutInfo?.aboutTextHeader === "string") {
				setAboutHeaderText(aboutInfo.aboutTextHeader);
			}
            checkIsAdmin();
            
		};
		fetchData();
	}, []);
	useEffect(() => {
		if (isHeaderInputVisible && inputHeaderRef.current) {
			inputHeaderRef.current.focus();
		}
	}, [isHeaderInputVisible]);
	const toggleHeaderInput = () => {
		setHeaderInputVisible(!isHeaderInputVisible);
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		if (!file.type.startsWith("image/")) {
			alert("Only image files are allowed");
			return;
		}
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

	const handleSaveInfo = async () => {
		const basicInfoSucces = await saveBasicInfo(basicInfo);
		const headerSucces = await saveAboutHeaderText(aboutHeaderText);
		const textSucces = await saveAboutText(aboutText);
		if (basicInfoSucces && headerSucces && textSucces) {
            alert("Saved successfully");
        } else {
            alert("Failed to save");
        }
	};
    const checkIsAdmin = async () => {
        const user = auth.currentUser;
        const isAdmin = await getIsAdmin();
        if (isAdmin && user) {
            setAmIAdmin(true);
        }
    };
    const handleAdminSaveInfo = async () => {
        await adminSave(aboutHeaderText, aboutText);
    };
	const toggleShowEmail = () => {
		setBasicInfo(prevState => ({
			...prevState,
			showEmail: prevState.showEmail === "true" ? "false" : "true"
		}));
		
	};
	useEffect(() => {

	}, [basicInfo.showEmail]);

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
						accept="image/*"
					/>
					<BasicInfo>
						{NameInput}
						{UserNameInput}
						{AgeInput}
						{LocationInput}
						
						<BasicInfoDiv>Contact: {basicInfo.email}</BasicInfoDiv>
						<BasicInfoDiv>
							Show Email in profile?<input type="checkbox"
								onChange={toggleShowEmail}
								checked={basicInfo.showEmail === 'true'}
							/>
						</BasicInfoDiv>
					</BasicInfo>
					<SaveButton onClick={handleSaveInfo}>Save</SaveButton>
				</BasicInfoContainer>
				<TextContainer
					onClick={() => {
						setHeaderInputVisible(false);
					}}
				>
					<HeaderContainer>
						{!isHeaderInputVisible && (
							<H1
								onClick={(e) => {
									e.stopPropagation();
									toggleHeaderInput();
								}}
							>
								{aboutHeaderText || "About me"}
							</H1>
						)}
						<HeaderInput
							ref={inputHeaderRef}
							type="text"
							value={aboutHeaderText}
							onChange={(e) => setAboutHeaderText(e.target.value)}
							placeholder="Enter about me header"
							style={{
								display: isHeaderInputVisible ? "block" : "none",
							}}
							onBlur={toggleHeaderInput}
							onClick={(e) => e.stopPropagation()}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									inputHeaderRef.current?.blur();
								}
							}}
						/>
					</HeaderContainer>
					<ParagraphContainer>
						<ReactQuill
							theme="snow"
							style={{ width: "100%", height: "80%" }}
							value={aboutText}
							onChange={setAboutText}
							placeholder="Enter about me text"
						/>
					</ParagraphContainer>
				</TextContainer>
				{amIAdmin && (
					<SaveButton onClick={handleAdminSaveInfo}>Save</SaveButton>
				)}
			</AboutMeContainer>
		</Container>
	);
};

export default UserProfile;
