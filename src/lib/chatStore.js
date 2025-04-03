import { create } from "zustand";
import { db } from "./firebase";
import { useUserStore } from "./userStore";
import { doc, getDoc } from "firebase/firestore";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: async (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // if (!currentUser) {
    //   console.error("Current user is not defined");
    //   return;
    // }

    // IF CURRENT USER IS BLOCKED
    if (user.blocked.includes(currentUser.id)) {
      set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
      return;
    }

    // IF RECEIVER IS BLOCKED
   else if (currentUser.blocked.includes(user.id)) {
      set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
      return;
    }

    // If neither is blocked, set the chatId and user
    set({
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  changeBlock: () => {
    set((state) => ({
      isReceiverBlocked: !state.isReceiverBlocked,
    }));
  },
}));
