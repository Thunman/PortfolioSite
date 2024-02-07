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

function App() {
	
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
		  setIsLoggedIn(!!user);
		});
	
		
		return () => unsubscribe();
	  }, []);

	return (
		<div className="App">
			<Router>
				{!isLoggedIn && (
					<Routes>
						<Route
							path="/"
							element={<Login setIsLoggedIn={setIsLoggedIn} />}
						/>
						<Route path="/register" element={<Register />} />
					</Routes>
				)}
				{isLoggedIn && (
					<Routes>
						<Route
							path="/"
							element={<Landing setIsLoggedIn={setIsLoggedIn} />}
						/>
						<Route path="/game" element={<Game />} />
						<Route path="/levelEditor" element={<LevelEditor />} />
					</Routes>
				)}
			</Router>
		</div>
	);
}

export default App;
