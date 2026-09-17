<template>
  <div>
    <FoodMenuFilters
      v-model:query="query"
      v-model:activeCategory="activeCategory"
      v-model:popularOnly="popularOnly"
      :categories="categories"
    />
    <FoodMenuGrid :items="filteredItems" :query="query" @add="openFoodDialog" />
    <FoodDialogBox
      :item="selectedItem"
      :isOpen="isDialogOpen"
      @update:isOpen="isDialogOpen = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { categories, menuItems, heatLevels } from "~/data/menu.js";

const { 
  query, 
  activeCategory, 
  popularOnly, 
  filteredItems, 
  selectedItem,
  isDialogOpen,
  openFoodDialog,
} = useFoodMenu();

</script>
