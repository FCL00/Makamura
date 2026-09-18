<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
import type { AddOnOption, AddOn } from '~/data/menu';


type SelectedAddOn = {
  addOn: AddOn;
  quantity: number;
};

type MenuOptionRadioEmits = {
  "update:selectedAddOn": [addOn: AddOn, quantity: number, optionId: string,];
};

type MenuOptionSelectProps = {
  option: AddOnOption;
  selectedAddOns: SelectedAddOn[];
};


const emit = defineEmits<MenuOptionRadioEmits>();

const props = defineProps<MenuOptionSelectProps>();

const isSelected = (addOnId: string) => {
  return props.selectedAddOns.some(
    (selected) =>
      selected.addOn.id === addOnId && selected.quantity > 0,
  );
};

const selectAddon = (addOn: AddOn) => {
  emit('update:selectedAddOn',  addOn, 1, props.option.id);
}

</script>

<style>

</style>