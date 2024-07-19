<template>
  <div
    class="absolute z-50 top-12 right-0 max-h-[400px] overflow-y-auto w-[380px] bg-white border border-black shadow-sm rounded-sm custom-scrollbar"
  >
    <div class="my-5 mx-3" v-if="cartStore.items.length === 0">
      <span>There is no items in your cart.</span>
    </div>
    <div v-else class="p-2 m-1 flex flex-col gap-2">
      <CartItem
        v-for="item in cartStore.items"
        :key="item.product.title"
        v-bind="item"
      />
      <hr />
      <p class="text-right font-bold my-2">
        Total: ${{ cartStore.totalPrice.toFixed(2) }}
      </p>
      <RouterLink to="/cart">
        <button
          class="p-2 bg-black duration-200 text-white font-medium shadow-sm rounded-sm block w-full text-center"
        >
          Go to Payment
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../../stores/cart";
import CartItem from "../ui/CartItem.vue";

const cartStore = useCartStore();
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
  border: 2px solid #fff;
}
</style>
