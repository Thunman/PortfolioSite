import { doc, setDoc, updateDoc } from "firebase/firestore";
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
            return true;
        } catch (error) {
            console.error("Error updating document:", error);
            return false;
        }
    } else {
        console.error("User not found");
    }
}

export const saveAboutHeaderText = async (text: string) => {
    if (auth.currentUser) {
        const docRef = doc(db, "Users", auth.currentUser.uid, "about", "info");
    try {
        await updateDoc(docRef, { aboutTextHeader: text });
        return true;
    } catch (error) {
        alert(error)
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
        await updateDoc(docRef, { aboutText: text });
        return true;
    } catch (error) {
        alert(error)
        return false;
    }
    } else {
        console.error("User not found");
    }
}

export const adminSave = (header: string, text: string) => {
    const docRef = doc(db, "AboutMe", "info");
    try {
        setDoc(docRef, {
            aboutTextHeader: header,
            aboutText: text,
        });
    } catch (error) {
        alert(error)
    }
};