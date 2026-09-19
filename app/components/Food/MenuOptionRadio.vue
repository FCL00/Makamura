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

          <p class="text-xs text-stone">+${{ addOn.price.toFixed(2) }}</p>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="button"
          role="radio"
          :aria-checked="isSelected(addOn.id)"
          :aria-label="`Select ${addOn.name}`"
          class="flex items-center justify-center p-2"
          @click="selectAddOn(addOn)"
        >
          <span
            class="flex size-5 items-center justify-center rounded-full bg-peach"
            :class="{
              'border border-tomato': isSelected(addOn.id),
            }"
          >
            <IconX v-if="isSelected(addOn.id)" class="size-4 text-tomato" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AddOnOption, AddOn } from "~/data/menu";

type SelectedAddOn = {
  addOn: AddOn;
  quantity: number;
};

type MenuOptionRadioProps = {
  option: AddOnOption;
  selectedAddOns: SelectedAddOn[];
};

type MenuOptionRadioEmits = {
  "update:selectedAddOn": [addOn: AddOn, quantity: number, optionId: string];
};

const props = defineProps<MenuOptionRadioProps>();

const emit = defineEmits<MenuOptionRadioEmits>();

const isSelected = (addOnId: string) => {
  return props.selectedAddOns.some(
    (selected) => selected.addOn.id === addOnId && selected.quantity > 0,
  );
};

const selectAddOn = (addOn: AddOn) => {
  emit("update:selectedAddOn", addOn, 1, props.option.id);
};
</script>
