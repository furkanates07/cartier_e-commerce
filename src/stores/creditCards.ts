import { defineStore } from "pinia";
import { useCartierToast } from "@/composables/useToast";

const toast = useCartierToast();

export const useCreditCardsStore = defineStore("creditcards", {
  state: () => ({
    cards: [] as { cardNumber: string; expiryDate: string; cvv: string }[],
  }),
  actions: {
    addCard(newCard: { cardNumber: string; expiryDate: string; cvv: string }) {
      this.cards.push(newCard);
      toast.showSuccessMessage("Card added successfully");
    },
    deleteCard(index: number) {
      this.cards.splice(index, 1);
      toast.showSuccessMessage("Card deleted successfully");
    },
  },
});
