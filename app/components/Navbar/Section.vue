<script setup lang="ts">
const isMenuOpen = ref(false);

const navItems = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Locations", href: "#locations" },
];
</script>

<template>
  <header class="relative z-50">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10"
      aria-label="Main navigation"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="group flex items-center gap-2"
        aria-label="Cluckin' Bell home"
      >
        <span
          class="flex size-9 items-center justify-center rounded-full bg-tomato text-lg"
          aria-hidden="true"
        >
          🍗
        </span>

        <span class="text-lg font-black tracking-[-0.06em] sm:text-xl">
          CLUCKIN'
          <span class="text-tomato">BELL</span>
        </span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.href"
          class="text-sm font-medium text-stone transition-colors hover:text-tomato"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- Desktop Actions -->
      <div class="hidden items-center gap-3 md:flex">
        <button
          type="button"
          class="relative flex size-10 items-center justify-center rounded-full border border-line text-charcoal transition-colors hover:border-tomato hover:text-tomato"
          aria-label="Open shopping cart"
        >
          <IconShoppingBag :size="18" stroke-width="1.8" />

          <span
            class="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-butter text-[10px] font-bold"
          >
            0
          </span>
        </button>

        <NuxtLink
          to="#menu"
          class="rounded-full bg-tomato px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-tomato/90"
        >
          Order Now
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        class="flex size-10 items-center justify-center rounded-full border border-line md:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-navigation"
        aria-label="Toggle navigation menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <IconX v-if="isMenuOpen" :size="20" />
        <IconMenu v-else :size="20" />
      </button>
    </nav>

    <!-- Mobile Navigation -->
    <div
      v-if="isMenuOpen"
      id="mobile-navigation"
      class="border-t border-line bg-cream px-5 py-5 md:hidden"
    >
      <div class="flex flex-col gap-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.label"
          :to="item.href"
          class="text-base font-medium text-stone"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>

        <div class="mt-2 flex items-center gap-3 border-t border-line pt-4">
          <button
            type="button"
            class="flex size-10 items-center justify-center rounded-full border border-line"
            aria-label="Open shopping cart"
          >
            <IconShoppingBag :size="18" />
          </button>

          <NuxtLink
            to="#menu"
            class="flex-1 rounded-full bg-tomato px-5 py-3 text-center text-sm font-bold text-white"
            @click="isMenuOpen = false"
          >
            Order Now
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
