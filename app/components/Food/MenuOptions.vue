<template>
  <div class="px-4">
    <div class="border-b border-line py-2">
      <h2>{{ option.heading }}</h2>
      <p class="text-xs text-charcoal">
        {{ option.subHeading }}
      </p>
    </div>
    <div
      v-for="addOn in option.addOns"
      :key="addOn.id"
      class="grid grid-cols-2  md:grid-cols-4 border-b border-line last:border-b-0 py-2"
    >
      <div class="col-span-1 md:col-span-3 flex items-center gap-2">
        <NuxtImg
          :src="addOn.image"
          :alt="addOn.name"
          width="32"
          height="32"
          class="addon-thumbnail"
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

      <div class="flex justify-end"  v-if="getQuantity(addOn.id) === 0">
        <button
          type="button"
          class="p-2 w-fit"
          @click="updateQuantity(addOn, 1)"
        >
          <IconPlus />
        </button>
      </div>
     

      <NumberFieldRoot
        v-else
        :min="0"
        :max="100"
        :default-value="0"
        :id="`${option.id}-${addOn.id}`"
        class="col-span-1 flex justify-end"
        :model-value="getQuantity(addOn.id)"
        @update:model-value="(value) => updateQuantity(addOn, value)"
      >
        <NumberFieldDecrement v-if="getQuantity(addOn.id) >= 1" class="p-1 md:p-2 disabled:opacity-20"">
          <IconMinus />
        </NumberFieldDecrement>

        <NumberFieldInput
          v-if="getQuantity(addOn.id) >= 1"
          readonly
          class="w-[20%] md:w-[60%] rounded-sm border border-charcoal text-center"
        />

        <NumberFieldIncrement class="p-1 md:p-2">
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
  addOn: AddOn,
  quantity: number,
}

type MenuOptionsProps = {
  option: AddOnOption;
  selectedAddOns: SelectedAddOn[];
};

type MenuOptionsEmits = {
  "update:selectedAddOn": [addOn: AddOn, quantity: number]
}

const getQuantity = (addOnId: string) => {
  const currentItem = props.selectedAddOns.find((selected) => selected.addOn.id === addOnId);
  if(currentItem){
    return currentItem.quantity;
  } else {
    return 0;
  }
}

const updateQuantity = (addOn: AddOn, quantity: number) => {
  emit('update:selectedAddOn', addOn, quantity)
}

const emit = defineEmits<MenuOptionsEmits>()

const props = defineProps<MenuOptionsProps>();
</script>