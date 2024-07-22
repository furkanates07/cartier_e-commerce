<template>
  <input
    v-model="search"
    type="text"
    class="w-full mb-2 p-2 border border-gray-400 rounded-sm"
    placeholder="Search for a product"
  />
  <div>
    <button
      v-for="category in categories"
      :key="category"
      @click="filterByCategory(category)"
      class="mr-2 mb-2 p-1 border-none rounded-sm hover:bg-gray-200"
    >
      {{ category }}
    </button>
  </div>
  <BaseSpinner v-if="loading" />
  <div v-else class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-2">
    <div v-if="filteredProducts.length === 0" class="text-center col-span-5">
      We can't find any products with the given search term.
    </div>
    <ProductCard
      v-for="product in filteredProducts"
      :key="product.title"
      v-bind="product"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { IProduct } from "@/interfaces/product.interface";
import ProductCard from "@/components/ui/ProductCard.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";

const products = ref<IProduct[]>([]);
const search = ref<string>("");

const loading = ref<boolean>(false);

const fetchProducts = () => {
  loading.value = true;
  fetch("https://dummyjson.com/products/")
    .then((res) => res.json())
    .then((json) => {
      products.value = json.products;
      products.value = shuffle(products.value);
      loading.value = false;
    });
};

const filteredProducts = computed(() => {
  return products.value.filter(
    (product) =>
      product.title.toLowerCase().includes(search.value.toLowerCase()) ||
      product.description.toLowerCase().includes(search.value.toLowerCase()) ||
      product.category.toLowerCase().includes(search.value.toLowerCase())
  );
});

const categories = computed(() => {
  return Array.from(new Set(products.value.map((product) => product.category)));
});

const filterByCategory = (category: string) => {
  search.value = category;
};

const shuffle = (array: IProduct[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

onMounted(fetchProducts);
</script>
