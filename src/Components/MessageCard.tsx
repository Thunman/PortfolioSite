import { UserNameCard } from "../Styles/Styles";
import { useMessages } from "../Hooks/MessageContext";
import { MessageCardProps } from "../Interfaces/Interfaces";

const MessageCard: React.FC<MessageCardProps> = ({ handleClick }) => {
	const messages = useMessages();
	return (
		<>
			{messages.map((msg, index) => (
				<UserNameCard
					key={index}
					id={msg.id}
					onClick={() => handleClick(msg.id)}
				>
					<p>{msg.id}</p>
				</UserNameCard>
			))}
		</>
	);
};
export default MessageCard;
