<script setup>
import { menuItems } from '~/data/menu.js'

const buckets = menuItems.filter((item) => item.category === 'buckets')
</script>

<template>
  <section class="border-b border-line bg-white">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div class="max-w-lg">
          <p class="text-sm font-semibold uppercase tracking-[0.12em] text-tomato">Buckets</p>
          <h2 class="section-heading mt-3 text-charcoal">Built for sharing (or not)</h2>
        </div>
        <a href="#menu" class="text-sm font-semibold text-charcoal underline decoration-line underline-offset-4 hover:decoration-tomato">
          See full menu
        </a>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="(bucket, i) in buckets"
          :key="bucket.id"
          class="flex flex-col justify-between rounded-2xl border border-line p-7"
          :class="i === 1 ? 'bg-charcoal text-cream' : 'bg-cream text-charcoal'"
        >
          <div>
            <h3 class="font-display text-2xl font-extrabold">{{ bucket.name }}</h3>
            <p class="mt-3 text-sm leading-relaxed" :class="i === 1 ? 'text-cream/75' : 'text-stone'">
              {{ bucket.description }}
            </p>
          </div>
          <div class="mt-8 flex items-center justify-between border-t pt-5" :class="i === 1 ? 'border-cream/15' : 'border-line'">
            <span class="font-display text-xl font-extrabold">${{ bucket.price.toFixed(2) }}</span>
            <a
              href="#order"
              class="rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              :class="i === 1 ? 'bg-butter text-charcoal' : 'bg-charcoal text-cream'"
            >
              Order
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
