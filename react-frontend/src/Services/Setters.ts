import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";


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