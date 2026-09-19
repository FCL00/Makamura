<template>
  <script setup lang="ts"></script>

  <template>
    <div class="overflow-hidden rounded-2xl bg-white">
      <Skeleton class="aspect-square w-full rounded-none" />

      <div class="space-y-3 p-4">
        <Skeleton class="h-5 w-3/4" />

        <div class="space-y-2">
          <Skeleton class="h-3 w-full" />
          <Skeleton class="h-3 w-2/3" />
        </div>

        <div class="flex items-center justify-between pt-2">
          <Skeleton class="h-5 w-20" />
          <Skeleton class="size-9 rounded-full" />
        </div>
      </div>
    </div>
  </template>
</template>


<script lang="ts" setup>
import { Skeleton } from '~/components/ui/skeleton';
</script>