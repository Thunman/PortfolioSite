import React, { useState } from "react";
import * as Styles from "../styles/styles";
import { LoginProps } from "./interface";
import { useSpring, animated, useTrail } from "react-spring";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sparkle = animated(styled.div`
position: absolute;
width: 10px;
height: 10px;
background-color: #fff;
border-radius: 50%;
`);


const Landing: React.FC<LoginProps> = (props) => {

    const handleSubmit = (e: React.FormEvent) => {
        props.setIsLoggedIn(false)
        console.log("Bye!")
    }
    const fade = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    });



    return (
        <Styles.Container>
            <Styles.FormContainer >
                <animated.div style={fade}>Hello World!</animated.div><br />
                <Styles.Button as={Link} to="/game">Game</Styles.Button>
                <Styles.Button type="submit" onClick={handleSubmit}>Log Out</Styles.Button>
            </Styles.FormContainer>
        </Styles.Container>
    )
}
export default Landing
