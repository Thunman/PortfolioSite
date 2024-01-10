import React, { useState, FormEvent } from "react";
import * as Styles from "../styles/styles"
import { Link } from "react-router-dom"


const Login: React.FC = () => {

    const [email, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(`logging in with username ${email} and password ${password}`);

        const loginUrl = "https://192.168.50.225:3000/api/users/login";
        const loginPayload = {
            email: email,
            password: password
        };
        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginPayload)
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                } else {
                    console.error("Login failed:", data.message);
                }
            })
            .catch(error => {
                console.error(error);
            })
        setUserName("");
        setPassword("");
    };

    return (
        <Styles.container>
            <Styles.formContainer>
                <Styles.form onSubmit={handleSubmit}>
                    <Styles.input
                        placeholder="Email"
                        type="text"
                        id="userName"
                        value={email}
                        onChange={(e) => setUserName(e.target.value)}
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
                    <Styles.button type="submit">Submit</Styles.button>
                    <Styles.button as={Link} to="/register">Register</Styles.button>
                </Styles.form>
            </Styles.formContainer>
        </Styles.container>
    );
};
export default Login;