import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const login = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		if (user) {
			return { success: true, message: "Login successful" };
		}
	} catch (error) {
		console.error("Error signing in:", error);
		if (error instanceof Error) {
			return { success: false, message: "Invalid Email or Password" };
		}
	}
};

export const logout = async () => {
	try {
		await auth.signOut();
		return true;
	} catch (error) {
		console.error("Error signing out");
		return false;
	}
};
export const register = async (
	email: string,
	userName: string,
	password: string
) => {
	try {
		const userExists = await getDoc(doc(db, "Users", email));
		if (userExists.exists()) {
			return { success: false, message: "User already exists" };
		} else {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			if (user) {
				await setDoc(doc(db, "Users", user.uid), {
					email: email,
					userName: userName,
				});
				return { success: true, message: "Registration successful" };
			} else {
				return { success: false, message: "Registration failed" };
			}
		}
	} catch (error) {
		console.error("Error signing in:", error);
		if (error instanceof Error) {
			return { success: false, message: "Something wrong with Database" };
		}
	}
};
