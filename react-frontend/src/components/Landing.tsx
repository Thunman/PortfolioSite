import * as Styles from "../styles/styles";
import { LoginProps } from "./interface";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const Landing: React.FC<LoginProps> = (props) => {
	const handleSubmit = (e: React.FormEvent) => {
		props.setIsLoggedIn(false);
		console.log("Bye!");
	};
	const fade = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	return (
		<Styles.Container>
			<Styles.FormContainer>
				<animated.div style={fade}>Hello World!</animated.div>
				<br />
				<Styles.Button
					as={Link}
					to="/levelEditor"
					style={{ textDecoration: "none" }}
				>
					Level Editor
				</Styles.Button>
				<Styles.Button
					as={Link}
					to="/game"
					style={{ textDecoration: "none" }}
				>
					Game
				</Styles.Button>
				<Styles.Button type="submit" onClick={handleSubmit}>
					Log Out
				</Styles.Button>
			</Styles.FormContainer>
		</Styles.Container>
	);
};
export default Landing;
