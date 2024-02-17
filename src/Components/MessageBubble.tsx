import { MessageDivProps, MessageProps } from "../Interfaces/Interfaces";
import { MessageTextContainer } from "../Styles/Styles";

const MessageBubble: React.FC<MessageDivProps> = ({ messages }) => {
	return (
		<>
			{messages.map((item: MessageProps, index: number) => {
				const date = new Date(item.timestamp.seconds * 1000);
				const today = new Date();

				const hours = String(date.getHours()).padStart(2, "0");
				const minutes = String(date.getMinutes()).padStart(2, "0");
				const time = `${hours}:${minutes}`;

				let formattedDate = "";
				if (
					date.getDate() === today.getDate() &&
					date.getMonth() === today.getMonth() &&
					date.getFullYear() === today.getFullYear()
				) {
					formattedDate = time;
				} else {
					const day = String(date.getDate()).padStart(2, "0");
					const month = String(date.getMonth() + 1).padStart(2, "0");
					const year = String(date.getFullYear()).slice(-2);
					formattedDate = `${day}/${month}/${year} ${time}`;
				}
				return (
					<MessageTextContainer key={index}>
						{formattedDate && (
							<>
								{formattedDate}
								<br />
							</>
						)}
						{item.msg}
					</MessageTextContainer>
				);
			})}
		</>
	);
};

export default MessageBubble;
