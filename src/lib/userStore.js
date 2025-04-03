import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) {
      console.log("No UID provided");
      return set({ currentUser: null, isLoading: false });
    }
  
    console.log("Fetching user info for UID:", uid);
  
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.log("No such document!");
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log("Error fetching user data:", err);
      return set({ currentUser: null, isLoading: false });
    }
  },
  
}));
