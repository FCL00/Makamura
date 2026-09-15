<script setup lang="ts">
import {
  DialogDescription as RekaDialogDescription,
} from "reka-ui";
</script>

<template>
  <RekaDialogDescription class="text-sm leading-6 text-stone">
    <slot />
  </RekaDialogDescription>
</template>