<template>
  <button
    class="py-3 rounded-full focus:outline-none p-2 w-8 h-8 flex items-center justify-center transition duration-300"
    :class="{
      'bg-gray-400 text-white hover:bg-gray-700': type === ButtonType.SHARE,
      'bg-blue-500 text-white hover:bg-blue-700': type === ButtonType.BUY,
    }"
  >
    <span v-if="type === ButtonType.BUY" class="material-symbols-outlined">
      shopping_cart
    </span>
    <span v-if="type === ButtonType.SHARE" class="material-symbols-outlined">
      share
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export enum ButtonType {
  BUY = "buy",
  SHARE = "share",
}

export default defineComponent({
  name: "ActionButton",
});
</script>

<script setup lang="ts">
interface IProps {
  label: string;
  type?: ButtonType;
}

withDefaults(defineProps<IProps>(), {
  type: ButtonType.BUY,
});
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}
.material-symbols-outlined {
  font-size: 20px; /* Adjust the size as needed */
}
</style>
