import {
	getDoc,
	doc,
	collection,
	getDocs,
	QueryDocumentSnapshot,
	DocumentData,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { aboutTextProps } from "../Interfaces/Interfaces";

export const getBasicInfo = async (uid: string) => {
	try {
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
					showEmail: docSnap.data()?.showEmail,
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
export const getAboutInfo = async (uid: string) => {
	try {
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

export const getAllUsers = async () => {
	try {
		const usersFromDB = await getDocs(collection(db, "Users"));
		const users = usersFromDB.docs.map((doc) => ({
			uid: doc.id,
			...doc.data(),
		}));
		return users;
	} catch (error) {
		alert(error);
		return [];
	}
};

export const getAllMsgs = async () => {
	const uid = auth.currentUser?.uid;
	if (uid) {
		const userMessagesCollection = collection(db, "Users", uid, "messages");
		const snapshot = await getDocs(userMessagesCollection);
		const messages: QueryDocumentSnapshot<DocumentData>[] = [];
		snapshot.forEach((doc) => messages.push(doc))
		return messages
			
	} else {
		return [];
	}
};
export const getNameFromUid = async (uid: string) => {
	const docSnap = await getDoc(doc(db, "Users", uid));
	const data = docSnap.data();
	if(!data) return;
	const userName = data.userName;
	return userName;
	
};
