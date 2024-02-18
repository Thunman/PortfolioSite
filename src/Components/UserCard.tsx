import { useEffect, useState } from "react";
import { getAllUsers } from "../Services/Getters";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { UserCardText, UserDiv } from "../Styles/Styles";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
	const [allUsers, setAllUsers] = useState<BasicInfoProps[]>([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getAllUsers();
			setAllUsers(users);
		};
		fetchUsers();
	}, []);

	const handleClick = (user: BasicInfoProps) => {
		navigate(`/user/${user.uid}`);
	};
	return (
		<>
			{allUsers.map((user, index) => (
				<UserDiv key={index} onClick={() => handleClick(user)}>
					<UserCardText>{user.userName}</UserCardText>

					<p>{user.location}</p>
				</UserDiv>
			))}
		</>
	);
};
export default UserCard;
