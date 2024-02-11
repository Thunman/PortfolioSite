import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const getBasicInfo = async () => {
	try {
		const uid = auth.currentUser?.uid;
		if (uid) {
			const docSnap = await getDoc(doc(db, "Users", uid));
			if (docSnap.exists()) {
				const data = {
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
            return {};
		}
	} catch (error) {
		alert("Error getting user info");
	}
};
