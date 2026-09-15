<script setup>
import { menuItems } from '~/data/menu.js'

const drinks = menuItems.filter((item) => item.category === 'drinks')
</script>

<template>
  <section class="border-b border-line bg-sage/15">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-12">
      <div class="md:col-span-4">
        <p class="text-sm font-semibold uppercase tracking-[0.12em] text-tomato">Something to drink</p>
        <h2 class="section-heading mt-3 text-charcoal">Cold ones for hot wings</h2>
        <p class="mt-4 text-stone">
          Beer on tap, free-refill soft drinks. Ask what's pouring this week.
        </p>
      </div>

      <ul class="grid gap-4 sm:grid-cols-2 md:col-span-8 md:grid-cols-3">
        <li
          v-for="drink in drinks"
          :key="drink.id"
          class="rounded-2xl border border-line bg-cream p-5"
        >
          <p class="font-display text-lg font-bold text-charcoal">{{ drink.name }}</p>
          <p class="mt-1 text-sm text-stone">{{ drink.description }}</p>
          <p class="mt-4 font-display text-base font-bold text-charcoal">
            ${{ drink.price.toFixed(2) }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
