<template>
  <router-link :to="`/product/${id}`">
    <div
      class="h-full flex flex-col border p-2 rounded-sm hover:shadow-lg cursor-pointer duration-200"
    >
      <div class="w-full h-32 relative">
        <img :src="images[0]" class="w-full h-full object-contain" />
        <span
          @click.prevent="
            favoriteStore.isFavorite($props.id)
              ? favoriteStore.removeFavorite($props.id)
              : favoriteStore.addFavorite($props)
          "
          class="material-symbols-outlined absolute top-0 left-0 shadow-md cursor-pointer select-none active:scale-90 rounded-full p-2 w-8 h-8 flex items-center justify-center text-lg"
          :class="{
            'bg-red-600 text-white': favoriteStore.isFavorite($props.id),
            'bg-white text-black ': !favoriteStore.isFavorite($props.id),
          }"
        >
          favorite
        </span>
      </div>
      <h3 class="text-lg font-semibold truncate my-1">
        {{ title }}
      </h3>
      <p class="text-xs font-thin truncate">
        {{ description }}
      </p>
      <h1 class="text-sm font-normal mb-2 text-left">${{ price }}</h1>
      <div class="flex justify-between mt-5">
        <BaseButton
          @click.prevent="shareProduct(id)"
          label="Share"
          :type="ButtonType.SHARE"
        />
        <BaseButton
          @click.prevent="
            cartStore.addItem({ product: { ...$props }, quantity: 1 })
          "
          label="Add to cart"
          :type="ButtonType.BUY"
        />
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { IProduct } from "../../interfaces/product.interface";
import { useCartStore } from "../../stores/cart";
import { useFavoriteStore } from "../../stores/favorites";
import { useCartierToast } from "@/composables/useToast";
import BaseButton, { ButtonType } from "./BaseButton.vue";

defineProps<IProduct>();

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const toast = useCartierToast();

const shareProduct = (id: number) => {
  const productLink = `${window.location.origin}/product/${id}`;
  navigator.clipboard
    .writeText(productLink)
    .then(() => {
      toast.showSuccessMessage("Copied successfully!");
    })
    .catch((error) => {
      console.error("Failed to copy product link to clipboard", error);
    });
};
</script>

<style scoped></style>
