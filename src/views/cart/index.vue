<template>
  <div
    v-if="cartStore.totalItems === 0"
    class="font-semibold text-center mt-10"
  >
    <h1>Your cart is empty!</h1>
    <StartShoppingButton />
  </div>
  <div v-else class="sm:grid sm:grid-cols-3 gap-12 flex flex-col mb-10">
    <div class="col-span-2 flex flex-col gap-2">
      <div class="flex gap-3 items-center leading-none">
        <h1 class="text-lg font-bold">Cart</h1>
        <span class="text-sm text-gray-400"> ({{ cartStore.totalItems }})</span>
      </div>
      <CartPageItem
        v-for="item in cartStore.items"
        v-bind="item"
        :key="item.product.id"
      />
    </div>
    <OrderSummary @ordered="isPaymentModalOpen = true" />
    <PaymentModal
      :open="isPaymentModalOpen"
      @close="isPaymentModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import CartPageItem from "@/components/ui/CartPageItem.vue";
import OrderSummary from "@/components/ui/OrderSummary.vue";
import StartShoppingButton from "@/components/ui/StartShoppingButton.vue";
import PaymentModal from "@/components/ui/PaymentModal.vue";
import { ref } from "vue";

const cartStore = useCartStore();

const isPaymentModalOpen = ref(false);
</script>
