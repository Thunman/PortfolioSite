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
export const saveAll = async (info: BasicInfoProps, aboutHeader: string, aboutText: string) => {
    saveBasicInfo(info);
    saveAboutHeaderText(aboutHeader);
    saveAboutText(aboutText);
};
export const saveBasicInfo = async (info: BasicInfoProps) => {
    if (auth.currentUser) {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        try {
            await setDoc(docRef, {
                name: info.name,
                email: info.email,
                userName: info.userName,
                location: info.location,
                age: info.age,
            }, { merge: true });
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
        await setDoc(docRef, { aboutTextHeader: text }, { merge: true });
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
        await setDoc(docRef, { aboutText: text }, { merge: true });
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
        }, { merge: true });
    } catch (error) {
        alert(error)
    }
};