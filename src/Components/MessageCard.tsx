import { UserNameCard } from "../Styles/Styles";
import useGetMessages from "../Hooks/getMessages";
import { MessageCardProps } from "../Interfaces/Interfaces";

const MessageCard: React.FC<MessageCardProps> = ({ handleClick }) => {
	const { messages } = useGetMessages();
	return (
		<>
			{messages.map((msg, index) => {
				const hasUnread = msg.unread;
				return (
					<UserNameCard
						key={index}
						id={msg.id}
						style={{
							backgroundColor: hasUnread ? "orange" : "#fff",
						}}
						onClick={() => handleClick(msg.id)}
					>
						<p>{msg.id}</p>
					</UserNameCard>
				);
			})}
		</>
	);
};
export default MessageCard;
