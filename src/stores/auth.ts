import { defineStore } from "pinia";
import { useCartierToast } from "@/composables/useToast";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { EStorageKeys } from "../common/enums/storageKeys.enum";
import { ICard, useUserStore } from "./user";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../main";
import { useCartStore } from "./cart";
import { useFavoriteStore } from "./favorites";

interface UserProfile {
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  savedCards: ICard[];
}

interface IState {
  isAuth: boolean;
  loading: boolean;
  accessToken: string;
}

const toast = useCartierToast();

export const useAuthStore = defineStore("auth", {
  state: (): IState => ({
    isAuth: false,
    loading: false,
    accessToken: "",
  }),
  actions: {
    init() {
      const accessToken = localStorage.getItem(EStorageKeys.TOKEN);
      if (accessToken) {
        this.accessToken = accessToken;
        this.isAuth = true;
      }
    },
    async loginWithGoogle() {
      this.loading = true;
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userStore = useUserStore();
      const cartStore = useCartStore();
      const favoriteStore = useFavoriteStore();

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;

        if (accessToken) {
          this.accessToken = accessToken;
          localStorage.setItem(EStorageKeys.TOKEN, accessToken);
          this.isAuth = true;

          const userProfile: UserProfile = {
            name: user.displayName?.split(" ")[0] || "",
            surname: user.displayName?.split(" ")[1] || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
            address: "",
            savedCards: [],
          };

          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            try {
              await setDoc(userDocRef, userProfile, {
                merge: true,
              });
              userStore.setUserProfile(userProfile);
              toast.showSuccessMessage("Login successful!");
            } catch (firestoreError) {
              console.error("Error adding document: ", firestoreError);
              toast.showErrorMessage("Error adding document!");
            }
          } else {
            const existingUserProfile = userDoc.data() as UserProfile;
            userStore.setUserProfile(existingUserProfile);
            toast.showSuccessMessage("Login successful!");
          }

          const cartDocRef = doc(db, "carts", user.uid);
          const cartDoc = await getDoc(cartDocRef);

          if (cartDoc.exists()) {
            const cartData = cartDoc.data();
            if (cartData && cartData.items) {
              cartStore.items = cartData.items;
            }
          }

          const favoriteDocRef = doc(db, "favorites", user.uid);
          const favoriteDoc = await getDoc(favoriteDocRef);

          if (favoriteDoc.exists()) {
            const favoriteData = favoriteDoc.data();
            if (favoriteData && favoriteData.items) {
              favoriteStore.favoriteItems = favoriteData.items;
            }
          }
        } else {
          toast.showErrorMessage("No access token found!");
        }
      } catch (error) {
        console.error("Google login failed", error);
        toast.showErrorMessage("Login failed!");
      } finally {
        this.loading = false;
      }
    },
    async handleLogin() {
      await this.loginWithGoogle();
    },
    handleLogout() {
      const cartStore = useCartStore();
      const favoriteStore = useFavoriteStore();

      this.accessToken = "";
      this.isAuth = false;
      localStorage.removeItem(EStorageKeys.TOKEN);

      cartStore.$reset();
      favoriteStore.$reset();

      toast.showSuccessMessage("Logout successful!");
    },
    ensureAuthenticated() {
      if (!this.isAuth) {
        toast.showErrorMessage("Please login first!");
        return false;
      }
      return true;
    },
  },
});

export default useAuthStore;
