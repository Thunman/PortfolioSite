import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import * as Styles from "../styles/styles"
import { response } from "express";
import { error } from "console";

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

    );


};
export default Login;