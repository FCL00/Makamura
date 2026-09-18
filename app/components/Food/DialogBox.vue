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

            <!-- <FoodMenuOptionSelect
              v-if="option.selectionType === 'select'"
              :option="option"
              :select-add-ons="selectedAddOns"
              @update:selectAddon="updateSelectedAddOns"
            /> -->

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
import { foodOptions, type Menu, type AddOn } from "~/data/menu";
import {
  DialogRoot,
  DialogClose,
  DialogFooter,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogBody,
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

const itemQuantity = ref(1);

const selectedAddOns = ref<SelectedAddOn[]>([]);

const availableOptions = computed(() => {
  const addOnCategories = props.item?.addOnCategories;
  if (!addOnCategories) {
    return [];
  }
  return foodOptions.filter((addOnCategory) =>
    addOnCategories.includes(addOnCategory.id),
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

const updateSelectedAddOns = (
  addOn: AddOn,
  quantity: number,
  optionId: string,
) => {
  const existing = selectedAddOns.value.find(
    (selected) => selected.addOn.id === addOn.id,
  );

  if (quantity <= 0) {
    selectedAddOns.value = selectedAddOns.value.filter(
      (selected) => selected.addOn.id !== addOn.id,
    );
    return;
  }

  const option = availableOptions.value.find(
    (option) => option.id === optionId,
  );

  if (option?.selectionType === "single") {
    selectedAddOns.value = selectedAddOns.value.filter(
      (selected) =>
        !option.addOns.some(
          (optionAddOn) => optionAddOn.id === selected.addOn.id,
        ),
    );
  }

  if (existing) {
    existing.quantity = quantity;
    return;
  }

  selectedAddOns.value.push({ addOn, quantity });
};

const resetCustomization = () => {
  selectedAddOns.value = [];
  itemQuantity.value = 1;
};

const emit = defineEmits<FoodDialogBoxEmits>();

const props = defineProps<FoodDialogBoxProps>();

const onChangeOpen = (isOpen: boolean) => {
  if (!isOpen) {
    resetCustomization();
  }
  emit("update:isOpen", isOpen);
};
</script>
