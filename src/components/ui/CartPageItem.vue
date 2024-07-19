<template>
  <div class="flex flex-row gap-4 border border-gray-200 rounded-sm p-2">
    <div class="w-[128px] h-[128px] overflow-hidden rounded-sm">
      <img class="object-cover w-full h-full" :src="product.images[0]" />
    </div>
    <div class="w-full grid grid-cols-2 mt-3">
      <div class="flex flex-col">
        <router-link :to="`/product/${product.id}`"
          ><h2 class="text-sm font-bold underline">
            {{ product.title }}
          </h2>
        </router-link>
        <span class="text-xs text-gray-400 mt-2">{{ product.brand }}</span>
        <span class="text-xs text-gray-400"
          >Category: {{ product.category }}</span
        >
        <div
          v-if="product.stock < 10"
          class="bg-blue-100 rounded-sm text-xs text-blue-400 my-2 flex flex-row items-center"
        >
          <span class="material-symbols-outlined"> warning </span>
          <span>Low Inventory! Order Soon.</span>
        </div>
      </div>
      <div class="flex flex-col items-end mr-3">
        <h2 class="text-sm">${{ product.price }}</h2>
        <select
          class="border border-gray-200 rounded-sm mt-2"
          @change="handleQuantity(product.id, $event)"
        >
          <option v-for="i in 10" :key="i" :value="i">
            {{ i }}
          </option>
        </select>
        <div class="flex flex-row gap-3 mt-5 text-xs font-semibold">
          <span
            v-if="!favoriteStore.isFavorite(product.id)"
            @click="favoriteStore.addFavorite(product)"
            class="underline hover:text-gray-400 cursor-pointer"
            >Add favorites</span
          >
          <span
            @click="cartStore.removeItem(product.id)"
            class="underline hover:text-gray-400 cursor-pointer"
            >Remove</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICartItem, useCartStore } from "../../stores/cart";
import { useFavoriteStore } from "@/stores/favorites";

defineProps<ICartItem>();

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();

const handleQuantity = (productId: number, event: Event) => {
  // We use HTMLSelectElement type to specify the type of the target
  // Let's specify that event.target is of type HTMLSelectElement so that
  // we can access the value property
  const target = event.target as HTMLSelectElement;
  // We get the selected quantity and parse it to a number
  const quantity = parseInt(target.value);
  // We update the quantity of the product in the cart
  cartStore.updateQuantity(productId, quantity);
};
</script>
