import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { aboutTextProps } from "../Interfaces/Interfaces";

export const getBasicInfo = async () => {
	try {
		const uid = auth.currentUser?.uid;
		if (uid) {
			const docSnap = await getDoc(doc(db, "Users", uid));
			if (docSnap.exists()) {
				const data: BasicInfoProps = {
					name: docSnap.data()?.name,
					email: docSnap.data()?.email,
					userName: docSnap.data()?.userName,
					location: docSnap.data()?.location,
					age: docSnap.data()?.age,
					profilePicUrl: docSnap.data()?.profilePicUrl,
				};
				return data;
			}
		} else {
			console.error("User not found");
			return {
				name: "",
				email: "",
				userName: "",
				location: "",
				age: "",
				profilePicUrl: "",
			};
		}
	} catch (error) {
		alert("Error getting user info");
	}
};
export const getAboutInfo = async () => {
	try {
		const uid = auth.currentUser?.uid;
		if (uid) {
			const docSnap = await getDoc(doc(db, "Users", uid, "about", "info"));
			if (docSnap.exists()) {
				const data = {
					aboutTextHeader: docSnap.data()?.aboutTextHeader,
					aboutText: docSnap.data()?.aboutText,
				};
				return data as aboutTextProps;
			}
		} else {
			console.error("User not found");
			return { aboutTextHeader: "", aboutText: "" } as aboutTextProps;
		}
	} catch (error) {
		alert("Error getting user info");
	}
};

export const getAboutAuthor = async () => {
	try {
		const docSnap = await getDoc(doc(db, "AboutMe", "info"));
		if (docSnap.exists()) {
			const data = {
				aboutTextHeader: docSnap.data()?.aboutTextHeader,
				aboutText: docSnap.data()?.aboutText,
			};
			return data as aboutTextProps;
		}
	} catch (error) {
		alert("Error getting user info");
	}
};
export const getIsAdmin = async () => {
	try {
		const uid = auth.currentUser?.uid;
		if (uid) {
			const docSnap = await getDoc(doc(db, "Admins", uid));
			if (docSnap.exists()) {
				return true;
			} else {
				return false;
			}
		}
	} catch (error) {
		alert("Error getting user info");
	}
	return false;
};
