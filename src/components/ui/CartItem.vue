<template>
  <div
    class="grid grid-cols-3 gap-6 items-center border border-gray-400 p-2 rounded-sm"
  >
    <div class="w-full h-24">
      <img :src="product.images[0]" class="object-cover w-full h-full" />
    </div>
    <div class="flex flex-col gap-1 col-span-2">
      <div class="flex flex-row justify-between text-sm font-semibold">
        <h2>{{ product.title }}</h2>
        <button @click="cartStore.removeItem(product.id)">
          <span class="material-symbols-outlined"> delete </span>
        </button>
      </div>
      <p class="text-xs font-light">
        {{ product.description }}
      </p>
      <div class="flex flex-row justify-between">
        <h3>${{ product.price }}</h3>
        <p class="font-light">(x{{ quantity }})</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICartItem, useCartStore } from "../../stores/cart";

defineProps<ICartItem>();

const cartStore = useCartStore();
</script>

<style scoped></style>
