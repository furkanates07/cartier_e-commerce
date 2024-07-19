<template>
  <div
    class="sticky top-20 text-center border bg-gray-100 rounded-sm flex flex-col gap-2 p-3 h-min"
  >
    <h1 class="py-6 text-lg font-bold leading-none">Order Summary</h1>
    <div class="flex flex-col p-5 justify-between bg-white">
      <div
        class="flex flex-row justify-between text-sm text-gray-900 font-light"
      >
        <span>Subtotal</span>
        <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <div
        class="flex flex-row justify-between text-sm text-red-500 font-light"
      >
        <span>Discount</span>
        <span class="text-red-500"
          >-${{ cartStore.discountPrice.toFixed(2) }}</span
        >
      </div>
      <div class="flex flex-row justify-between text-sm font-light">
        <span>Order Delivery</span>
        <span class="text-green-500">Free</span>
      </div>
      <hr class="my-3" />
      <div class="flex flex-row justify-between text-sm font-bold">
        <span>Total</span>
        <span>
          ${{ (cartStore.totalPrice - cartStore.discountPrice).toFixed(2) }}
        </span>
      </div>
    </div>
    <div class="flex gap-2 border bg-white p-3">
      <span class="material-symbols-outlined text-black"> local_activity </span>
      <input
        class="border-none outline-none flex-grow bg-transparent placeholder:text-neutral-400 placeholder:text-sm placeholder:font-thin"
        placeholder="Enter your coupon here"
        v-model="coupon"
        @input="handleCoupon"
      />
    </div>
    <button
      @click="$emit('ordered')"
      class="bg-blue-400 text-white font-bold p-3 rounded-sm"
    >
      ORDER
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { ref } from "vue";

const cartStore = useCartStore();

const coupon = ref("");

const handleCoupon = () => {
  // Coupon input only allows, A-Z, 0-9, and -
  coupon.value = coupon.value.replace(/[^A-Z0-9-]/g, "");
};
</script>

<style scoped></style>
