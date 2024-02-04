import React, { useState } from "react";
import * as Styles from "../styles/styles";
import { Link } from "react-router-dom";
import { userSchema } from "../Schemas/yupSchemas";

const Register: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [tooltip, setTooltip] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setTooltip("Passwords must match");
			console.log("missmatch");
		} else {
			const registerUrl = "https://localhost:3001/api/users/register";
			const registerPayload = {
				email: email,
				userName: userName,
				password: password,
			};

			try {
				await userSchema.validate(registerPayload);

				fetch(registerUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(registerPayload),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data) {
							alert(data.message);
						} else {
							alert("No response from server");
						}
					});
			} catch (error) {
				alert(error);
			}
		}

		setEmail("");
		setUserName("");
		setPassword("");
		setConfirmPassword("");
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
					<Styles.Button as={Link} to="/">
						Login
					</Styles.Button>
				</Styles.Form>
			</Styles.FormContainer>
		</Styles.Container>
	);
};
export default Register;
