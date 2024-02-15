import React, { useState } from "react";
import * as Styles from "../Styles/Styles";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Services/auth";
import { LoginProps } from "../Interfaces/Interfaces";

const Register: React.FC<LoginProps> = (props) => {
	const [email, setEmail] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [tooltip, setTooltip] = useState<string>("");
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setTooltip("Passwords must match");
			console.log("missmatch");
		} else {
			register(email, userName, password).then((res) => {
				if (res?.success) {
					alert(res.message);
					setEmail("");
					setUserName("");
					setPassword("");
					setConfirmPassword("");
					props.setIsLoggedIn(true);
					navigate("/");
				} else {
					alert(res?.message);
				}
			});
		}
	};

	return (
		<Styles.Container>
			<Styles.FormContainer>
				<Styles.Form onSubmit={handleSubmit}>
					<Styles.Input
						placeholder="Email"
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Styles.Input
						placeholder="Username"
						type="text"
						id="userName"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
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
					<Styles.TooltipContainer>
						<div>
							<Styles.Input
								placeholder="Confirm Password"
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									if (password !== e.target.value) {
										setTooltip("Passwords must match");
									} else {
										setTooltip("");
									}
								}}
								required
							/>
						</div>
						<div>
							{tooltip && <Styles.Tooltip>{tooltip}</Styles.Tooltip>}
						</div>
					</Styles.TooltipContainer>
					<Styles.Button type="submit">Submit</Styles.Button>
				</Styles.Form>
			</Styles.FormContainer>
		</Styles.Container>
	);
};
export default Register;
