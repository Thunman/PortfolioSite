import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing";
import Game from "./Components/Game";
import LevelEditor from "./Components/LevelEditor";

function App() {
	const getInitialState = () => {
		const savedState = localStorage.getItem("isLoggedIn");
		console.log(savedState);
		return savedState !== null ? JSON.parse(savedState) : false;
	};

	const [isLoggedIn, setIsLoggedIn] = useState(getInitialState());

	useEffect(() => {
		localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
	}, [isLoggedIn]);

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
