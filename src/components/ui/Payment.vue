<template>
  <div class="col-span-3 bg-gray-100 p-3 h-[540px]">
    <div class="flex flex-row justify-between items-center">
      <h1 class="font-bold text-lg ml-3">Payment</h1>
    </div>
    <hr class="border-1 border-gray-400 mb-4" />
    <div class="flex justify-center space-x-4 mb-4">
      <button
        :class="activeTab === 'myCards' ? activeTabClass : inactiveTabClass"
        @click="activeTab = 'myCards'"
      >
        My Cards
      </button>
      <button
        :class="activeTab === 'addCard' ? activeTabClass : inactiveTabClass"
        @click="activeTab = 'addCard'"
      >
        Add Card
      </button>
    </div>
    <div v-if="activeTab === 'myCards'">
      <div
        v-if="cards.length > 0"
        class="max-w-md mx-auto p-6 bg-white shadow-sm rounded-sm space-y-4"
      >
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="p-4 border border-gray-200 rounded-sm bg-gray-50 shadow-sm"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-lg font-semibold">{{ card.cardNumber }}</p>
              <p class="text-sm text-gray-500">{{ card.expiryDate }}</p>
            </div>
            <button
              @click="deleteCard(index)"
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">No cards available</div>
    </div>
    <div v-if="activeTab === 'addCard'">
      <form
        @submit.prevent="addCard"
        class="max-w-md mx-auto mt-3 p-6 bg-white shadow-sm rounded-sm"
      >
        <div class="mb-4">
          <label
            for="cardNumber"
            class="block text-sm font-medium text-gray-700"
            >Card Number</label
          >
          <input
            id="cardNumber"
            v-model="newCard.cardNumber"
            type="text"
            placeholder="1234 5678 9101 1121"
            maxlength="19"
            class="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm p-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
            required
            @input="formatCardNumber"
          />
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="flex-1">
            <label
              for="expiryDate"
              class="block text-sm font-medium text-gray-700"
              >Expiry Date</label
            >
            <input
              id="expiryDate"
              v-model="newCard.expiryDate"
              type="text"
              placeholder="MM/YY"
              maxlength="5"
              class="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm p-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              required
              @input="formatExpiry"
            />
            <p v-if="expiryError" class="text-red-500 text-xs mt-1">
              {{ expiryError }}
            </p>
          </div>
          <div class="flex-1">
            <label for="cvv" class="block text-sm font-medium text-gray-700"
              >CVV</label
            >
            <input
              id="cvv"
              v-model="newCard.cvv"
              type="text"
              placeholder="123"
              maxlength="3"
              class="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm p-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              required
              @input="validateCVV"
            />
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-400 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Card
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartierToast } from "@/composables/useToast";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const newCard = ref({
  cardNumber: "",
  expiryDate: "",
  cvv: "",
});

const userStore = useUserStore();
const toast = useCartierToast();

const cards = userStore.userProfile.savedCards;

const addCard = async () => {
  if (validateCardNumber() && validateExpiry() && validateCVV()) {
    if (checkDuplicateCard()) {
      toast.showErrorMessage("This card is already saved");
      return;
    } else {
    }
    await userStore.addCard({ ...newCard.value });
    newCard.value.cardNumber = "";
    newCard.value.expiryDate = "";
    newCard.value.cvv = "";
  }
};

const deleteCard = async (index: number) => {
  await userStore.deleteCard(index);
};

const activeTab = ref("myCards");

const activeTabClass = "bg-blue-400 text-white py-2 px-4 rounded-sm";
const inactiveTabClass =
  "bg-gray-200 text-gray-700 py-2 px-4 rounded-sm hover:bg-gray-300";

const expiryError = ref("");

const formatCardNumber = () => {
  newCard.value.cardNumber = newCard.value.cardNumber
    .replace(/\D/g, "")
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
};

const formatExpiry = () => {
  newCard.value.expiryDate = newCard.value.expiryDate
    .replace(/\D/g, "")
    .replace(/(\d{2})(?=\d)/g, "$1/")
    .trim();
  validateExpiry();
};

const validateCVV = () => {
  newCard.value.cvv = newCard.value.cvv.replace(/\D/g, "").trim();
  return true;
};

const validateCardNumber = () => {
  const regex = /^(\d{4} ){3}\d{4}$/;
  return regex.test(newCard.value.cardNumber);
};

const validateExpiry = () => {
  const [month, year] = newCard.value.expiryDate.split("/").map(Number);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    expiryError.value = "This card is expired";
    return false;
  } else {
    expiryError.value = "";
    return true;
  }
};

const checkDuplicateCard = () => {
  return cards.some(
    (card) =>
      card.cardNumber.replace(/\s/g, "") ===
      newCard.value.cardNumber.replace(/\s/g, "")
  );
};
</script>

<style scoped>
.text-red-500 {
  color: #f56565;
}
</style>
