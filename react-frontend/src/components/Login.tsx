import React, { useState, FormEvent, useEffect } from "react";
import * as Styles from "../styles/styles"
import { Link } from "react-router-dom"
import { LoginProps } from "./interface";


function MockCaptcha({ onCompleted }: { onCompleted: () => void }) {
    const handleClick = () => {
        alert("Mock CAPTCHA completed");
        onCompleted();
    };

    return <button onClick={handleClick}>Complete CAPTCHA</button>;
}

const Login: React.FC<LoginProps> = (props) => {

    const [failedAttempts, setFailedAttempts] = useState<number>(0);

    const [email, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(failedAttempts);
        console.log(`logging in with username ${email} and password ${password}`);

        const loginUrl = "https://localhost:3001/api/users/login";
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
                    localStorage.setItem("isLoggedIn", "true")
                    props.setIsLoggedIn(true);
                    setFailedAttempts(0);
                    setUserName("");

                } else {
                    alert(data.message);
                    setFailedAttempts(failedAttempts + 1);
                    console.error("Login failed:", data.message);
                }
            })
            .catch(error => {
                console.error(error);
            })
        
        setPassword("");

        /*  Uncomment the below code to set logged in to true no matter what credentials are submitted
            usefull to test frontend functionality without having acces to the backend */


        localStorage.setItem("isLoggedIn", "true");
        props.setIsLoggedIn(true);

    };

    return (
        <Styles.Container>
            <Styles.FormContainer>
                <Styles.Form onSubmit={handleSubmit}>
                    <Styles.Input
                        placeholder="Email"
                        type="text"
                        id="userName"
                        value={email}
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
                    {failedAttempts >= 5 ? (
                        <MockCaptcha onCompleted={() => setFailedAttempts(0)} />
                    ) : (
                        <Styles.Button type="submit">Submit</Styles.Button>
                    )}
                    <Styles.Button as={Link} to="/register">Register</Styles.Button>
                </Styles.Form>
            </Styles.FormContainer>
        </Styles.Container>
    );
};
export default Login;