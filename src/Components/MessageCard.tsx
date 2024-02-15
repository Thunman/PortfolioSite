import { useEffect, useState } from "react";
import { getNameFromUid } from "../Services/Getters";
import { UserNameCard } from "../Styles/Styles";
import { useMessages } from "./MessageContext";

const MessageCard = () => {
	const messages = useMessages();
	const [userCounts, setUserCounts] = useState<{ [key: string]: number }>({});
	useEffect(() => {
		const fetchUserNames = async () => {
			const counts: { [key: string]: number } = {};
			for (let msg of messages) {
				const data = msg.data();
				const userName = await getNameFromUid(data.senderId);
				if (counts[userName]) {
					counts[userName]++;
				} else {
					counts[userName] = 1;
				}
			}
			setUserCounts(counts);
		};
		fetchUserNames();
	}, [messages]);

	return (
		<>
			{Object.entries(userCounts).map(([userName, count], index) => (
				<UserNameCard key={index}>
					<p>
						{userName} ({count})
					</p>
				</UserNameCard>
			))}
		</>
	);
};
export default MessageCard;
