<script setup>
// The four flavors that anchor the heat scale, shown as one continuous
// strip rather than another card grid -- this is the page's single bold
// moment per section, everything else stays quieter.
const flavors = [
  { name: 'Honey Butter', heat: 1, bg: 'bg-peach', text: 'text-charcoal' },
  { name: 'Carolina Gold', heat: 2, bg: 'bg-butter', text: 'text-charcoal' },
  { name: 'Spicy Sriracha', heat: 3, bg: 'bg-tomato', text: 'text-cream' },
  { name: 'Ghost Pepper', heat: 4, bg: 'bg-charcoal', text: 'text-cream' },
]
</script>

<template>
  <section id="flavors" class="border-b border-line">
    <div class="mx-auto max-w-6xl px-6 pt-20">
      <p class="text-sm font-semibold uppercase tracking-[0.12em] text-tomato">The heat scale</p>
      <h2 class="section-heading mt-3 max-w-xl text-charcoal">
        Pick your flavor, then pick your pain
      </h2>
    </div>

    <div class="mt-10 grid grid-cols-2 md:grid-cols-4">
      <div
        v-for="flavor in flavors"
        :key="flavor.name"
        class="flex aspect-square flex-col justify-between p-6 md:p-8"
        :class="flavor.bg"
      >
        <div class="flex gap-1.5">
          <span
            v-for="dot in 4"
            :key="dot"
            class="h-2 w-2 rounded-full border"
            :class="[
              dot <= flavor.heat ? 'border-transparent bg-current' : 'border-current bg-transparent',
              flavor.text,
            ]"
          />
        </div>
        <p class="font-display text-2xl font-extrabold leading-[0.95] md:text-3xl" :class="flavor.text">
          {{ flavor.name }}
        </p>
      </div>
    </div>
  </section>
</template>
