<template>
  <div>
    <FoodMenuFilters
      v-model:query="query"
      v-model:activeCategory="activeCategory"
      v-model:popularOnly="popularOnly"
      :categories="categories"
    />

    <FoodMenuGrid
      :items="filteredItems"
      :query="query"
      @add="handleAdd"
    />

    <FoodDialogBox
      :item="editingBasketItem?.item ?? selectedItem"
      :is-open="isFoodOpen"
      :default-values="editingBasketItem"
      @update:is-open="handleFoodDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { categories } from "~/data/menu";

const {
  query,
  activeCategory,
  popularOnly,
  filteredItems,
  selectedItem,
  openFoodDialog,
} = useFoodMenu();

const {
  isFoodOpen,
  editingBasketItem,
  openFood,
  closeFoodForEdit,
} = useModal();

const handleAdd = (itemId: string) => {
  openFoodDialog(itemId);
  openFood();
};

const handleFoodDialog = (isOpen: boolean) => {
  if (isOpen) {
    return;
  }

  closeFoodForEdit();
};
</script>