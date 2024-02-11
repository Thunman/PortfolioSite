import { useEffect, useRef, useState } from "react";
import {
    AboutMeContainer,
    BasicInfo,
	BasicInfoContainer,
	Container,
	H1,
	Img,
	ImgContainer,
	TextContainer,
} from "../Styles/Styles";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { fadeBoxIn } from "../Animations/Animations";
import { getBasicInfo } from "../Services/Retrivers";

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

    const handleButtonClick = () => {
        if (fileInput.current) fileInput.current.click();
      };
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        console.log(file);
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
                        src={basicInfo.imgUrl} alt="My Image"
                        onClick={handleButtonClick}
                    />
                    <input
                        type="file"
                        ref={fileInput}
                        style={{display: "none"}}
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
