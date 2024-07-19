<template>
  <button
    v-if="!authStore.isAuth"
    @click="authStore.loginWithGoogle"
    class="bg-blue-500 text-white px-4 text-center rounded-sm hover:bg-blue-600 duration-200"
  >
    Login with Google
  </button>
  <div
    v-else
    class="flex items-center gap-1 text-xs hover:bg-black cursor-pointer hover:text-white p-2 rounded-sm duration-200"
  >
    <router-link to="/profile">
      <span class="material-symbols-outlined">person</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
</script>
