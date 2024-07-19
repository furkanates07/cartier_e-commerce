<template>
  <BaseModal>
    <div
      class="w-96 p-6 flex flex-col gap-4 text-sm bg-white rounded-lg shadow-lg"
    >
      <div class="flex flex-row justify-between items-center">
        <h2 class="font-semibold text-lg">Edit payment method</h2>
        <span
          @click="closeModal"
          class="material-symbols-outlined hover:cursor-pointer"
          >close</span
        >
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="card-name" class="font-medium">Card holder*</label>
          <input
            id="card-name"
            type="text"
            class="border border-gray-300 rounded-sm p-2"
            placeholder="Jordan Carter"
            v-model="cardName"
            @input="validateCardName"
          />
        </div>
        <div class="flex flex-col">
          <label for="card-number" class="font-medium"
            >Credit/debit card number*</label
          >
          <input
            id="card-number"
            type="text"
            maxlength="19"
            class="border border-gray-300 rounded-sm p-2"
            placeholder="4224 4224 4224 4224"
            v-model="cardNumber"
            @input="formatCardNumber"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="expiry" class="font-medium">Expiry*</label>
            <input
              id="expiry"
              type="text"
              maxlength="5"
              class="border border-gray-300 rounded-sm p-2"
              placeholder="05/27"
              v-model="expiry"
              @input="formatExpiry"
            />
            <p v-if="expiryError" class="text-red-500 text-xs mt-1">
              {{ expiryError }}
            </p>
          </div>
          <div class="flex flex-col">
            <label for="cvv" class="font-medium">CVC*</label>
            <input
              id="cvv"
              type="text"
              maxlength="3"
              class="border border-gray-300 rounded-sm p-2"
              placeholder="737"
              v-model="cvv"
              @input="validateCVV"
            />
          </div>
        </div>
        <div class="flex flex-row justify-between items-center">
          <p class="text-gray-500 text-xs">*This field is mandatory</p>
          <div class="flex flex-row justify-end gap-4">
            <button
              @click="closeModal"
              class="border border-gray-300 p-2 rounded-sm"
            >
              Cancel
            </button>
            <button
              class="bg-blue-400 text-white p-2 rounded-sm flex items-center gap-2"
            >
              <span class="material-symbols-outlined">check_circle</span>Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";

const cardName = ref("");
const cardNumber = ref("");
const expiry = ref("");
const cvv = ref("");
const expiryError = ref("");

const emits = defineEmits(["close"]);
const closeModal = () => {
  emits("close");
};

const validateCardName = () => {
  cardName.value = cardName.value.replace(/[^a-zA-Z\s]/g, "");
};

const formatCardNumber = () => {
  cardNumber.value = cardNumber.value
    .replace(/\D/g, "")
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
};

const formatExpiry = () => {
  expiry.value = expiry.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(?=\d)/g, "$1/")
    .trim();
  validateExpiry();
};

const validateCVV = () => {
  cvv.value = cvv.value.replace(/\D/g, "").trim();
};

const validateExpiry = () => {
  const [month, year] = expiry.value.split("/").map(Number);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    expiryError.value = "This card is expired";
  } else {
    expiryError.value = "";
  }
};
</script>

<style scoped>
.material-symbols-outlined {
  font-size: 24px;
}
.text-red-500 {
  color: #f56565;
}
</style>
