import { defineStore } from "pinia";
import { IProduct } from "../interfaces/product.interface";
import { useCartierToast } from "@/composables/useToast";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuthStore } from "./auth";
import { db } from "../main";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

const toast = useCartierToast();

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as ICartItem[],
  }),
  actions: {
    async addItem(item: ICartItem) {
      const authStore = useAuthStore();
      const toast = useCartierToast();

      if (!authStore.ensureAuthenticated()) return;
      const itemInCart = this.items.find(
        (cartItem) => cartItem.product.id === item.product.id
      );
      if (
        itemInCart &&
        item.product.stock >= itemInCart.quantity + item.quantity
      ) {
        itemInCart.quantity += item.quantity;
        toast.showSuccessMessage("Added to your cart!");
      } else if (!itemInCart && item.product.stock >= item.quantity) {
        this.items.push(item);
        toast.showSuccessMessage("Added to your cart!");
      } else {
        console.error("Out of stock!");
      }
      await this.saveCartToFirebase();
    },
    async updateQuantity(id: number, quantity: number) {
      const itemIndex = this.items.findIndex(
        (cartItem) => cartItem.product.id === id
      );

      if (itemIndex !== -1) {
        this.items[itemIndex].quantity = quantity;
        await this.saveCartToFirebase();
      }
    },
    async removeItem(id: number) {
      const itemIndex = this.items.findIndex(
        (cartItem) => cartItem.product.id === id
      );

      if (itemIndex !== -1) {
        this.items.splice(itemIndex, 1);
        toast.showSuccessMessage("Removed from your cart!");
        await this.saveCartToFirebase();
      }
    },
    async saveCartToFirebase() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const cartItems = this.items.map((item) => ({
          product: {
            id: item.product.id || null,
            brand: item.product.brand || null,
            category: item.product.category || null,
            title: item.product.title || null,
            description: item.product.description || null,
            images: item.product.images.length > 0 ? item.product.images : null,
            price: item.product.price || null,
            discountPercentage: item.product.discountPercentage || null,
            rating: item.product.rating || null,
            stock: item.product.stock || null,
          },
          quantity: item.quantity,
        }));

        try {
          await setDoc(
            doc(db, "carts", user.uid),
            { items: cartItems },
            { merge: true }
          );
        } catch (error) {
          console.error("Error saving cart to Firebase: ", error);
        }
      } else {
        toast.showErrorMessage("No authenticated user found!");
      }
    },
  },
  getters: {
    totalItems(): number {
      return this.items.length;
    },
    totalPrice(): number {
      return this.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
    },
    discountPrice(): number {
      const discount = this.items.reduce((acc, item) => {
        return (
          acc +
          (item.product.discountPercentage *
            item.quantity *
            item.product.price) /
            100
        );
      }, 0);

      return parseFloat(discount.toFixed(2));
    },
  },
});
