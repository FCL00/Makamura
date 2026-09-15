<script setup lang="ts">
import { DialogRoot as RekaDialogRoot } from "reka-ui";

const open = defineModel<boolean>("open", {
  default: false,
});
</script>

<template>
  <RekaDialogRoot v-model:open="open">
    <slot />
  </RekaDialogRoot>
</template>