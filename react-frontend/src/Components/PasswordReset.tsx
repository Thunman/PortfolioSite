import { auth, db } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import {
	Button,
	Container,
	Form,
	FormContainer,
	Input,
} from "../Styles/Styles";
import { resetPassword } from "../Services/auth";

const PasswordReset = () => {
	const [email, setEmail] = useState<string>("");
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
        resetPassword(email).then((res) => {
            if (res?.success) {
                alert(res?.message);
            } else {
                alert(res?.message);
            }
        });
	};

	return (
		<Container>
			<FormContainer>
				<Form onSubmit={handleSubmit}>
					<Input
						placeholder="Email"
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Button type="submit">Reset Password</Button>
				</Form>
			</FormContainer>
		</Container>
	);
};

export default PasswordReset;
