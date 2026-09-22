<template>
  <DialogRoot :open="isOrderTrackingOpen" @update:open="handleOpenChange">
    <DialogPortal>
      <DialogOverlay />

      <DialogContent>
        <DialogHeader>
          <div class="flex flex-col">
            <DialogTitle> Track your order </DialogTitle>

            <DialogDescription>
              Order #{{ orderStore.currentOrder?.id }}
            </DialogDescription>
            <div
              class="rounded-sm bg-peach px-3 py-1 text-xs font-semibold w-fit"
            >
              {{ statusLabel }}
            </div>
          </div>
        </DialogHeader>

        <DialogBody class="space-y-6 p-4">
          <!-- ETA -->
          <section class="rounded-xl border border-line bg-white p-5">
            <p class="text-sm text-stone">Estimated arrival</p>

            <p class="mt-1 text-3xl font-bold">
              {{ formattedEta }}
            </p>

            <p class="mt-1 text-sm text-stone">Your order is on its way.</p>
          </section>

          <!-- Map -->
          <section>
            <div class="mb-3">
              <h2 class="font-semibold">Delivery tracking</h2>

              <p class="text-sm text-stone">
                Your driver is heading to your location.
              </p>
            </div>

            <div
              class="relative h-64 overflow-hidden rounded-xl border border-line bg-sage/20"
            >
              <!-- Fake map -->
              <div class="absolute inset-0 opacity-40">
                <div class="absolute left-[15%] top-0 h-full w-px bg-stone" />

                <div
                  class="absolute left-[45%] top-0 h-full w-px rotate-12 bg-stone"
                />

                <div
                  class="absolute left-[70%] top-0 h-full w-px rotate-[-20deg] bg-stone"
                />

                <div
                  class="absolute left-0 top-[30%] h-px w-full rotate-[8deg] bg-stone"
                />

                <div
                  class="absolute left-0 top-[65%] h-px w-full rotate-[-5deg] bg-stone"
                />
              </div>

              <!-- Route -->
              <svg
                class="absolute inset-0 h-full w-full"
                viewBox="0 0 400 250"
                preserveAspectRatio="none"
              >
                <path
                  d="M80 60 C130 100, 170 90, 210 135 S300 170, 340 210"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-dasharray="10 8"
                  class="text-tomato"
                />
              </svg>

              <!-- Restaurant -->
              <div
                class="absolute left-[17%] top-[18%] flex size-10 items-center justify-center rounded-full bg-charcoal text-cream"
              >
                <IconStore class="size-5" />
              </div>

              <!-- Driver -->
              <div
                class="absolute left-[50%] top-[48%] flex size-11 items-center justify-center rounded-full border-4 border-white bg-tomato text-white shadow-md"
              >
                <IconMotorbike class="size-5" />
              </div>

              <!-- Destination -->
              <div
                class="absolute bottom-[10%] right-[10%] flex size-10 items-center justify-center rounded-full bg-herb text-white"
              >
                <IconMapPin class="size-5" />
              </div>
            </div>
          </section>

          <!-- Timeline -->
          <section>
            <div class="mb-4">
              <h2 class="font-semibold">Order status</h2>
            </div>
            <div
              v-for="step in statusSteps"
              :key="step.status"
              class="flex gap-3"
            >
              <div class="flex flex-col items-center">
                <div
                  class="flex size-7 shrink-0 items-center justify-center rounded-full border"
                  :class="
                    isStatusComplete(step.status)
                      ? 'border-herb bg-herb text-white'
                      : 'border-line bg-cream text-stone'
                  "
                >
                  <IconCheck
                    v-if="isStatusComplete(step.status)"
                    class="size-4"
                  />

                  <span v-else class="size-2 rounded-full bg-stone" />
                </div>

                <div
                  v-if="step.status !== 'DELIVERED'"
                  class="mt-1 h-8 w-px bg-line"
                />
              </div>

              <div>
                <p
                  class="text-sm font-semibold"
                  :class="
                    isStatusComplete(step.status)
                      ? 'text-charcoal'
                      : 'text-stone'
                  "
                >
                  {{ step.label }}
                </p>

                <p class="text-xs text-stone">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </section>

          <!-- Order items -->
          <section>
            <h2 class="mb-3 font-semibold">Your order</h2>

            <div class="divide-y divide-line rounded-xl border border-line">
              <div
                v-for="basketItem in orderStore.currentOrder?.items"
                :key="basketItem.id"
                class="flex justify-between gap-4 p-4"
              >
                <div>
                  <p class="font-medium">
                    {{ basketItem.quantity }}x
                    {{ basketItem.item.name }}
                  </p>

                  <div
                    v-if="basketItem.selectedAddOns.length"
                    class="mt-1 space-y-1"
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
          </section>

          <!-- Totals -->
          <section
            v-if="orderStore.currentOrder"
            class="space-y-3 border-t border-line pt-5"
          >
            <div class="flex justify-between text-sm">
              <span>Subtotal</span>
              <span> ₱{{ orderStore.currentOrder.subtotal.toFixed(2) }} </span>
            </div>

            <div class="flex justify-between text-sm">
              <span>Delivery fee</span>
              <span>
                ₱{{ orderStore.currentOrder.deliveryFee.toFixed(2) }}
              </span>
            </div>

            <div class="flex justify-between text-sm">
              <span>VAT</span>
              <span> ₱{{ orderStore.currentOrder.VAT.toFixed(2) }} </span>
            </div>

            <div class="flex justify-between border-t border-line pt-4">
              <span class="font-bold"> Total </span>

              <span class="font-bold">
                ₱{{ orderStore.currentOrder.totalAmount.toFixed(2) }}
              </span>
            </div>
          </section>
        </DialogBody>

        <DialogFooter>
          <Button class="w-full" @click="closeOrderTracking"> Done </Button>
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
import type { OrderStatus } from "~/types/order";

const orderStore = useOrderStore();

const { isOrderTrackingOpen, closeOrderTracking } = useModal();

const remainingSeconds = ref(120);

let countdownTimer: ReturnType<typeof setInterval> | null = null;

const statusSteps = [
  {
    status: "PLACED" as OrderStatus,
    label: "Order placed",
    description: "We've received your order.",
  },
  {
    status: "PREPARING" as OrderStatus,
    label: "Preparing your food",
    description: "The kitchen is preparing your order.",
  },
  {
    status: "OUT_FOR_DELIVERY" as OrderStatus,
    label: "Out for delivery",
    description: "Your driver is heading your way.",
  },
  {
    status: "DELIVERED" as OrderStatus,
    label: "Delivered",
    description: "Enjoy your meal!",
  },
];

const statusLabel = computed(() => {
  switch (orderStore.currentOrder?.status) {
    case "PLACED":
      return "Order placed";

    case "PREPARING":
      return "Preparing";

    case "OUT_FOR_DELIVERY":
      return "On the way";

    case "DELIVERED":
      return "Delivered";

    default:
      return "";
  }
});

const formattedEta = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60);
  const seconds = remainingSeconds.value % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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

const statusOrder: OrderStatus[] = [
  "PLACED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const isStatusComplete = (status: OrderStatus) => {
  if (!orderStore.currentOrder) {
    return false;
  }

  return (
    statusOrder.indexOf(status) <=
    statusOrder.indexOf(orderStore.currentOrder.status)
  );
};

const startTracking = () => {
  remainingSeconds.value = 120;

  if (countdownTimer) {
    clearInterval(countdownTimer);
  }

  countdownTimer = setInterval(() => {
    if (remainingSeconds.value <= 0) {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }

      orderStore.updateStatus("DELIVERED");

      return;
    }

    remainingSeconds.value -= 1;

    const elapsed = 120 - remainingSeconds.value;

    if (elapsed >= 15 && elapsed < 60) {
      orderStore.updateStatus("PREPARING");
    }

    if (elapsed >= 60 && elapsed < 120) {
      orderStore.updateStatus("OUT_FOR_DELIVERY");
    }
  }, 1000);
};

const handleOpenChange = (isOpen: boolean) => {
  if (!isOpen) {
    closeOrderTracking();
  }
};

watch(isOrderTrackingOpen, (isOpen) => {
  if (isOpen) {
    startTracking();
  } else if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
});

onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});
</script>
