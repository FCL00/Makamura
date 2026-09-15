<script setup lang="ts">
import { DialogClose as RekaDialogClose } from "reka-ui";

withDefaults(
  defineProps<{
    asChild?: boolean;
  }>(),
  {
    asChild: false,
  },
);
</script>

<template>
  <RekaDialogClose :as-child="asChild">
    <slot />
  </RekaDialogClose>
</template>