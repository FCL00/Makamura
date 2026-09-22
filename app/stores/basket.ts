import { defineStore } from "pinia";
import type { Menu, SelectedAddOn, BasketItem } from "~/types/menu";
import { v4 as uuid } from "uuid";

export const useBasketStore = defineStore("basket", () => {
  const BASKET_STORAGE_KEY = "maka-mura-basket";

  const basketItems = ref<BasketItem[]>([]);

  const addToBasket = (
    item: Menu,
    quantity: number,
    selectedAddOns: SelectedAddOn[],
  ) => {
    basketItems.value.push({
      id: uuid(),
      item,
      quantity,
      selectedAddOns: [...selectedAddOns],
    });

    saveBasket();
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

  const removeItem = (id: string) => {
    basketItems.value = basketItems.value.filter(
      (basketItem) => basketItem.id !== id,
    );

    saveBasket();
  };

  const loadBasket = () => {
    if (!import.meta.client) return;

    const storedBasket = localStorage.getItem(BASKET_STORAGE_KEY);

    if (!storedBasket) return;

    try {
      basketItems.value = JSON.parse(storedBasket);
    } catch {
      localStorage.removeItem(BASKET_STORAGE_KEY);
      basketItems.value = [];
    }
  };

  const saveBasket = () => {
    if (!import.meta.client) return;

    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basketItems.value));
  };

  const clearBasket = () => {
    basketItems.value = [];
    saveBasket();
  };

  const subtotal = computed(() => {
    return basketItems.value.reduce((total, basketItem) => {
      const itemTotal = basketItem.item.price * basketItem.quantity;

      const addOnsTotal = basketItem.selectedAddOns.reduce(
        (addOnTotal, selectedAddOn) => {
          return (
            addOnTotal + selectedAddOn.addOn.price * selectedAddOn.quantity
          );
        },
        0,
      );

      return total + itemTotal + addOnsTotal;
    }, 0);
  });

  const deliveryFee = computed(() => {
    return basketItems.value.length > 0 ? 150 : 0;
  });

  const VAT = computed(() => {
    return basketItems.value.length > 0 ? 15 : 0;
  });

  const totalAmount = computed(() => {
    return subtotal.value + deliveryFee.value + VAT.value;
  });

  onMounted(loadBasket);

  return {
    basketItems,
    addToBasket,
    updateBasketItem,
    removeItem,
    loadBasket,
    saveBasket,
    subtotal,
    deliveryFee,
    VAT,
    totalAmount,
    clearBasket,
  };
});
