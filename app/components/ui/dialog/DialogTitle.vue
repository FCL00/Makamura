<script setup lang="ts">
import { DialogTitle as RekaDialogTitle } from "reka-ui";
</script>

<template>
  <RekaDialogTitle
    class="text-xl font-semibold tracking-tight text-charcoal"
  >
    <slot />
  </RekaDialogTitle>
</template>