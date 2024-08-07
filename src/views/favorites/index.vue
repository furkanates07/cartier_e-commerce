<template>
  <div class="px-4">
    <div
      v-if="favoriteStore.favoriteItemsCount === 0"
      class="text-center font-semibold mt-10"
    >
      <h1>You don't have any favorite items yet!</h1>
      <StartShoppingButton />
    </div>
    <div v-else class="font-bold gap-2">
      <div class="flex gap-3 items-center leading-none mb-2">
        <h1 class="text-lg font-bold">Favorites</h1>
        <span class="text-sm text-gray-400">
          ({{ favoriteStore.favoriteItemsCount }})</span
        >
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
        <ProductCard
          v-for="favoriteItem in favoriteStore.favoriteItems"
          :key="favoriteItem.title"
          v-bind="favoriteItem"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from "@/components/ui/ProductCard.vue";
import StartShoppingButton from "@/components/ui/StartShoppingButton.vue";
import { useFavoriteStore } from "../../stores/favorites";

const favoriteStore = useFavoriteStore();
</script>

<style scoped></style>
