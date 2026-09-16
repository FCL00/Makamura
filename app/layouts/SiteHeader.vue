<script setup>
import ActionBar from '~/components/App/ActionBar.vue';
const isOpen = ref(false)

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Flavors', href: '#flavors' },
  { label: 'Story', href: '#story' },
  { label: 'Reviews', href: '#reviews' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
    <!-- <ActionBar/> -->
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <NuxtLink href="#top" class="font-display text-xl font-extrabold tracking-tight text-charcoal">
        Maka<span class="text-tomato">Mura</span>
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-[0.95rem] font-medium text-stone transition-colors hover:text-charcoal"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="hidden md:block">
        <NuxtLink
          href="#order"
          class="rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
        >
          Orders
        </NuxtLink>
      </div>

      <button
        class="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
        :aria-expanded="isOpen"
        aria-label="Toggle menu"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">Toggle menu</span>
        <svg v-if="!isOpen" width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M0 1h18M0 7h18M0 13h18" stroke="#25221F" stroke-width="1.5" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 1l14 14M15 1L1 15" stroke="#25221F" stroke-width="1.5" />
        </svg>
      </button>
    </div>

    <div v-if="isOpen" class="border-t border-line px-6 py-4 md:hidden">
      <nav class="flex flex-col gap-4">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-base font-medium text-charcoal"
          @click="isOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          href="#order"
          class="mt-2 rounded-full bg-charcoal px-5 py-2.5 text-center text-sm font-semibold text-cream"
          @click="isOpen = false"
        >
          Orders
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
