import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing";
import Game from "./Components/Game";
import LevelEditor from "./Components/LevelEditor";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import PasswordReset from "./Components/PasswordReset";
import UserProfile from "./Components/UserProfile";
import DropDownButton from "./Components/DropDownButton";
import DropDownMenu from "./Components/DropDownMenu";
import GameButtons from "./Components/GameButtons";
import LogoutButton from "./Components/LogoutButton";
import { Container, MenuButton, StyledLink } from "./Styles/Styles";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [showGameButtons, setShowGameButtons] = useState(false);
	const toggleGameButtons = () => {
		setShowGameButtons(!showGameButtons);
	}
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoggedIn(!!user);
		});
		return () => unsubscribe();
	}, []);
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const handleMenuToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<div className="App">
			<Container
				onClick={() => {
					setShowGameButtons(false);
					setIsMenuOpen(false);
				
				}}
			>
				<Router>
					{!isLoggedIn && (
						<>
							<DropDownMenu isMenuOpen={isMenuOpen}>
								<MenuButton as={StyledLink} to={"/"}>
									Sign In
								</MenuButton>
								<MenuButton as={StyledLink} to={"/register"}>
									Register
								</MenuButton>
								<MenuButton as={StyledLink} to={"/passwordReset"}>
									Password Recovery
								</MenuButton>
								<div style={{ flexGrow: 1 }}></div>
							</DropDownMenu>
							<DropDownButton
								isMenuOpen={isMenuOpen}
								handleMenuToggle={handleMenuToggle}
							/>
							<Routes>
								<Route
									path="/"
									element={<Login setIsLoggedIn={setIsLoggedIn} />}
								/>
								<Route path="/register" element={<Register />} />
								<Route
									path="/passwordReset"
									element={<PasswordReset />}
								/>
							</Routes>
						</>
					)}
					{isLoggedIn && (
						<>
							<DropDownMenu isMenuOpen={isMenuOpen}>
								<MenuButton as={StyledLink} to={"/"}>
									Start
								</MenuButton>
								<MenuButton as={StyledLink} to={"/userProfile"}>
									Profile
								</MenuButton>
								<MenuButton
									onClick={(e) => {
										e.stopPropagation();
										toggleGameButtons();
									}}
									style={{
										backgroundColor: showGameButtons
											? "#1a202c"
											: "#475569",
									}}
								>
									Games
								</MenuButton>
								<GameButtons showGameButtons={showGameButtons} />
								<div style={{ flexGrow: 1 }}></div>
								<LogoutButton setIsLoggedIn={setIsLoggedIn} />
							</DropDownMenu>
							<DropDownButton
								isMenuOpen={isMenuOpen}
								handleMenuToggle={handleMenuToggle}
							/>
							<Routes>
								<Route
									path="/"
									element={<Landing />}
								/>
								<Route path="/game" element={<Game />} />
								<Route path="/levelEditor" element={<LevelEditor />} />
								<Route path="userProfile" element={<UserProfile />} />
							</Routes>
						</>
					)}
				</Router>
			</Container>
		</div>
	);
}

export default App;
