import type { BasketItem } from "~/types/menu";

export const useModal = () => {
  const isBasketOpen = useState<boolean>("modal-basket-open", () => false);

  const isFoodOpen = useState<boolean>("modal-food-open", () => false);

  const editingBasketItem = useState<BasketItem | null>(
    "modal-editing-basket-item",
    () => null,
  );

  const openBasket = () => {
    isBasketOpen.value = true;
  };

  const closeBasket = () => {
    isBasketOpen.value = false;
  };

  const openFood = () => {
    isFoodOpen.value = true;
  };

  const closeFood = () => {
    isFoodOpen.value = false;
  };

  const openFoodForEdit = (basketItem: BasketItem) => {
    editingBasketItem.value = basketItem;
    isBasketOpen.value = false;
    isFoodOpen.value = true;
  };

  const closeFoodForEdit = () => {
    editingBasketItem.value = null;
    isFoodOpen.value = false;
  };

  const closeFoodAndOpenBasket = () => {
    editingBasketItem.value = null;
    isFoodOpen.value = false;
    isBasketOpen.value = true;
  };

  return {
    isBasketOpen,
    isFoodOpen,
    editingBasketItem,

    openBasket,
    closeBasket,

    openFood,
    closeFood,

    openFoodForEdit,
    closeFoodForEdit,
    closeFoodAndOpenBasket,
  };
};
