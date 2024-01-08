import React, { useState, FormEvent } from "react";
import * as Styles from "../styles/styles"


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


        <Styles.StyledContainer>
            <Styles.StyledFormContainer>
                <Styles.StyledForm onSubmit={handleSubmit}>
                    <Styles.StyledInput
                        className="bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Email"
                        type="text"
                        id="userName"
                        value={email}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                    <Styles.StyledInput
                        className="bg-gray-100 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Styles.StyledButton type="submit">Submit</Styles.StyledButton>
                </Styles.StyledForm>
            </Styles.StyledFormContainer>
            <div className="absolute top-0 left-0 w-full h-10 shadow-md bg-gray-700" />
        </Styles.StyledContainer>







        /*
        <>
            <Styles.GlobalStyle />
            <Styles.Container>
                <Styles.Form onSubmit={handleSubmit}>
                    <Styles.FormGroup>
                        <Styles.Label htmlFor="userName">Email </Styles.Label>
                        <Styles.Input
                            type="text"
                            id="userName"
                            value={email}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </Styles.FormGroup>
                    <Styles.FormGroup>
                        <Styles.Label htmlFor="password">Password </Styles.Label>
                        <Styles.Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Styles.FormGroup>
                    <Styles.Button type="submit">Submit</Styles.Button>
                </Styles.Form>
            </Styles.Container>
        </>
        */
    );


};
export default Login;