import {
	H1,
	MessageBodyDiv,
	MessageDisplay,
	MessageHeaderDiv,
	MessageListDiv,
	MessagesContainer,
	UserNameCard,
} from "../Styles/Styles";


const Messages = () => {
	return (
		<MessagesContainer>
			<MessageHeaderDiv>
				<H1>Messages</H1>
			</MessageHeaderDiv>
			<MessageBodyDiv>
				<MessageListDiv>
					<UserNameCard>names</UserNameCard>
				</MessageListDiv>
				<MessageDisplay>
                
					<p>message here</p>
				</MessageDisplay>
			</MessageBodyDiv>
		</MessagesContainer>
	);
};

export default Messages;
