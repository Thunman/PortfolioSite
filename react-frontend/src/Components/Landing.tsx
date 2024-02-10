import {
	Button,
	Container,
	FormContainer,
	Header,
	HeaderButton,
	Menu,
	MenuButton,
} from "../Styles/Styles";
import {
	fadeBoxIn,
	slideInMenu,
	slideInHeader,
} from "../Animations/Animations";
import { LoginProps } from "../Interfaces/Interfaces";
import { Link } from "react-router-dom";
import { FaAngleDoubleDown, FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleDoubleUp, FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { logout } from "../Services/auth";


const Landing: React.FC<LoginProps> = (props) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		logout().then((res) => {
			if (res.success) {
				props.setIsLoggedIn(false);
			} else {
				alert(res.message);
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
				<MenuButton as={Link} to="/levelEditor">
					Level Editor
				</MenuButton>
				<MenuButton as={Link} to="/game">
					Game
				</MenuButton>
				<MenuButton as={Link} to="/game">
					Game
				</MenuButton>
				<MenuButton as={Link} to="/game">
					Game
				</MenuButton>
				<MenuButton as={Link} to="/game">
					Game
				</MenuButton>
			</Menu>
			<Header
				onClick={(e) => e.stopPropagation()}
				style={{
					
					//borderTop: isMenuOpen ? "4px solid #475569" : "none",
				}}
				variants={slideInHeader}
				initial="hidden"
				animate={isMenuOpen ? "visible" : "hidden"}
				exit="exit"
				onAnimationComplete={() => setAnimationComplete(true)}
			>
				<HeaderButton onClick={handleMenuToggle}>
				{isAnimationComplete ? (isMenuOpen ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />) : <FaAngleDoubleDown />}
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
