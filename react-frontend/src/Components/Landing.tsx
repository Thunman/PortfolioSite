import * as Styles from "../Styles/Styles";
import { LoginProps } from "../Interfaces/Interfaces";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Landing: React.FC<LoginProps> = (props) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		auth
			.signOut()
			.then(() => {
				props.setIsLoggedIn(false);
				console.log("Bye!");
			})
			.catch((error) => {
				console.error("Error signing out:", error);
			});
	};

	const fadeBoxIn = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 5,
			},
		},
	};

	const slideInMenu = {
		hidden: {
			x: "-208px",
			opacity: 0,
		},
		visible: {
			x: "0",
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
		exit: {
			x: "-100vw",
			opacity: 0,
		},
	};
	const slideInHeader = {
		hidden: {
			x: "0",
			opacity: 1,
		},
		visible: {
			x: "208px",
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
		exit: {
			x: "-100vw",
			opacity: 0,
		},
	};

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<Styles.Container onClick={() => handleMenuToggle()}>
			<Styles.Menu
				onClick={(e) => e.stopPropagation()}
				variants={slideInMenu}
				initial="hidden"
				animate={isMenuOpen ? "visible" : "hidden"}
				exit="exit"
			>
				<Styles.Button as={Link} to="/levelEditor">
					Level Editor
				</Styles.Button>
				<Styles.Button as={Link} to="/game">
					Game
				</Styles.Button>
			</Styles.Menu>

			<Styles.Header
				style={{
					background: isMenuOpen ? "#1a202c" : "initial",
				}}
				variants={slideInHeader}
				initial="hidden"
				animate={isMenuOpen ? "visible" : "hidden"}
				exit="exit"
			>
				<Styles.HeaderButton onClick={handleMenuToggle}>
					<FaBars />
				</Styles.HeaderButton>
			</Styles.Header>
			<Styles.FormContainer
				variants={fadeBoxIn}
				initial="hidden"
				animate="visible"
			>
				<div>Hello World!</div>
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
