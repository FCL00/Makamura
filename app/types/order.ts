import type { BasketItem } from "~/types/menu";

export type OrderStatus =
  | "PLACED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export type DeliveryDetails = {
  name: string;
  address: string;
  city: string;
  phone: string;
};

export type Order = {
  id: string;
  items: BasketItem[];
  delivery: DeliveryDetails;
  subtotal: number;
  deliveryFee: number;
  VAT: number;
  totalAmount: number;

  status: OrderStatus;

  estimatedArrivalMinutes: number;
  createdAt: string;
};