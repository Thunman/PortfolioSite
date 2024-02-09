import * as Styles from "../Styles/Styles";
import { LoginProps } from "../Interfaces/Interfaces";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { logout } from "../Services/auth";
import { fadeBoxIn, slideInMenu, slideInHeader } from "../Animations/Animations";

const Landing: React.FC<LoginProps> = (props) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		logout().then((res) => {
			if (res) {
				props.setIsLoggedIn(false);
			}
		});
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
