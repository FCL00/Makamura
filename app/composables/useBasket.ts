import type { Menu, SelectedAddOn, BasketItem } from "~/types/menu";
import { v4 as uuid } from "uuid";

export const useBaskets = () => {
  const BASKET_STORAGE_KEY = "maka-mura-basket";
  const basketItems = useState<BasketItem[]>(BASKET_STORAGE_KEY, () => []);
  const selectedBasketItem = ref<BasketItem | null>(null);
  const isBasketOpen = useState<boolean>("basket-open", () => false);
  const isEditDialogOpen = useState<boolean>(
    "basket-edit-dialog-open",
    () => false,
  );

  const removeItem = (id: string) => {
    basketItems.value = basketItems.value.filter(
      (basketItems) => basketItems.id !== id,
    );
    saveBasket();
  };

  const editBasketItem = (basketItem: BasketItem) => {
    selectedBasketItem.value = basketItem;
    isEditDialogOpen.value = true;
  };

  const updateBasketItem = (
    id: string,
    quantity: number,
    selectedAddOns: SelectedAddOn[],
  ) => {
    basketItems.value = basketItems.value.map((basketItem) => {
      if (basketItem.id !== id) {
        return basketItem;
      }

      return {
        ...basketItem,
        quantity,
        selectedAddOns: [...selectedAddOns],
      };
    });

    saveBasket();
  };

  const loadBasket = () => {
    const storedBasket = localStorage.getItem(BASKET_STORAGE_KEY);
    if (!storedBasket) return;
    try {
      basketItems.value = JSON.parse(storedBasket);
    } catch (error) {
      localStorage.removeItem(BASKET_STORAGE_KEY);
    }
  };

  const saveBasket = () => {
    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basketItems.value));
  };

  const addToBasket = (
    item: Menu,
    quantity: number,
    addOns: SelectedAddOn[],
  ) => {
    const basketItem = {
      id: uuid(),
      item: item,
      quantity: quantity,
      selectedAddOns: [...addOns],
    };
    basketItems.value.push(basketItem);
    saveBasket();
  };

  const onBasketOpen = () => {
    isBasketOpen.value = true;
  };

  const onBasketClose = () => {
    isBasketOpen.value = false;
  };

  const clearSelectedBasketItem = () => {
    selectedBasketItem.value = null;
    isEditDialogOpen.value = false;
  };

  onMounted(() => {
    loadBasket();
  });

  return {
    loadBasket,
    saveBasket,
    isBasketOpen,
    basketItems,
    addToBasket,
    onBasketOpen,
    onBasketClose,
    removeItem,
    selectedBasketItem,
    editBasketItem,
    isEditDialogOpen,
    updateBasketItem,
    clearSelectedBasketItem,
  };
};
