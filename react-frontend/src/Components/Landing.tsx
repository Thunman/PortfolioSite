import {
	Button,
	Container,
	FormContainer,
	Header,
	HeaderButton,
	Menu,
} from "../Styles/Styles";
import {
	fadeBoxIn,
	slideInMenu,
	slideInHeader,
} from "../Animations/Animations";
import { LoginProps } from "../Interfaces/Interfaces";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { logout } from "../Services/auth";


const Landing: React.FC<LoginProps> = (props) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		logout().then((res) => {
			if (res) {
				props.setIsLoggedIn(false);
			}
		});
	};

	const [isAnimationComplete, setAnimationComplete] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	useEffect(() => {
		if (!isMenuOpen) {
		  setAnimationComplete(false);
		}
	  }, [isMenuOpen]);

	return (
		<Container onClick={() => setIsMenuOpen(false)}>
			<Menu
				onClick={(e) => e.stopPropagation()}
				variants={slideInMenu}
				initial="hidden"
				animate={isMenuOpen ? "visible" : "hidden"}
				exit="exit"
				onAnimationComplete={() => setAnimationComplete(true)}
			>
				<Button as={Link} to="/levelEditor">
					Level Editor
				</Button>
				<Button as={Link} to="/game">
					Game
				</Button>
			</Menu>
			<Header
				onClick={(e) => e.stopPropagation()}
				style={{
					background: isMenuOpen ? "#1a202c" : "initial",
				}}
				variants={slideInHeader}
				initial="hidden"
				animate={isMenuOpen ? "visible" : "hidden"}
				exit="exit"
				onAnimationComplete={() => setAnimationComplete(true)}
			>
				<HeaderButton onClick={handleMenuToggle}>
				{isAnimationComplete ? (isMenuOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />) : <FaAngleDoubleRight />}
				</HeaderButton>
			</Header>
			<FormContainer variants={fadeBoxIn} initial="hidden" animate="visible">
				<div>Hello World!</div>
				<br />
				<Button
					as={Link}
					to="/levelEditor"
					style={{ textDecoration: "none" }}
				>
					Level Editor
				</Button>
				<Button as={Link} to="/game" style={{ textDecoration: "none" }}>
					Game
				</Button>
				<Button type="submit" onClick={handleSubmit}>
					Log Out
				</Button>
			</FormContainer>
		</Container>
	);
};
export default Landing;
