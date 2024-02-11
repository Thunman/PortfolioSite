import { useEffect, useRef, useState } from "react";
import {
	AboutMeContainer,
	BasicInfo,
	BasicInfoContainer,
	Container,
	H1,
	ImgContainer,
	BasicInfoDiv,
	SaveButton,
	TextContainer,
} from "../Styles/Styles";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { fadeBoxIn } from "../Animations/Animations";
import { getBasicInfo } from "../Services/Getters";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, fileStorage } from "../firebase";
import { saveBasicInfo, setProfilePicUrl } from "../Services/Setters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { set } from "date-fns";

const UserProfile = () => {
	const [basicInfo, setBasicInfo] = useState<BasicInfoProps>({
		profilePicUrl: "",
		name: "",
		email: "",
		userName: "",
		location: "",
		age: "",
	});
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
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
		if (field !== "age") {
			const newInfo = prompt(`Enter ${field}`);
			if (newInfo !== null && field in basicInfo) {
				setBasicInfo((prevState) => ({ ...prevState, [field]: newInfo }));
			}
		}
		if (field === "age") {
			setShowDatePicker(true);
			setSelectedDate(new Date());
			let dob = dobParser(selectedDate.toISOString());
			let age = ageCalc(dob);
			setBasicInfo((prevState) => ({ ...prevState, age: age.toString() }));
		}
	};
	const handleSaveInfo = () => {
		saveBasicInfo(basicInfo);
	};
	const dobParser = (dob: string) => {
		const date = new Date(dob);
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
	};
	const ageCalc = (dob: string) => {
		const today = new Date();
		const birthDate = new Date(dob);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};
	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		let dob = dobParser(date.toISOString());
		let age = ageCalc(dob);
		setBasicInfo((prevState) => ({ ...prevState, age: age.toString() }));
		setShowDatePicker(false);
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
						<BasicInfoDiv onClick={handleInfoChange} id="name">
							Name: <br />
							{basicInfo.name}
						</BasicInfoDiv>
						<BasicInfoDiv onClick={handleInfoChange} id="userName">
							User Name: <br />
							{basicInfo.userName}
						</BasicInfoDiv>
						<BasicInfoDiv onClick={handleInfoChange} id="age">
							Age: {basicInfo.age}
						</BasicInfoDiv>
						{showDatePicker && (
							<DatePicker
								selected={selectedDate}
								onChange={handleDateChange}
								showYearDropdown
								minDate={new Date("1900-01-01")}
								maxDate={new Date()}
								dateFormat="dd/MM/yyyy"
								allowSameDay
							/>
						)}
						<BasicInfoDiv onClick={handleInfoChange} id="location">
							Location: {basicInfo.location}
						</BasicInfoDiv>
						<BasicInfoDiv>Contact: {basicInfo.email}</BasicInfoDiv>
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
