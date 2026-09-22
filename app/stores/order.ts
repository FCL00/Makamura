import { defineStore } from "pinia";
import type { BasketItem } from "~/types/menu";
import type { Order } from "~/types/order";

export const useOrderStore = defineStore("order", () => {
  const ORDER_STORAGE_KEY = "maka-mura-current-order";

  const currentOrder = ref<Order | null>(null);

  const saveOrder = () => {
    if (!import.meta.client) return;

    if (!currentOrder.value) {
      localStorage.removeItem(ORDER_STORAGE_KEY);
      return;
    }

    localStorage.setItem(
      ORDER_STORAGE_KEY,
      JSON.stringify(currentOrder.value),
    );
  };

  const loadOrder = () => {
    if (!import.meta.client) return;

    const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);

    if (!storedOrder) return;

    try {
      currentOrder.value = JSON.parse(storedOrder);
    } catch {
      localStorage.removeItem(ORDER_STORAGE_KEY);
      currentOrder.value = null;
    }
  };

  const createOrder = (
    delivery: Order["delivery"],
    items: BasketItem[],
    subtotal: number,
    deliveryFee: number,
    VAT: number,
    totalAmount: number,
  ) => {
    currentOrder.value = {
      id: `MM-${Date.now()}`,
      items: JSON.parse(JSON.stringify(items)),
      delivery: {
        name: delivery.name,
        address: delivery.address,
        city: delivery.city,
        phone: delivery.phone,
      },
      subtotal,
      deliveryFee,
      VAT,
      totalAmount,
      status: "PLACED",
      estimatedArrivalMinutes: 2,
      createdAt: new Date().toISOString(),
    };

    saveOrder();
  };

  const updateStatus = (status: Order["status"]) => {
    if (!currentOrder.value) return;

    currentOrder.value.status = status;

    saveOrder();
  };

  onMounted(loadOrder);

  return {
    currentOrder,
    createOrder,
    updateStatus,
    saveOrder,
    loadOrder,
  };
});