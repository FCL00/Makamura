<template>
  <div>
    <div
      v-if="items.length"
      class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <FoodCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @add="emit('add', $event)"
      />
    </div>

    <p
      v-else
      class="rounded-2xl border border-dashed border-line py-16 text-center text-stone"
    >
      Nothing matches “{{ query }}” — try another search or category.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from "~/types/menu";

type MenuGridProps = {
  items: Menu[];
  query: string;
};

type MenuGridEmits = {
  add: [id: string];
};

defineProps<MenuGridProps>();

const emit = defineEmits<MenuGridEmits>();
</script>