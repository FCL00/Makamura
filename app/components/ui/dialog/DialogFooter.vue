<template>
  <div
    :class="
      cn(
        'flex shrink-0 items-center gap-3 border-t border-line px-4 py-3',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from "~/lib/cn";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>