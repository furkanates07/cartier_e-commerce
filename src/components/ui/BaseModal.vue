<template>
  <teleport to="body">
    <!-- Outer Modal -->
    <div
      v-if="open"
      :class="[
        'fixed inset-0 z-50 flex items-center justify-center bg-black/50',
        backdropClass,
      ]"
      @click="$emit('close')"
    >
      <!-- Inner Modal -->
      <div
        :class="['min-w-[400px] bg-white shadow-sm rounded-md p-2', modalClass]"
      >
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
interface IProps {
  open?: boolean;
  modalClass?: string;
  backdropClass?: string;
}
defineProps<IProps>();
defineEmits(["close"]);
</script>

<style scoped></style>
