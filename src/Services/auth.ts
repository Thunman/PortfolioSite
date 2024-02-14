import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
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
		return { success: false, message: "Invalid Email or Password" };
	}
};

export const logout = async () => {
	try {
		await auth.signOut();
		return { success: true, message: "Logout successful" };
	} catch (error) {
		return { success: false, message: "Logout failed" };
	}
};
export const register = async (
	email: string,
	userName: string,
	password: string
) => {
	try {
		const docSnap = await getDoc(doc(db, "Users", email));
		if (docSnap.exists()) {
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
		return { success: false, message: "Something wrong with Database" };
	}
};

export const resetPassword = async (email: string) => {
	try {
		const docSnap = await getDoc(doc(db, "Users", email));
		if (docSnap.exists()) {
			return sendPasswordResetEmail(auth, email)
				.then(() => {
					return { success: true, message: "Password reset email sent" };
				})
				.catch((error) => {
					return { success: false, message: "Something went wrong" };
				});
		} else {
			return { success: false, message: "User does not exist" };
		}
	} catch (error) {
		return { success: false, message: "User does not exist" };
	}
};
