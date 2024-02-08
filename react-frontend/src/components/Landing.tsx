import * as Styles from "../Styles/styles";
import { LoginProps } from "../Interfaces/Interfaces";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Landing: React.FC<LoginProps> = (props) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		auth.signOut()
			.then(() => {
				props.setIsLoggedIn(false);
				console.log("Bye!");
			})
			.catch((error) => {
				console.error("Error signing out:", error);
			});
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
