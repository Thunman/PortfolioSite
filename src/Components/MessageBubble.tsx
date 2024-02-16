import { MessageDivProps } from "../Interfaces/Interfaces";
import { MessageBubble } from "../Styles/Styles";

const Work: React.FC<MessageDivProps> = ({ messages }) => {
	let text = "";
    console.log("test",messages)
	messages.forEach(
		(item) => {
			const date = new Date(item.timestamp.seconds * 1000);
			text += item.msg;
			text += `\n--${date.toLocaleDateString()} ${date.toLocaleTimeString()}--\n`;
			text += item.msg;
			text += `\n--${date.toLocaleDateString()} ${date.toLocaleTimeString()}--\n`;
			text += item.msg;
			text += `\n--${date.toLocaleDateString()} ${date.toLocaleTimeString()}--\n`;
			text += item.msg;
			text += `\n--${date.toLocaleDateString()} ${date.toLocaleTimeString()}--\n`;
			text += item.msg;
			text += `\n--${date.toLocaleDateString()} ${date.toLocaleTimeString()}--\n`;
			text += item.msg;
			text += `\n--${date.toLocaleDateString()} ${date.toLocaleTimeString()}--\n`;
			text += item.msg;
			text += `\n--${date.toLocaleDateString()} ${date.toLocaleTimeString()}--\n`;
			text += item.msg;
			text += `\n--${date.toLocaleDateString()} ${date.toLocaleTimeString()}--\n`;
			text += item.msg;
			text += `\n--${date.toLocaleDateString()} ${date.toLocaleTimeString()}--\n`;

		}
	);

	return (

        <MessageBubble>
            <p>{text}</p>
        </MessageBubble>
    )
};

export default Work;
