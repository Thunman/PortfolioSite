import React, { useState } from "react";
import * as Styles from "../styles/styles";





const Register: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [tooltip, setTooltip] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setTooltip("Passwords must match");
            console.log("mismatch");
        } else {
            const registerUrl = "https://192.168.50.225:3000/api/users/register"
            const registerPayload = {
                email: email,
                userName: userName,
                password: password
            };
            fetch(registerUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerPayload)
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        alert(data.message);
                    } else {
                        alert("no response from server");
                    }
                })
                .catch(error => {
                    alert(error);
                })

            setEmail("");
            setUserName("");
            setPassword("");
        };
    };

    return (
        <Styles.container>
            <Styles.formContainer>
                <Styles.form onSubmit={handleSubmit}>
                    <Styles.input
                        placeholder="Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Styles.input
                        placeholder="Username"
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e => setUserName(e.target.value))}
                        required
                    />
                    <Styles.input
                        placeholder="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Styles.TooltipContainer>
                        <div>
                            <Styles.input
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
                    <Styles.button type="submit">Submit</Styles.button>
                </Styles.form>
            </Styles.formContainer>
        </Styles.container>
    );
};

export default Register;