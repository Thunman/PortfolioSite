import React from "react";
import * as Styles from "../styles/styles";
import { LoginProps } from "./interface";

const Landing: React.FC<LoginProps> = (props) => {

    const handleSubmit = (e: React.FormEvent) => {
        props.setIsLoggedIn(false)
        console.log("Bye!")
    }
    return(
        <Styles.Container>
            <Styles.FormContainer >
                Hello World!<br />
                <Styles.Button type="submit" onClick={handleSubmit}>Log Out</Styles.Button>
            </Styles.FormContainer>
        </Styles.Container>
    )
}
export default Landing
