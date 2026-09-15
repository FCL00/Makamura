<script setup>
const reviews = [
  {
    quote: 'Ordered the ghost pepper on a dare. Regretted it, went back the next week anyway.',
    name: 'Mika R.',
    context: 'Regular, since 2023',
  },
  {
    quote: 'Honey butter wings are the first thing gone at every office order.',
    name: 'Dev T.',
    context: 'Office lunch order, weekly',
  },
  {
    quote: 'Fastest 20-piece bucket I have ever gotten out of a fryer.',
    name: 'Anna L.',
    context: 'First-time visitor',
  },
]
</script>

<template>
  <section id="reviews" class="border-b border-line bg-cream">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <p class="text-sm font-semibold uppercase tracking-[0.12em] text-tomato">What people order twice</p>
      <h2 class="section-heading mt-3 max-w-lg text-charcoal">Reviews from the regulars</h2>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <figure
          v-for="review in reviews"
          :key="review.name"
          class="flex flex-col justify-between rounded-2xl border border-line bg-white p-7"
        >
          <blockquote class="font-display text-xl font-medium leading-snug text-charcoal">
            “{{ review.quote }}”
          </blockquote>
          <figcaption class="mt-6 border-t border-line pt-4 text-sm">
            <span class="font-semibold text-charcoal">{{ review.name }}</span>
            <span class="block text-stone">{{ review.context }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
