<template>
  <header
    class="py-4 flex sticky top-0 bg-white z-50 justify-between items-center flex-col md:flex-row"
  >
    <router-link to="/">
      <h1
        class="text-3xl font-semibold font-montserrat text-center md:text-left"
      >
        cartier
      </h1>
    </router-link>
    <div class="flex gap-4 text-sm mt-2 md:mt-0">
      <div
        @click="handleFavoritesClick"
        class="flex items-center gap-1 text-xs hover:bg-black cursor-pointer hover:text-white p-2 rounded-sm duration-200"
      >
        <span class="material-symbols-outlined">favorite</span>
      </div>
      <div class="relative select-none" ref="cartContainer">
        <div
          @click="handleCartClick"
          class="flex items-center gap-1 text-xs hover:bg-black cursor-pointer hover:text-white p-2 rounded-sm duration-200"
        >
          <div class="relative">
            <span class="material-symbols-outlined">shopping_cart</span>
            <div
              v-if="cartStore.totalItems > 0"
              class="bg-blue-400 text-white rounded-full p-2 flex items-center justify-center w-3 h-3 text-xs absolute -top-1 -right-1"
            >
              {{ cartStore.totalItems }}
            </div>
          </div>
        </div>
        <TheCart v-if="isCartOpen" />
      </div>
      <Login></Login>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheCart from "./TheCart.vue";
import { useCartStore } from "../../stores/cart";
import { useAuthStore } from "../../stores/auth";
import { useCartierToast } from "@/composables/useToast";
import Login from "../ui/Login.vue";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const isCartOpen = ref<boolean>(false);
const cartContainer = ref<HTMLElement | null>(null);
const toast = useCartierToast();

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const handleFavoritesClick = () => {
  if (!authStore.isAuth) {
    toast.showInfoMessage("You need to be signed in to view favorites.");
    return;
  }
  router.push("/favorites");
};

const handleCartClick = () => {
  if (!authStore.isAuth) {
    toast.showInfoMessage("You need to be signed in to view the cart.");
    return;
  }
  toggleCart();
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    cartContainer.value &&
    !cartContainer.value.contains(event.target as Node)
  ) {
    isCartOpen.value = false;
  }
};

watch(
  () => route.fullPath,
  () => {
    isCartOpen.value = false;
  }
);

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
@media (max-width: 425px) {
  header {
    flex-direction: column;
    align-items: center;
  }

  .text-3xl {
    text-align: center;
  }

  .text-sm {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }
}

@media (min-width: 426px) {
  header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .text-3xl {
    text-align: left;
  }

  .text-sm {
    flex-direction: row;
    gap: 1rem;
    margin-top: 0;
  }
}
</style>
