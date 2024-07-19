<template>
  <div class="col-span-3 bg-gray-100 p-3 h-[540px]">
    <div class="flex flex-row justify-between">
      <h1 class="font-bold text-lg ml-3">Profile</h1>
      <div
        class="flex flex-row text-blue-400 cursor-pointer"
        @click="editProfile"
      >
        <span class="material-symbols-outlined"> edit_square </span>
        <span>Edit Profile</span>
      </div>
    </div>
    <hr class="border-1 border-gray-400" />
    <div class="flex flex-col gap-3 ml-3">
      <div class="flex flex-row gap-5 mt-5">
        <div class="flex-1">
          <h2 class="font-bold">Name</h2>
          <input
            type="text"
            v-model="userProfile.name"
            :placeholder="userProfile.name || 'please fill in'"
            :class="{ 'border-blue-400 border-2': !isDisabled }"
            :disabled="isDisabled"
            class="px-2 py-1 rounded-sm w-full max-w-md"
          />
        </div>
        <div class="flex-1">
          <h2 class="font-bold">Surname</h2>
          <input
            type="text"
            v-model="userProfile.surname"
            :placeholder="userProfile.surname || 'please fill in'"
            :class="{ 'border-blue-400 border-2': !isDisabled }"
            :disabled="isDisabled"
            class="px-2 py-1 rounded-sm w-full max-w-md"
          />
        </div>
      </div>
      <div class="flex flex-row gap-5 mt-5">
        <div class="flex-1">
          <h2 class="font-bold">Phone</h2>
          <input
            type="tel"
            v-model="userProfile.phone"
            :placeholder="userProfile.phone || 'please fill in'"
            :class="{ 'border-blue-400 border-2': !isDisabled }"
            :disabled="isDisabled"
            class="px-2 py-1 rounded-sm w-full"
          />
        </div>
        <div class="flex-1">
          <h2 class="font-bold">Email</h2>
          <input
            type="email"
            v-model="userProfile.email"
            :placeholder="userProfile.email || 'please fill in'"
            :disabled="true"
            class="px-2 py-1 rounded-sm w-full"
          />
        </div>
      </div>
      <div class="flex-1 mt-5">
        <h2 class="font-bold">Address</h2>
        <input
          type="text"
          v-model="userProfile.address"
          :placeholder="userProfile.address || 'please fill in'"
          :class="{ 'border-blue-400 border-2': !isDisabled }"
          :disabled="isDisabled"
          class="px-2 py-1 rounded-sm w-full"
        />
      </div>
    </div>
    <button
      v-if="isEditWanted"
      @click="handleSaveChanges"
      class="bg-blue-400 text-white ml-3 mt-3 px-2 py-1"
    >
      Save Changes
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const isEditWanted = ref<boolean>(false);
const isDisabled = ref<boolean>(true);

const { userProfile, saveUserChanges } = userStore;

const editProfile = () => {
  isEditWanted.value = !isEditWanted.value;
  isDisabled.value = !isDisabled.value;
};

const handleSaveChanges = () => {
  saveUserChanges();
  isEditWanted.value = false;
  isDisabled.value = true;
};
</script>

<style scoped>
.input:focus {
  outline: none;
}
.flex-1 {
  display: flex;
  flex-direction: column;
}
</style>
