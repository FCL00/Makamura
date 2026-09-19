<script setup lang="ts">
import { cn } from '~/lib/cn'

const props = withDefaults(
  defineProps<{
    class?: string
  }>(),
  {
    class: '',
  },
)
</script>

<template>
  <div
    :class="cn('animate-pulse rounded-md bg-charcoal/10', props.class)"
    aria-hidden="true"
  />
</template>