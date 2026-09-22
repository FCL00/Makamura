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
          <div v-if="item?.image" class="p-4">
            <NuxtImg
              :src="item.image"
              :alt="item.name"
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
            v-model="itemQuantity"
            :min="1"
            :max="20"
            class="flex justify-center md:justify-start"
          >
            <NumberFieldDecrement class="p-1 md:p-2 disabled:opacity-20">
              <IconMinus />
            </NumberFieldDecrement>

            <NumberFieldInput
              readonly
              class="w-[20%] rounded-sm border border-charcoal text-center md:w-[60%]"
            />

            <NumberFieldIncrement class="p-1 md:p-2">
              <IconPlus />
            </NumberFieldIncrement>
          </NumberFieldRoot>

          <Button class="h-full w-full" type="button" @click="handleSubmit">
            {{ isEditing ? "Update Basket" : "Add to Basket" }}
            ~ ₱{{ totalAmount.toFixed(2) }}
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

import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from "reka-ui";

import { foodOptions, type AddOn, type Menu } from "~/data/menu";

import type { BasketItem, SelectedAddOn } from "~/types/menu";

type FoodDialogBoxProps = {
  item: Menu | null;
  isOpen: boolean;
  defaultValues?: BasketItem | null;
};

type FoodDialogBoxEmits = {
  "update:isOpen": [isOpen: boolean];
};

const { closeFoodAndOpenBasket } = useModal();

const props = defineProps<FoodDialogBoxProps>();

const emit = defineEmits<FoodDialogBoxEmits>();

const basketStore = useBasketStore();

const itemQuantity = ref(1);

const selectedAddOns = ref<SelectedAddOn[]>([]);

const isEditing = computed(() => {
  return !!props.defaultValues;
});

const availableOptions = computed(() => {
  if (!props.item?.addOnCategories) {
    return [];
  }

  return foodOptions.filter((option) =>
    props.item!.addOnCategories!.includes(option.category),
  );
});

const addOnsTotal = computed(() => {
  return selectedAddOns.value.reduce(
    (total, selected) => total + selected.addOn.price * selected.quantity,
    0,
  );
});

const totalAmount = computed(() => {
  if (!props.item) {
    return 0;
  }

  return (props.item.price + addOnsTotal.value) * itemQuantity.value;
});

const initializeDefaultAddOns = () => {
  const defaults: SelectedAddOn[] = [];

  for (const option of availableOptions.value) {
    if (!option.defaultAddOnIds?.length) {
      continue;
    }

    for (const defaultAddOnId of option.defaultAddOnIds) {
      const addOn = option.addOns.find((addOn) => addOn.id === defaultAddOnId);

      if (!addOn) {
        continue;
      }

      defaults.push({
        addOn,
        quantity: 1,
      });
    }
  }

  selectedAddOns.value = defaults;
};

const populateDialog = () => {
  if (props.defaultValues) {
    itemQuantity.value = props.defaultValues.quantity;

    selectedAddOns.value = props.defaultValues.selectedAddOns.map(
      (selectedAddOn) => ({
        addOn: selectedAddOn.addOn,
        quantity: selectedAddOn.quantity,
      }),
    );

    return;
  }
  itemQuantity.value = 1;
  initializeDefaultAddOns();
};

watch([() => props.isOpen, () => props.defaultValues], ([isOpen]) => {
  if (isOpen) {
    populateDialog();
  } else {
    resetCustomization();
  }
});

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
  itemQuantity.value = 1;
  selectedAddOns.value = [];
};

const handleSubmit = () => {
  if (!props.item) {
    return;
  }

  if (props.defaultValues) {
    basketStore.updateBasketItem(
      props.defaultValues.id,
      itemQuantity.value,
      selectedAddOns.value,
    );
    closeFoodAndOpenBasket();
  } else {
    basketStore.addToBasket(
      props.item,
      itemQuantity.value,
      selectedAddOns.value,
    );
  }

  emit("update:isOpen", false);
  resetCustomization();
};

const onChangeOpen = (isOpen: boolean) => {
  emit("update:isOpen", isOpen);
};
</script>
