import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { BasicInfoProps } from "../Interfaces/Interfaces";


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

export const saveBasicInfo = async (info: BasicInfoProps) => {
    if (auth.currentUser) {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        try {
            await updateDoc(docRef, {
                name: info.name,
                email: info.email,
                userName: info.userName,
                location: info.location,
                age: info.age,
            });
        } catch (error) {
            console.error("Error updating document:", error);
        }
    } else {
        console.error("User not found");
    }
}

export const setAboutText = async (text: string) => {
    if (auth.currentUser) {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        try {
            await updateDoc(docRef, { aboutText: text });
        } catch (error) {
            console.error("Error updating document:", error);
        }
    } else {
        console.error("User not found");
    }
};