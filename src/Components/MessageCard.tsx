import { UserNameCard } from "../Styles/Styles";
import useGetMessages from "../Hooks/getMessages";
import { MessageCardProps } from "../Interfaces/Interfaces";

const MessageCard: React.FC<MessageCardProps> = ({ handleClick }) => {
	const { messages } = useGetMessages();
	let unread = false;
	return (
		<>
			{messages.map((user, index) => {
				unread = false;
				if(user.unread)	{
					unread = user.unread;
				}
				return (
					<UserNameCard
						key={index}
						id={user.id}
						style={{
							backgroundColor: unread ? "orange" : "#fff",
						}}
						onClick={() => handleClick(user.id)}
					>
						<p>{user.id}</p>
					</UserNameCard>
				);
			})}
		</>
	);
};
export default MessageCard;
