import type { Menu, SelectedAddOn, BasketItem } from "~/types/menu";

export const useBaskets = () => {
  const basketItems = ref<BasketItem[]>([]);
  
  const isBasketOpen = ref(false);
    
  const addToBasket = (item: Menu, quantity: number, addOns: SelectedAddOn[]) => {
    const basketItem = { item: item,
      quantity: quantity,
      selectedAddOns: [...addOns],
    };
    basketItems.value.push(basketItem);
  };


  const onBasketOpen = () => {
    isBasketOpen.value = true
  }

  const onBasketClose = () => {
    isBasketOpen.value = true
  }


  return {
    basketItems,
    addToBasket,
  }
};
