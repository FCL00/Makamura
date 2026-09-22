<script setup lang="ts">
import { type HTMLAttributes, type Component, computed } from "vue";
import type { PrimitiveProps } from "reka-ui";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-lg",
    "text-sm font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-herb/40",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "bg-charcoal text-cream hover:bg-charcoal/90",
        destructive: "bg-tomato text-white hover:bg-tomato/90",
        outline: "border border-line bg-transparent text-charcoal hover:bg-peach",
        secondary: "bg-peach text-charcoal hover:bg-peach/70",
        ghost: "bg-transparent text-charcoal hover:bg-peach",
        link: "text-charcoal underline-offset-4 hover:underline",
        unstyled: "bg-transparent hover:bg-transparent"
      },

      size: {
        default: "p-2 rounded-sm",
        sm: "h-9 rounded-md px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "size-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

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
