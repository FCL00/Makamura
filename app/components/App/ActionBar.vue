<template>
  <div
    :class="{
      'mx-auto flex text-xs justify-center gap-4 items-center px-6 py-1 bg-black text-white': isOpen,
      'hidden': !isOpen,
    }"
  >
    <p class="text-center">Craving for more other than the chicken checkout this one out too -> </p>
    <button class="bg-tomato text-charcoal rounded-xs text-center px-1 cursor-pointer" @click="isOpen = false">x</button>
  </div>
</template>

<script lang="ts" setup>
const isOpen = useState("open", () => true);
</script>

<style scoped></style>
