<template>
  <div class="max-w-7xl mx-auto min-h-screen flex flex-col">
    <TheHeader :cartList="cartList" />
    <RouterView />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import { IProduct } from "@/interfaces/product.interface";

import { onMounted, ref } from "vue";

const cartList = ref<IProduct[]>([]);

onMounted(() => {
  console.log("App mounted");
});
</script>

<style>
html {
  overflow-y: scroll;
}

html::-webkit-scrollbar {
  width: 8px;
}

html::-webkit-scrollbar-track {
  background: #f1f1f1;
}

html::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

html::-webkit-scrollbar-thumb:hover {
  background: #555;
}

html {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
</style>
