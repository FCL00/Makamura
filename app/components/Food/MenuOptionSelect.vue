<template>
  <div class="px-4">
    <div class="border-b border-line py-2">
      <h2>{{ option.heading }}</h2>
      <p class="text-xs">
        {{ option.subHeading }}
        <span>{{ `(${option.maxSelections} flavors)` }}</span>
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

        <div class="flex flex-col gap-2">
          <p class="text-xs text-charcoal md:text-base">
            {{ addOn.name }}
          </p>

          <p class="text-xs text-stone" v-if="addOn.price > 0">
            +${{ addOn.price.toFixed(2) }}
          </p>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="button"
          role="checkbox"
          :aria-checked="isSelected(addOn.id)"
          :aria-label="`${isSelected(addOn.id) ? 'Remove' : 'Add'} ${addOn.name}`"
          :disabled="!isSelected(addOn.id) && isAtLimit"
          class="flex items-center justify-center p-2 disabled:cursor-not-allowed disabled:opacity-40"
          @click="toggleAddOn(addOn)"
        >
          <span
            class="flex size-5 items-center justify-center rounded border border-charcoal transition-colors"
            :class="{
              'border-tomato-muted bg-tomato-muted': isSelected(addOn.id),
            }"
          >
            <IconCheck
              v-if="isSelected(addOn.id)"
              class="size-4 text-charcoal"
            />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AddOnOption, AddOn } from "~/data/menu";

type SelectedAddOn = {
  addOn: AddOn;
  quantity: number;
};

type MenuOptionSelectEmits = {
  "update:selectedAddOn": [addOn: AddOn, quantity: number, optionId: string];
};

type MenuOptionSelectProps = {
  option: AddOnOption;
  selectedAddOns: SelectedAddOn[];
};

const emit = defineEmits<MenuOptionSelectEmits>();

const props = defineProps<MenuOptionSelectProps>();

const isSelected = (addOnId: string) => {
  return props.selectedAddOns.some(
    (selected) => selected.addOn.id === addOnId && selected.quantity > 0,
  );
};

const selectedCount = computed(() => {
  return props.option.addOns.filter((addOn) => isSelected(addOn.id)).length;
});

const isAtLimit = computed(() => {
  return (
    props.option.maxSelections !== undefined &&
    selectedCount.value >= props.option.maxSelections
  );
});

const toggleAddOn = (addOn: AddOn) => {
  if (isSelected(addOn.id)) {
    emit("update:selectedAddOn", addOn, 0, props.option.id);
    return;
  }
  if (isAtLimit.value) return;
  emit("update:selectedAddOn", addOn, 1, props.option.id);
};
</script>
