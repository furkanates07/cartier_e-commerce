<template>
  <div class="flex flex-col md:flex-row gap-10 w-full px-4">
    <BaseSpinner class="w-full h-[400px]" v-if="isLoading" />
    <div v-else class="w-full md:w-1/2 h-[400px] flex flex-col gap-4">
      <img
        class="w-full h-full object-contain bg-gray-100"
        :src="currentBigImage"
      />
    </div>
    <div
      class="flex flex-col gap-2 w-full md:w-1/2 h-full items-baselines justify-center"
    >
      <div class="flex flex-row justify-between font-semibold">
        <h1 class="text-2xl">{{ product?.title }}</h1>
        <div class="text-lg text-yellow-400 flex items-center">
          <span class="material-symbols-outlined"> star </span>
          <span>{{ product?.rating }}</span>
        </div>
      </div>
      <h2 class="font-semibold">{{ product?.brand }}</h2>
      <p>{{ product?.description }}</p>
      <h2 class="text-xl">${{ product?.price }}</h2>
      <div class="w-full h-full grid grid-cols-4 gap-3 mt-5">
        <img
          v-for="(image, index) in product?.images"
          :src="image"
          class="w-full h-20 object-contain border border-gray-300 cursor-pointer"
          @click="changeBigImage(index)"
        />
      </div>
      <div class="items-center grid grid-cols-8 gap-1 mt-5 h-12">
        <button
          @click="cartStore.addItem({ product: { ...product! }, quantity })"
          class="h-full col-span-7 bg-black text-white shadow-md cursor-pointer active:scale-90 flex items-center justify-center text-lg"
        >
          ADD TO CART
        </button>
        <button
          @click.prevent="
            favoriteStore.isFavorite(product?.id!)
              ? favoriteStore.removeFavorite(product?.id!)
              : favoriteStore.addFavorite(product!)
          "
          class="h-full col-span-1 shadow-md cursor-pointer active:scale-90 flex items-center justify-center text-lg"
          :class="{
            'bg-red-600 text-white': favoriteStore.isFavorite(product?.id!),
            'bg-black text-white ': !favoriteStore.isFavorite(product?.id!),
          }"
        >
          <span class="material-symbols-outlined"> favorite </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import { IProduct } from "@/interfaces/product.interface";
import { useCartStore } from "@/stores/cart";
import { useFavoriteStore } from "@/stores/favorites";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const route = useRoute();

const quantity = ref<number>(1);
const isLoading = ref<boolean>(false);
const product = ref<IProduct>();
const currentBigImageIndex = ref<number>(0);

const currentBigImage = computed(() => {
  return product.value?.images[currentBigImageIndex.value];
});

const changeBigImage = (index: number) => {
  currentBigImageIndex.value = index;
};

onMounted(() => {
  isLoading.value = true;
  fetch("https://dummyjson.com/products/" + route.params.id)
    .then((res) => res.json())
    .then((json) => {
      product.value = json;
      console.log(product.value);
      isLoading.value = false;
    });
});
</script>
