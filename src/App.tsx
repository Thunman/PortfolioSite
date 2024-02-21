import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing";
import Game from "./Components/Game";
import LevelEditor from "./Components/LevelEditor";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import PasswordReset from "./Components/PasswordReset";
import UserProfile from "./Components/UserProfile";
import DropDownButton from "./Components/DropDownButton";
import DropDownMenu from "./Components/DropDownMenu";
import GameButtons from "./Components/GameButtons";
import LogoutButton from "./Components/LogoutButton";
import { Container, MenuButton, StyledLink } from "./Styles/Styles";
import { getBasicInfo } from "./Services/Getters";
import UserPage from "./Components/UserPage";
import UserFinder from "./Components/UserFinder";
import Messages from "./Components/Messages";
import { MessagesProvider } from "./Hooks/MessageContext";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { DataProps } from "./Interfaces/Interfaces";

function App() {
	const [userName, setUserName] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [showGameButtons, setShowGameButtons] = useState(false);
	const [color, setColor] = useState("#475569");
	const [uid, setUid] = useState("");
	const toggleGameButtons = () => {
		setShowGameButtons(!showGameButtons);
	};

	useEffect(() => {
		if (uid) {
			const messageRef = collection(doc(db, "Users", uid), "messages");
			const unsubscribe = onSnapshot(messageRef, (querySnapshot) => {
				const messagesFromDb: DataProps[] = querySnapshot.docs.map(
					(doc) => ({
						id: doc.id,
						...(doc.data() as DataProps),
					})
				);
				let hasUnread = false;
				for (let message of messagesFromDb) {
					if (message.unread) {
						hasUnread = true;
						break;
					}
				}
				if (hasUnread) {
					console.log("yes unread");
					setColor("orange");
				} else {
					console.log("no unread");
					setColor("#475569");
				}
			});

			return () => unsubscribe();
		}
	}, [userName]);
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
	const getUserName = async () => {
		if (auth.currentUser) {
			const id = auth.currentUser?.uid;
			const user = await getBasicInfo(id);
			setUserName(user?.userName || "");
			setUid(id);
		}
	};

	useEffect(() => {
		getUserName();
	}, [isLoggedIn]);
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
								<MenuButton as={StyledLink} to={"/login"}>
									Sign In
								</MenuButton>
								<MenuButton as={StyledLink} to={"/register"}>
									Register
								</MenuButton>
								<MenuButton as={StyledLink} to={"/passwordReset"}>
									Password Recovery
								</MenuButton>
								<MenuButton
									as={StyledLink}
									to={"#"}
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
								<MenuButton
									as="a"
									href="https://github.com/Thunman"
									target="_blank"
									rel="noopener noreferrer"
								>
									GitHub
								</MenuButton>
							</DropDownMenu>
							<DropDownButton
								isMenuOpen={isMenuOpen}
								handleMenuToggle={handleMenuToggle}
							/>
							<Routes>
								<Route path="/" element={<Landing />} />
								<Route
									path="/login"
									element={<Login setIsLoggedIn={setIsLoggedIn} />}
								/>
								<Route
									path="/register"
									element={<Register setIsLoggedIn={setIsLoggedIn} />}
								/>
								<Route
									path="/passwordReset"
									element={<PasswordReset />}
								/>
								<Route path="/game" element={<Game />} />
								<Route path="/levelEditor" element={<LevelEditor />} />
							</Routes>
						</>
					)}
					{isLoggedIn && (
						<MessagesProvider>
							<DropDownMenu isMenuOpen={isMenuOpen}>
								<MenuButton
									as={StyledLink}
									to={`/user/${auth.currentUser?.uid}`}
								>
									{userName ? `${userName}'s Profile` : "Profile"}
								</MenuButton>
								<MenuButton
									as={StyledLink}
									to={`/userProfile/${auth.currentUser?.uid}`}
								>
									Change Profile Information
								</MenuButton>
								<MenuButton as={StyledLink} to={"/userFinder"}>
									Find Users
								</MenuButton>

								<MenuButton
									as={StyledLink}
									to={"/messages"}
									style={{
										backgroundColor: color,
									}}
								>
									Messages
								</MenuButton>
								<MenuButton
									as={StyledLink}
									to={"#"}
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
								<Route path="/" element={<Landing />} />
								<Route
									path="/userPage/:userId"
									element={<UserPage />}
								/>
								<Route path="/game" element={<Game />} />
								<Route path="/levelEditor" element={<LevelEditor />} />
								<Route
									path="/userProfile/:userId"
									element={<UserProfile />}
								/>
								<Route path="/userFinder" element={<UserFinder />} />
								<Route path="/user/:userId" element={<UserPage />} />
								<Route path="/messages" element={<Messages />} />
							</Routes>
						</MessagesProvider>
					)}
				</Router>
			</Container>
		</div>
	);
}

export default App;
