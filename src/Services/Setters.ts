import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { BasicInfoProps } from "../Interfaces/Interfaces";
import { getNameFromUid } from "./Getters";

export const setProfilePicUrl = async (url: string) => {
	if (auth.currentUser) {
		const docRef = doc(db, "Users", auth.currentUser.uid);
		try {
			await updateDoc(docRef, {
				profilePicUrl: url,
			});
		} catch (error) {
			console.error("Error updating document:", error);
		}
	} else {
		console.error("User not found");
	}
};
export const saveAll = async (
	info: BasicInfoProps,
	aboutHeader: string,
	aboutText: string
) => {
	saveBasicInfo(info);
	saveAboutHeaderText(aboutHeader);
	saveAboutText(aboutText);
};
export const saveBasicInfo = async (info: BasicInfoProps) => {
	if (auth.currentUser) {
		const docRef = doc(db, "Users", auth.currentUser.uid);
		try {
			await setDoc(
				docRef,
				{
					name: info.name,
					email: info.email,
					userName: info.userName,
					location: info.location,
					age: info.age,
					showEmail: info.showEmail,
				},
				{ merge: true }
			);
			return true;
		} catch (error) {
			console.error("Error updating document:", error);
			return false;
		}
	} else {
		console.error("User not found");
	}
};

export const saveAboutHeaderText = async (text: string) => {
	if (auth.currentUser) {
		const docRef = doc(db, "Users", auth.currentUser.uid, "about", "info");
		try {
			await setDoc(docRef, { aboutTextHeader: text }, { merge: true });
			return true;
		} catch (error) {
			alert(error);
			return false;
		}
	} else {
		console.error("User not found");
	}
};

export const saveAboutText = async (text: string) => {
	if (auth.currentUser) {
		const docRef = doc(db, "Users", auth.currentUser.uid, "about", "info");
		try {
			await setDoc(docRef, { aboutText: text }, { merge: true });
			return true;
		} catch (error) {
			alert(error);
			return false;
		}
	} else {
		console.error("User not found");
	}
};

export const adminSave = (header: string, text: string) => {
	const docRef = doc(db, "AboutMe", "info");
	try {
		setDoc(
			docRef,
			{
				aboutTextHeader: header,
				aboutText: text,
			},
			{ merge: true }
		);
	} catch (error) {
		alert(error);
	}
};

export const sendMsg = async (
	reciverId: string,
	senderId: string,
	msg: string
) => {
	const senderName = await getNameFromUid(senderId);
	const reciverName = await getNameFromUid(reciverId);
	const reciverMessagesCollection = collection(
		db,
		"Users",
		reciverId,
		"messages"
	);
	const reciverMessageDoc = doc(reciverMessagesCollection, senderName);
	const senderMessageCollection = collection(
		db,
		"Users",
		senderId,
		"messages"
	);
	const senderMessageDoc = doc(senderMessageCollection, reciverName);
	try {
		await setDoc(
			reciverMessageDoc,
			{
				unread: true,
				senderId,
				messages: arrayUnion({
					msg,
					timestamp: new Date(),
					name: senderName,
					
				}),
			},
			{ merge: true }
		);
		await setDoc(
			senderMessageDoc,
			{
				reciverId,
				messages: arrayUnion({
					msg,
					timestamp: new Date(),
					name: senderName,
				}),
			},
			{ merge: true }
		);

		return { succes: true, message: "Message sent" };
	} catch (error) {
		return { succes: false, message: error };
	}
};

export const setReadTrue = async (uid: string, conversationName: string) => {
	const docRef = doc(db, "Users", uid, "messages", conversationName);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		await updateDoc(docRef, {
			unread: false,
		});
	} else {
		console.log("No such document!");
	}
};
