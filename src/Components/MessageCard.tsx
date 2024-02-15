import { FC, useEffect, useState } from "react";
import { getNameFromUid } from "../Services/Getters";
import { UserNameCard } from "../Styles/Styles";
import { useMessages } from "./MessageContext";
import { MessageCardProps } from "../Interfaces/Interfaces";

const MessageCard: FC<MessageCardProps> = ({ handleClick }) => {
	const messages = useMessages();
	const [userCounts, setUserCounts] = useState<{ [key: string]: number }>({});
	useEffect(() => {
		console.log("fetching names");
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
			console.log(counts);
			setUserCounts(counts);
		};
		fetchUserNames();

		console.log(messages);
	}, [messages]);

	return (
		<>
			{Object.entries(userCounts).map(([userName, count], index) => (
				<UserNameCard key={index} onClick={handleClick}>
					<p>
						{userName} ({count})
					</p>
				</UserNameCard>
			))}
		</>
	);
};
export default MessageCard;
