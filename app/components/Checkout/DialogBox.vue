<template>
  <DialogRoot :open="isCheckoutOpen" @update:open="handleOpenChange">
    <DialogPortal>
      <DialogOverlay />

      <DialogContent>
        <DialogHeader>
          <Button
            type="button"
            variant="link"
            class="w-fit p-0 py-2 text-xs"
            @click="backToBasket"
          >
            <IconArrowLeft class="size-4" />
            Back to basket
          </Button>

          <DialogTitle> Checkout </DialogTitle>

          <DialogDescription>
            Confirm your delivery details and payment information.
          </DialogDescription>
        </DialogHeader>

        <DialogBody class="space-y-8 p-4">
          <!-- Delivery -->
          <section>
            <div class="mb-4">
              <h2 class="font-semibold">Delivery details</h2>

              <p class="text-sm text-stone">
                Where should we deliver your order?
              </p>
            </div>

            <div class="grid gap-4">
              <div>
                <label
                  for="checkout-name"
                  class="mb-1 block text-sm font-medium"
                >
                  Full name
                </label>

                <input
                  id="checkout-name"
                  v-model="form.name"
                  type="text"
                  class="w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label
                  for="checkout-address"
                  class="mb-1 block text-sm font-medium"
                >
                  Delivery address
                </label>

                <textarea
                  id="checkout-address"
                  v-model="form.address"
                  rows="3"
                  class="w-full resize-none rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-charcoal"
                />
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    for="checkout-city"
                    class="mb-1 block text-sm font-medium"
                  >
                    City
                  </label>

                  <input
                    id="checkout-city"
                    v-model="form.city"
                    type="text"
                    class="w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-charcoal"
                  />
                </div>

                <div>
                  <label
                    for="checkout-phone"
                    class="mb-1 block text-sm font-medium"
                  >
                    Phone
                  </label>

                  <input
                    id="checkout-phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-charcoal"
                  />
                </div>
              </div>
            </div>
          </section>

          <!-- Orders -->
          <section>
            <div class="mb-4">
              <h2 class="font-semibold">Your order</h2>

              <p class="text-sm text-stone">
                Review everything before placing your order.
              </p>
            </div>

            <div class="divide-y divide-line rounded-md border border-line">
              <div
                v-for="basketItem in basketStore.basketItems"
                :key="basketItem.id"
                class="p-4"
              >
                <div class="flex justify-between gap-4">
                  <div>
                    <p class="font-medium">
                      {{ basketItem.quantity }}x
                      {{ basketItem.item.name }}
                    </p>

                    <div
                      v-if="basketItem.selectedAddOns.length"
                      class="mt-2 space-y-1"
                    >
                      <p
                        v-for="selectedAddOn in basketItem.selectedAddOns"
                        :key="selectedAddOn.addOn.id"
                        class="text-xs text-stone"
                      >
                        {{ selectedAddOn.quantity }}x
                        {{ selectedAddOn.addOn.name }}
                      </p>
                    </div>
                  </div>

                  <p class="font-medium">
                    ₱{{ getItemTotal(basketItem).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Totals -->
          <section class="space-y-3 border-t border-line pt-6">
            <div class="flex justify-between text-sm">
              <span>Subtotal</span>
              <span> ₱{{ basketStore.subtotal.toFixed(2) }} </span>
            </div>

            <div class="flex justify-between text-sm">
              <span>Delivery fee</span>
              <span> ₱{{ basketStore.deliveryFee.toFixed(2) }} </span>
            </div>

            <div class="flex justify-between text-sm">
              <span>VAT</span>
              <span> ₱{{ basketStore.VAT.toFixed(2) }} </span>
            </div>

            <div class="flex justify-between border-t border-line pt-4">
              <span class="text-lg font-bold"> Total </span>

              <span class="text-lg font-bold">
                ₱{{ basketStore.totalAmount.toFixed(2) }}
              </span>
            </div>
          </section>

          <!-- Payment -->
          <section>
            <div class="mb-4">
              <h2 class="font-semibold">Payment</h2>

              <p class="text-sm text-stone">This is a demo payment form.</p>
            </div>

            <div class="rounded-xl border border-line bg-surface-100 p-5">
              <div class="mb-5 flex items-center justify-between">
                <span class="text-sm font-semibold"> Card </span>

                <span class="text-xs text-stone"> DEMO </span>
              </div>

              <div class="space-y-4">
                <div>
                  <label
                    for="card-number"
                    class="mb-1 block text-sm font-medium"
                  >
                    Card number
                  </label>

                  <input
                    id="card-number"
                    v-model="form.cardNumber"
                    type="text"
                    inputmode="numeric"
                    autocomplete="cc-number"
                    class="w-full rounded-md border border-line bg-white px-3 py-2 font-mono outline-none focus:border-charcoal"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      for="card-expiry"
                      class="mb-1 block text-sm font-medium"
                    >
                      Expiry
                    </label>

                    <input
                      id="card-expiry"
                      v-model="form.expiry"
                      type="text"
                      placeholder="MM/YY"
                      autocomplete="cc-exp"
                      class="w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-charcoal"
                    />
                  </div>

                  <div>
                    <label
                      for="card-cvc"
                      class="mb-1 block text-sm font-medium"
                    >
                      CVC
                    </label>

                    <input
                      id="card-cvc"
                      v-model="form.cvc"
                      type="text"
                      inputmode="numeric"
                      autocomplete="cc-csc"
                      class="w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-charcoal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </DialogBody>

        <DialogFooter>
          <Button class="w-full" @click="handlePlaceOrder">
            Place Order · ₱{{ basketStore.totalAmount.toFixed(2) }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from "~/components/ui/dialog";

import { Button } from "~/components/ui/button";

import type { BasketItem } from "~/types/menu";

const basketStore = useBasketStore();
const orderStore = useOrderStore();

const { isCheckoutOpen, closeCheckout, backToBasket, openOrderTracking } =
  useModal();

const form = reactive({
  name: "John Doe",
  address: "123 Sample Street, Barangay Example",
  city: "Quezon City",
  phone: "0917 123 4567",

  cardNumber: "4242 4242 4242 4242",
  expiry: "12/28",
  cvc: "123",
});

const getItemTotal = (basketItem: BasketItem) => {
  const itemTotal = basketItem.item.price * basketItem.quantity;

  const addOnsTotal = basketItem.selectedAddOns.reduce(
    (total, selectedAddOn) => {
      return total + selectedAddOn.addOn.price * selectedAddOn.quantity;
    },
    0,
  );

  return itemTotal + addOnsTotal;
};

const handleOpenChange = (isOpen: boolean) => {
  if (!isOpen) {
    closeCheckout();
  }
};

const handlePlaceOrder = () => {
  if (basketStore.basketItems.length === 0) {
    return;
  }

  orderStore.createOrder(
    {
      name: form.name,
      address: form.address,
      city: form.city,
      phone: form.phone,
    },
    basketStore.basketItems,
    basketStore.subtotal,
    basketStore.deliveryFee,
    basketStore.VAT,
    basketStore.totalAmount,
  );

  basketStore.clearBasket();

  closeCheckout();
  openOrderTracking();
};
</script>
