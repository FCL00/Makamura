<template>
  <DialogRoot
    :open="isBasketOpen"
    @update:open="handleOpenChange"
  >
    <DialogPortal>
      <DialogOverlay />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>Your Basket</p>
          </DialogTitle>

          <DialogDescription>
            <p>Check your basket before checking out</p>
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <!-- Empty basket -->
          <template v-if="basketStore.basketItems.length === 0">
            <div
              class="flex h-full w-full flex-col items-center justify-center"
            >
              <h1 class="text-xl font-bold">
                Your Basket is empty.
              </h1>

              <IconShoppingBasket class="size-20" />
            </div>
          </template>

          <!-- Basket items -->
          <template v-else>
            <div
              v-for="basketItem in basketStore.basketItems"
              :key="basketItem.id"
              class="flex gap-2 rounded-sm border-b border-line p-4 last:border-b-0"
            >
              <NuxtImg
                v-if="basketItem.item.image"
                :src="basketItem.item.image"
                :width="32"
                :height="32"
                format="webp"
                class="addon-thumbnail"
                :alt="basketItem.item.name"
              />

              <div
                class="relative flex w-full flex-col justify-center gap-2"
              >
                <h1 class="font-semibold">
                  {{ basketItem.quantity }}x
                  {{ basketItem.item.name }}
                </h1>

                <!-- Actions -->
                <div
                  class="absolute right-0 top-0 flex justify-center gap-2"
                >
                  <Button
                    type="button"
                    @click="handleEdit(basketItem)"
                  >
                    <IconPencil class="size-3" />
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    @click="basketStore.removeItem(basketItem.id)"
                  >
                    <IconTrash class="size-3" />
                  </Button>
                </div>

                <!-- Add-ons -->
                <template
                  v-if="basketItem.selectedAddOns.length > 0"
                >
                  <p class="text-xs font-semibold">
                    Add ons:
                  </p>

                  <div
                    v-for="selectedAddOn in basketItem.selectedAddOns"
                    :key="selectedAddOn.addOn.id"
                    class="flex text-xs"
                  >
                    <p>
                      {{ selectedAddOn.quantity }}x
                      {{ selectedAddOn.addOn.name }}
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </DialogBody>

        <DialogFooter class="flex flex-col justify-end">
          <div
            class="flex w-full justify-between text-sm lg:text-base"
          >
            <p>Subtotal</p>
            <p>₱{{ basketStore.subtotal.toFixed(2) }}</p>
          </div>

          <div
            class="flex w-full justify-between text-sm lg:text-base"
          >
            <p>Delivery fee</p>
            <p>₱{{ basketStore.deliveryFee.toFixed(2) }}</p>
          </div>

          <div
            class="flex w-full justify-between text-sm lg:text-base"
          >
            <p>Taxes & charges</p>
            <p>₱{{ basketStore.VAT.toFixed(2) }}</p>
          </div>

          <div
            class="flex w-full justify-between text-sm lg:text-base"
          >
            <p class="text-xl font-bold">
              Total Amount
            </p>

            <p class="text-xl font-bold">
              ₱{{ basketStore.totalAmount.toFixed(2) }}
            </p>
          </div>

          <Button
            class="w-full"
            :disabled="basketStore.basketItems.length === 0"
            @click="onProceedCheckout"
          >
            Proceed to checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { Button } from "~/components/ui/button";

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

import type { BasketItem } from "~/types/menu";

const basketStore = useBasketStore();

const {
  isBasketOpen,
  closeBasket,
  openFoodForEdit,
} = useModal();

const handleEdit = (basketItem: BasketItem) => {
  openFoodForEdit(basketItem);
};

const handleOpenChange = (isOpen: boolean) => {
  if (!isOpen) {
    closeBasket();
  }
};

const onProceedCheckout = () => {
  closeBasket();
};
</script>