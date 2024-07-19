<template>
  <div class="col-span-3 bg-gray-100 p-3 h-[540px]">
    <div class="flex flex-row justify-between">
      <h1 class="font-bold text-lg ml-3">Account Settings</h1>
      <div
        class="flex flex-row text-blue-400 cursor-pointer"
        @click="editAccSettings"
      >
        <span class="material-symbols-outlined"> edit_square </span>
        <span>Edit Settings</span>
      </div>
    </div>
    <hr class="border-1 border-gray-400" />
    <div class="flex flex-col gap-3 ml-3 mt-3">
      <div class="flex-1">
        <h2 class="font-bold">Language</h2>
        <select
          v-model="language"
          :disabled="isDisabled"
          class="px-2 py-1 rounded-sm w-min"
        >
          <option v-for="lang in languages" :key="lang" :value="lang">
            {{ lang }}
          </option>
        </select>
      </div>
      <div class="flex-1">
        <h2 class="font-bold mt-4 mb-2">Notification Settings</h2>
        <label class="switch">
          <input
            type="checkbox"
            v-model="notificationsEnabled"
            :disabled="isDisabled"
          />
          <span class="slider round"></span>
        </label>
      </div>
      <div
        class="flex flex-row items-center mt-4 text-blue-400 hover:text-red-500 hover:scale-70 transition-all duration-300 ease-in-out hover:cursor-pointer"
      >
        <span class="material-symbols-outlined">delete</span>
        <span>Delete Account</span>
      </div>
    </div>
    <button
      v-if="isEditWanted"
      @click="handleSaveChanges"
      class="bg-blue-400 text-white ml-3 mt-4 px-2 py-1"
    >
      Save Changes
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const { saveUserChanges } = userStore;
const isEditWanted = ref<boolean>(false);
const isDisabled = ref<boolean>(true);

const language = ref<string>("English");
const notificationsEnabled = ref<boolean>(true);

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Turkish",
];

const editAccSettings = () => {
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
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  margin-left: 12px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 28px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.slider.round {
  border-radius: 28px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
