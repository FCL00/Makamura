<template>
  <DialogRoot :open="isOpen" @update:open="onChangeOpen">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-charcoal/50" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {{ item?.name }}
          </DialogTitle>
          <DialogDescription>
            {{ item?.description }}
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div class="p-4">
            <NuxtImg
              :src="item?.image"
              :alt="item?.name"
              class="aspect-3/1 w-full rounded-xl object-cover"
              format="webp"
            />
          </div>

          <template v-for="option in availableOptions" :key="option.id">
            <FoodMenuOptionQuantity
              v-if="option.selectionType === 'quantity'"
              :option="option"
              :selected-add-ons="selectedAddOns"
              @update:selectedAddOn="updateSelectedAddOns"
            />

            <FoodMenuOptionSelect
              v-else-if="option.selectionType === 'multiple'"
              :option="option"
              :selected-add-ons="selectedAddOns"
              @update:selectedAddOn="updateSelectedAddOns"
            />

            <FoodMenuOptionRadio
              v-else-if="option.selectionType === 'single'"
              :option="option"
              :selected-add-ons="selectedAddOns"
              @update:selectedAddOn="updateSelectedAddOns"
            />
          </template>
        </DialogBody>
        <DialogFooter class="flex flex-col md:flex-row">
          <NumberFieldRoot
            :min="1"
            :max="20"
            id="quantity"
            :default-value="1"
            class="flex justify-center md:justify-start"
            v-model="itemQuantity"
          >
            <NumberFieldDecrement class="p-1 md:p-2 disabled:opacity-20">
              <IconMinus />
            </NumberFieldDecrement>
            <NumberFieldInput
              readonly
              class="w-[20%] md:w-[60%] rounded-sm border border-charcoal text-center"
            />
            <NumberFieldIncrement class="p-1 md:p-2">
              <IconPlus />
            </NumberFieldIncrement>
          </NumberFieldRoot>
          <Button class="w-full h-full" type="button">
            Add to Basket ~ ${{ totalAmount.toFixed(2) }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { foodOptions, type AddOn, type Menu } from "~/data/menu";
import {
  DialogFooter,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogRoot,
} from "~/components/ui/dialog";
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from "reka-ui";

type SelectedAddOn = {
  addOn: AddOn;
  quantity: number;
};

type FoodDialogBoxProps = {
  item: Menu | null;
  isOpen: boolean;
};

type FoodDialogBoxEmits = {
  "update:isOpen": [isOpen: boolean];
};

const props = defineProps<FoodDialogBoxProps>();

const emit = defineEmits<FoodDialogBoxEmits>();

const itemQuantity = ref(1);

const selectedAddOns = ref<SelectedAddOn[]>([]);

const availableOptions = computed(() => {
  const addOnCategories = props.item?.addOnCategories;

  if (!addOnCategories) {
    return [];
  }

  return foodOptions.filter((option) =>
    addOnCategories.includes(option.category),
  );
});

const addOnsTotal = computed(() => {
  return selectedAddOns.value.reduce((total, selected) => {
    return total + selected.addOn.price * selected.quantity;
  }, 0);
});

const subtotal = computed(() => {
  if (!props.item) return 0;
  return props.item.price + addOnsTotal.value;
});

const totalAmount = computed(() => {
  return subtotal.value * itemQuantity.value;
});

const initializeDefaultAddOns = () => {
  const defaults: SelectedAddOn[] = [];

  for (const option of availableOptions.value) {
    if (!option.defaultAddOnIds?.length) {
      continue;
    }

    for (const defaultAddOnId of option.defaultAddOnIds) {
      const defaultAddOn = option.addOns.find(
        (addOn) => addOn.id === defaultAddOnId,
      );

      if (!defaultAddOn) {
        continue;
      }

      defaults.push({
        addOn: defaultAddOn,
        quantity: 1,
      });
    }
  }

  selectedAddOns.value = defaults;
};

const updateSelectedAddOns = (
  addOn: AddOn,
  quantity: number,
  optionId: string,
) => {
  const option = availableOptions.value.find(
    (option) => option.id === optionId,
  );

  if (!option) {
    return;
  }

  if (quantity <= 0) {
    selectedAddOns.value = selectedAddOns.value.filter(
      (selected) => selected.addOn.id !== addOn.id,
    );

    return;
  }

  if (option.selectionType === "single") {
    selectedAddOns.value = selectedAddOns.value.filter(
      (selected) =>
        !option.addOns.some(
          (optionAddOn) => optionAddOn.id === selected.addOn.id,
        ),
    );
    selectedAddOns.value.push({
      addOn,
      quantity: 1,
    });
    return;
  }

  if (option.selectionType === "multiple") {
    const alreadySelected = selectedAddOns.value.some(
      (selected) => selected.addOn.id === addOn.id,
    );
    if (alreadySelected) {
      return;
    }

    const selectedInOption = selectedAddOns.value.filter((selected) =>
      option.addOns.some((optionAddOn) => optionAddOn.id === selected.addOn.id),
    );

    if (
      option.maxSelections !== undefined &&
      selectedInOption.length >= option.maxSelections
    ) {
      return;
    }

    selectedAddOns.value.push({
      addOn,
      quantity: 1,
    });

    return;
  }

  const existing = selectedAddOns.value.find(
    (selected) => selected.addOn.id === addOn.id,
  );

  if (existing) {
    existing.quantity = quantity;
    return;
  }

  selectedAddOns.value.push({
    addOn,
    quantity,
  });
};

const resetCustomization = () => {
  selectedAddOns.value = [];
  itemQuantity.value = 1;
};

const onChangeOpen = (isOpen: boolean) => {
  if (isOpen) {
    initializeDefaultAddOns();
  } else {
    resetCustomization();
  }

  emit("update:isOpen", isOpen);
};
</script>
