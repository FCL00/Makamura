<template>
  <section id="menu" class="border-b border-line bg-white">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <div class="mb-10 max-w-lg">
        <p
          class="text-sm font-semibold uppercase tracking-[0.12em] text-tomato"
        >
          The menu
        </p>
        <h2 class="section-heading mt-3 text-charcoal">Find your flavor</h2>
        <p class="mt-3 text-stone">
          Search by name or browse by category. Popular picks are what regulars
          order most.
        </p>
      </div>

      <!-- Search + filters -->
      <div
        class="mb-10 flex flex-col gap-5 border-y border-line py-5 md:flex-row md:items-center md:justify-between"
      >
        <label class="relative flex-1 md:max-w-xs">
          <span class="sr-only">Search the menu</span>
          <IconSearch
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30"
          />
          <input
            v-model="query"
            type="search"
            placeholder="Search honey butter, fries…"
            class="w-full rounded-full border border-line bg-cream py-2.5 pl-10 pr-5 text-sm text-charcoal focus:border focus:border-tomato placeholder:text-stone/70"
          />
        </label>

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
            @click="activeCategory = category.id"
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
            @click="popularOnly = !popularOnly"
          >
            Popular only
          </button>
        </div>
      </div>

      <!-- Results grid / Menu -->
      <div
        v-if="filteredItems.length"
        class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <FoodCard :filteredItems="filteredItems" @add="addOrder" />
      </div>

      <p
        v-else
        class="rounded-2xl border border-dashed border-line py-16 text-center text-stone"
      >
        Nothing matches “{{ query }}” — try another search or category.
      </p>
    </div>

    <DialogRoot v-model:open="isOpen">
      <DialogPortal>
        <DialogOverlay class="fixed inset-0 z-40 bg-charcoal/50" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {{ selectedItem?.name }}
            </DialogTitle>
            <DialogDescription>
              {{ selectedItem?.description }}
            </DialogDescription>
          </DialogHeader>
          <div class="p-4" v-if="selectedItem">
            <img
              :src="selectedItem.image"
              :alt="selectedItem.name"
              class="aspect-3/1 w-full rounded-xl object-cover"
            />
            <div class="mt-4">
              <p class="">${{ selectedItem.price.toFixed(2) }}</p>
            </div>
          </div>

          <DialogFooter>
            <NumberFieldRoot :min="0" :max="20" id="quantity" :default-value="1" class="flex">
              <NumberFieldDecrement class="p-2 disabled:opacity-20">
                <IconMinus/>
              </NumberFieldDecrement>
              <NumberFieldInput readonly class="w-[60%] rounded-sm border border-charcoal text-center"/>
              <NumberFieldIncrement class="p-2">
                <IconPlus/>
              </NumberFieldIncrement>
            </NumberFieldRoot>
            <button
              type="button"
              class="w-full green-gradient p-2 rounded-sm text-white"
            >
              Add to Basket
            </button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </section>
</template>

<script setup lang="ts">
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from "reka-ui";

import {
  DialogRoot,
  DialogClose,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { categories, menuItems, heatLevels } from "~/data/menu.js";
import type { Menu } from "~/types/menu";

// Local UI state only -- wire this up to a real search/filter composable
// (or server-side query) later without touching the markup below.
const query = ref("");
const activeCategory = ref("all");
const popularOnly = ref(false);
const isOpen = ref(false);

const selectedItem = ref<Menu | null>(null);

const totalAmout = computed(() => {
  return 1000;
});

const filteredItems = computed<Menu[]>(() => {
  return menuItems.filter((item) => {
    const matchesQuery = item.name
      .toLowerCase()
      .includes(query.value.trim().toLowerCase());
    const matchesCategory =
      activeCategory.value === "all" || item.category === activeCategory.value;
    const matchesPopular = !popularOnly.value || item.popular;
    return matchesQuery && matchesCategory && matchesPopular;
  }) as Menu[];
});

const addOrder = (orderId: string) => {
  const order = menuItems.find((menu) => menu.id === orderId);
  if (!order) return;
  selectedItem.value = order;
  isOpen.value = true;
};
</script>
