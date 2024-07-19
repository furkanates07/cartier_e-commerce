<template>
  <div class="grid grid-cols-4 gap-10">
    <div class="col-span-1 bg-gray-100 flex flex-col gap-2 h-min">
      <div class="flex flex-row justify-center px-4 py-3">
        <span class="font-bold text-lg"
          >{{ userStore.getUserProfile.name }}
          {{ userStore.getUserProfile.surname }}</span
        >
      </div>
      <div class="flex flex-col">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          @click="handleTabClick(tab.key)"
          class="gap-2 hover:bg-blue-400 cursor-pointer font-semibold"
        >
          <div class="flex flex-row gap-2 py-3 px-6">
            <span class="material-symbols-outlined"> {{ tab.icon }} </span>
            <span>{{ tab.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-3 w-full">
      <component :is="activeComp" class="w-full"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Profile from "@/components/ui/Profile.vue";
import Favorites from "@/views/favorites/index.vue";
import Cart from "@/views/cart/index.vue";
import Settings from "@/components/ui/Settings.vue";
import Payment from "@/components/ui/Payment.vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";

const userStore = useUserStore();

const tabs = [
  {
    name: "Profile",
    key: "profile",
    icon: "person",
  },
  {
    name: "Cart",
    key: "cart",
    icon: "shopping_cart",
  },
  {
    name: "Favorites",
    key: "favorites",
    icon: "favorite",
  },
  {
    name: "Payment",
    key: "payment",
    icon: "credit_card",
  },
  {
    name: "Settings",
    key: "settings",
    icon: "settings",
  },
  {
    name: "Logout",
    key: "logout",
    icon: "logout",
  },
];

const selectedTab = ref("");
const authStore = useAuthStore();
const router = useRouter();

const activeComp = computed(() => {
  switch (selectedTab.value) {
    case "profile":
      return Profile;
    case "favorites":
      return Favorites;
    case "cart":
      return Cart;
    case "payment":
      return Payment;
    case "settings":
      return Settings;
    case "logout":
      return null;
    default:
      return Profile;
  }
});

const handleTabClick = (key: string) => {
  if (key === "logout") {
    authStore.handleLogout();
    router.push("/");
  } else {
    selectedTab.value = key;
  }
};
</script>

<style scoped></style>
