import { categories, menuItems } from "~/data/menu";
import type { Category, Menu } from "~/types/menu";

export const useFoodMenu = () => {

  const query = ref("");

  const activeCategory = ref<Category>("all");

  const popularOnly = ref(false);

  const selectedItem = ref<Menu | null>(null);

  const isDialogOpen = ref(false);

  const filteredItems = computed(() => {
    const normalizeQuery = query.value.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchQuery = item.name.toLowerCase().includes(normalizeQuery);
      const matchesQuery =
        activeCategory.value === "all" ||
        item.category === activeCategory.value;
      const mostPopular = !popularOnly.value || item.popular;
      return matchQuery && matchesQuery && mostPopular;
    }) as Menu[];
  });

  const openFoodDialog = (itemId: string) => {
    const item = menuItems.find((menu) => menu.id === itemId);
    if(!item) return;
    selectedItem.value = item;
    isDialogOpen.value = true;
    console.log("Basket");
  }

  const closeFoodDialog = () => {
    isDialogOpen.value = false;
  }

  return {
    categories,
    menuItems,
    query,
    activeCategory,
    popularOnly,
    selectedItem,
    isDialogOpen,
    filteredItems,
    openFoodDialog,
    closeFoodDialog,
  }
};
