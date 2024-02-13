import React, { useState } from "react";
import * as Styles from "../Styles/Styles";
import { Link } from "react-router-dom";
import { LoginProps } from "../Interfaces/Interfaces";
import { login } from "../Services/auth";
import { useNavigate } from "react-router-dom";

function MockCaptcha({ onCompleted }: { onCompleted: () => void }) {
	const handleClick = () => {
		alert("Mock CAPTCHA completed");
		onCompleted();
	};
	return <button onClick={handleClick}>Complete CAPTCHA</button>;
}

const Login: React.FC<LoginProps> = (props) => {
	const [failedAttempts, setFailedAttempts] = useState<number>(0);
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login(email, password).then((res) => {
			if (res?.success) {
				props.setIsLoggedIn(true);
				navigate("/");
			} else {
				setFailedAttempts(failedAttempts + 1);
				alert(res?.message);
			}
		});
	};

	return (
		<Styles.Container>
			<Styles.FormContainer>
				<Styles.Form onSubmit={handleSubmit}>
					<Styles.Input
						placeholder="Email"
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Styles.Input
						placeholder="Password"
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					{failedAttempts >= 5 ? (
						<MockCaptcha onCompleted={() => setFailedAttempts(0)} />
					) : (
						<Styles.Button type="submit">Login</Styles.Button>
					)}
					<Styles.Button as={Link} to="/register">
						Register 
					</Styles.Button>
					<Styles.Button as={Link} to="/passwordReset">
						Forgot Password
					</Styles.Button>
					<Styles.Button
						onClick={() => {
							props.setIsLoggedIn(true);
						}}
					>
						Continue as guest
					</Styles.Button>
				</Styles.Form>
				
			</Styles.FormContainer>
		</Styles.Container>
	);
};
export default Login;
