<template>
  <article
    class="relative group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream transition-shadow hover:shadow-[0_12px_28px_-16px_rgba(37,34,31,0.25)]"
  >
    <div class="aspect-4/3 bg-peach relative">
      <NuxtImg
        class="object-cover h-full w-full cursor-pointer"
        @click="handleAddOrder(item.id)"
        :src="item.image"
        :alt="item.name"
      />
      <span
        v-if="item.popular"
        class="absolute left-3 top-3 rounded-full bg-butter px-3 py-1 text-xs font-semibold text-charcoal"
      >
        Popular
      </span>
      <span
        class="absolute bottom-3 left-3 px-4 text-md font-semibold bg-butter rounded-full"
        >₱{{ item.price.toFixed(2) }}</span
      >
    </div>
    <div class="flex flex-1 flex-col gap-2 p-5">
      <div class="flex items-center justify-between gap-3">
        <h3 class="font-display text-lg font-bold leading-tight text-charcoal cursor-pointer" @click="handleAddOrder(item.id)">
          {{ item.name }}
        </h3>
      </div>

      <p class="text-sm leading-relaxed text-stone">
        {{ item.description }}
      </p>
      <div class="flex justify-end items-end h-full">
        <button
          class="flex gap-2 cursor-pointer text-xs bg-charcoal text-cream rounded-sm p-2"
          @click="handleAddOrder(item.id)"
        >
          <span>Add to Basket</span>
        </button>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Menu } from '~/types/menu'

type FoodCardProps = {
  item:  Menu
}

type FoodCardEmits = {
  add: [id: string],
}


const emit = defineEmits<FoodCardEmits>()
const props = defineProps<FoodCardProps>()

const handleAddOrder = (id: string) => {
  emit('add', id);
}


</script>