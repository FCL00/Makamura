<template>
  <div class="px-4">
    <div class="border-b border-line py-2">
      <h2 class="text-sm md:text-base">{{ option.heading }}</h2>
      <p class="text-xs text-charcoal">
        {{ option.subHeading }}
      </p>
    </div>

    <div
      v-for="addOn in option.addOns"
      :key="addOn.id"
      class="grid grid-cols-2 border-b border-line py-2 last:border-b-0 md:grid-cols-4"
    >
      <div class="col-span-1 flex items-center gap-2 md:col-span-3">
        <NuxtImg
          :src="addOn.image"
          :alt="addOn.name"
          width="32"
          height="32"
          class="addon-thumbnail"
          format="webp"
        />

        <div>
          <p class="text-xs text-charcoal md:text-base">
            {{ addOn.name }}
          </p>

          <p class="text-xs text-stone">
            +${{ addOn.price.toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- Show only plus when the quantity is zero -->
      <div
        v-if="getQuantity(addOn.id) === 0"
        class="flex justify-end"
      >
        <button
          type="button"
          class="w-fit p-2"
          :aria-label="`Add ${addOn.name}`"
          @click="selectAddOn(addOn)"
        >
          <IconPlus />
        </button>
      </div>

      <!-- Show quantity controls when quantity is greater than zero -->
      <NumberFieldRoot
        v-else
        :min="0"
        :max="100"
        :id="`${option.id}-${addOn.id}`"
        class="col-span-1 flex justify-end"
        :model-value="getQuantity(addOn.id)"
        @update:model-value="(value) => updateQuantity(addOn, value)"
      >
        <NumberFieldDecrement
          class="p-1 disabled:opacity-20 md:p-2"
          :aria-label="`Remove one ${addOn.name}`"
        >
          <IconMinus />
        </NumberFieldDecrement>

        <NumberFieldInput
          readonly
          class="w-[20%] rounded-sm border border-charcoal text-center md:w-[60%]"
          :aria-label="`${addOn.name} quantity`"
        />

        <NumberFieldIncrement
          class="p-1 md:p-2"
          :aria-label="`Add one ${addOn.name}`"
        >
          <IconPlus />
        </NumberFieldIncrement>
      </NumberFieldRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from "reka-ui";
import type { AddOnOption, AddOn } from "~/data/menu";

type SelectedAddOn = {
  addOn: AddOn;
  quantity: number;
};

type MenuOptionQuantityProps = {
  option: AddOnOption;
  selectedAddOns: SelectedAddOn[];
};

type MenuOptionQuantityEmits = {
  "update:selectedAddOn": [addOn: AddOn, quantity: number, optionId: string];
};

const props = defineProps<MenuOptionQuantityProps>();

const emit = defineEmits<MenuOptionQuantityEmits>();

const getQuantity = (addOnId: string) => {
  const currentItem = props.selectedAddOns.find(
    (selected) => selected.addOn.id === addOnId,
  );

  return currentItem?.quantity ?? 0;
};

const selectAddOn = (addOn: AddOn) => {
  emit("update:selectedAddOn", addOn, 1, props.option.id);
};

const updateQuantity = (addOn: AddOn, quantity: number) => {
  emit("update:selectedAddOn", addOn, quantity, props.option.id);
};


</script>