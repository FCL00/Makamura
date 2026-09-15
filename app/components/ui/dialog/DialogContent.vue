<script setup lang="ts">
import DialogClose from "./DialogClose.vue";
import {
  DialogContent as RekaDialogContent,
  DialogOverlay as RekaDialogOverlay,
  DialogPortal as RekaDialogPortal,
} from "reka-ui";

</script>

<template>
  <RekaDialogPortal>
    <RekaDialogOverlay
      class="fixed inset-0 z-40 bg-charcoal/70"
    />

    <RekaDialogContent
      class="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-cream shadow-xl outline-none"
    >
     <DialogClose as-child class="absolute top-4 right-4">
        <button
          type="button"
          aria-label="Close dialog"
          class="rounded-full p-2 text-stone transition-colors bg-peach hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tomato"
        >
          <IconX class="size-5" aria-hidden="true" />
        </button>
     </DialogClose>
      <slot />
    </RekaDialogContent>
  </RekaDialogPortal>
</template>