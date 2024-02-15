import { useEffect, useState } from "react";
import { getAllUsers } from "../Services/Getters";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { UserDiv } from "../Styles/Styles";


const UserCard = () => {
    const [allUsers, setAllUsers] = useState<BasicInfoProps[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setAllUsers(users)
        };
        fetchUsers();
    },[])


    return (
        <>
            {allUsers.map((user, index) => (
                <UserDiv key={index}>
                    <h3>{user.userName}</h3>
                    
                    <p>{user.location}</p>
                </UserDiv>
            ))}
        </>
    )
};
export default UserCard