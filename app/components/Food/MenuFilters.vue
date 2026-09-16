<template>
  <div
    class="mb-10 flex flex-col gap-5 border-y border-line py-5 md:flex-row md:items-center md:justify-between"
  >
    <!-- Search -->
    <label class="relative flex-1 md:max-w-xs">
      <span class="sr-only">Search the menu</span>

      <IconSearch
        class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30"
      />

      <input
        :value="query"
        type="search"
        placeholder="Search honey butter, fries…"
        class="w-full rounded-full border border-line bg-cream py-2.5 pl-10 pr-5 text-sm text-charcoal placeholder:text-stone/70 focus:border focus:border-tomato"
        @input="onQueryInput"
      />
    </label>

    <!-- Categories + Popular -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="category in categories"
        :key="category.id"
        type="button"
        class="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
        :class="
          activeCategory === category.id
            ? 'border-charcoal bg-charcoal text-cream'
            : 'border-line text-stone hover:border-charcoal/40 hover:text-charcoal'
        "
        @click="emit('update:activeCategory', category.id)"
      >
        {{ category.label }}
      </button>

      <button
        type="button"
        class="ml-1 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
        :class="
          popularOnly
            ? 'border-tomato bg-tomato text-cream'
            : 'border-line text-stone hover:border-tomato/50 hover:text-tomato'
        "
        @click="emit('update:popularOnly', !popularOnly)"
      >
        Popular only
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "~/types/menu";

type CategoryOption = {
  id: Category;
  label: string;
};

type MenuFiltersProps = {
  query: string;
  activeCategory: Category | "all";
  popularOnly: boolean;
  categories: CategoryOption[];
};

type MenuFiltersEmits = {
  "update:query": [value: string];
  "update:activeCategory": [value: Category | "all"];
  "update:popularOnly": [value: boolean];
};

defineProps<MenuFiltersProps>();

const emit = defineEmits<MenuFiltersEmits>();

const onQueryInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emit("update:query", target.value);
};
</script>
