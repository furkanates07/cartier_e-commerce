import { defineStore } from "pinia";
import { IProduct } from "../interfaces/product.interface";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../main";
import { useAuthStore } from "./auth";
import { useCartierToast } from "@/composables/useToast";

export interface IFavoriteItem {
  product: IProduct;
}

export const useFavoriteStore = defineStore("favorites", {
  state: () => ({
    favoriteItems: [] as IProduct[],
  }),
  actions: {
    async addFavorite(product: IProduct) {
      const authStore = useAuthStore();
      const toast = useCartierToast();

      if (!authStore.ensureAuthenticated()) return;

      const isFavorite = this.favoriteItems.find(
        (favoriteProduct) => favoriteProduct.id === product.id
      );

      if (!isFavorite) {
        this.favoriteItems.push(product);
        toast.showSuccessMessage("Added to your favorites!");
        await this.saveFavoritesToFirebase();
      }
    },
    async removeFavorite(id: number) {
      const authStore = useAuthStore();
      const toast = useCartierToast();

      if (!authStore.ensureAuthenticated()) return;

      const favoriteIndex = this.favoriteItems.findIndex(
        (favoriteProduct) => favoriteProduct.id === id
      );

      if (favoriteIndex !== -1) {
        this.favoriteItems.splice(favoriteIndex, 1);
        toast.showSuccessMessage("Removed from your favorites!");
        await this.saveFavoritesToFirebase();
      }
    },
    async saveFavoritesToFirebase() {
      const auth = getAuth();
      const user = auth.currentUser;
      const toast = useCartierToast();

      if (user) {
        const favoriteItems = this.favoriteItems.map((item) => ({
          id: item.id || null,
          brand: item.brand || null,
          category: item.category || null,
          title: item.title || null,
          description: item.description || null,
          images: item.images.length > 0 ? item.images : null,
          price: item.price || null,
          discountPercentage: item.discountPercentage || null,
          rating: item.rating || null,
          stock: item.stock || null,
        }));

        try {
          await setDoc(
            doc(db, "favorites", user.uid),
            { items: favoriteItems },
            { merge: true }
          );
        } catch (error) {
          console.error("Error saving favorites to Firebase: ", error);
          toast.showErrorMessage("Error saving favorites to Firebase!");
        }
      } else {
        toast.showErrorMessage("No authenticated user found!");
      }
    },
  },
  getters: {
    favoriteItemsCount(): number {
      return this.favoriteItems.length;
    },
    isFavorite:
      (state) =>
      (id: number): boolean => {
        return state.favoriteItems.some((product) => product.id === id);
      },
  },
});
