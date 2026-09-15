<script setup lang="ts">
import { type HTMLAttributes, type Component, computed } from "vue";
import type { PrimitiveProps } from "reka-ui";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/cn";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive: "",
      outline: "",
      secodary: "",
      ghost: "",
      link: "",
    },
    size: {
      default: "",
      sm: "",
      md: "",
      lg: "",
    },
    defaultVaraint: {
      variant: "default",
      size: "default",
    },
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

defineOptions({
  inheritAttrs: false,
});

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  type?: "button" | "submit" | "reset";
  form?: string;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: Component;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "default",
  size: "default",
  type: "button",
  form: "undefined",
  disabled: false,
  isLoading: false,
  class: undefined,
  icon: undefined,
});

const isDisabled = computed(() => props.disabled || props.isLoading);
</script>

<template>
  <button
    v-bind="$attrs"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :type="type"
    :form="form"
    :disabled="isDisabled"
  >
    <slot></slot>
  </button>
</template>
