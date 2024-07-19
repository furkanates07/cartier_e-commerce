import { db } from "@/main";
import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useCartierToast } from "@/composables/useToast";

export interface ICard {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface UserProfile {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  savedCards: ICard[];
}

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userProfile: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      address: "",
      savedCards: [] as ICard[],
    } as UserProfile,
  }),
  getters: {
    fullName: (state) =>
      `${state.userProfile.name} ${state.userProfile.surname}`,
    getUserProfile: (state) => state.userProfile,
  },
  actions: {
    setUserProfile(userProfile: UserProfile) {
      this.userProfile = userProfile;
    },
    async addCard(card: ICard) {
      this.userProfile.savedCards.push(card);
      await this.saveUserChanges();
    },
    async deleteCard(index: number) {
      this.userProfile.savedCards.splice(index, 1);
      await this.saveUserChanges();
    },
    async saveUserChanges() {
      const toast = useCartierToast();
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          await setDoc(doc(db, "users", user.uid), this.userProfile, {
            merge: true,
          });
          toast.showSuccessMessage("Updated successfully!");
        } catch (error) {
          console.error("Error updating: ", error);
          toast.showErrorMessage("Error updating!");
        }
      } else {
        toast.showErrorMessage("No authenticated user found!");
      }
    },
  },
});
