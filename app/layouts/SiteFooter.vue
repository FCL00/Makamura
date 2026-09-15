<script setup>
const columns = [
  {
    title: 'Menu',
    links: ['Wings', 'Buckets', 'Sides', 'Drinks'],
  },
  {
    title: 'Visit',
    links: ['Locations', 'Hours', 'Catering'],
  },
  {
    title: 'Makamura',
    links: ['Our story', 'Careers', 'Contact'],
  },
]
</script>

<template>
  <footer class="bg-cream">
    <div class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid gap-10 md:grid-cols-12">
        <div class="md:col-span-4">
          <p class="font-display text-xl font-extrabold text-charcoal">
            Maka<span class="text-tomato">Mura</span>
          </p>
          <p class="mt-3 max-w-xs text-sm text-stone">
            Fried fresh, sauced to order. Twelve flavors, four heat levels,
            zero shortcuts.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-6 md:col-span-8">
          <div v-for="col in columns" :key="col.title">
            <p class="text-sm font-semibold text-charcoal">{{ col.title }}</p>
            <ul class="mt-4 space-y-3">
              <li v-for="link in col.links" :key="link">
                <a href="#" class="text-sm text-stone transition-colors hover:text-charcoal">
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-stone md:flex-row md:items-center md:justify-between">
        <p>© {{ new Date().getFullYear() }} Makamura. All rights reserved.</p>
        <div class="flex gap-5">
          <a href="#" class="hover:text-charcoal">Instagram</a>
          <a href="#" class="hover:text-charcoal">TikTok</a>
        </div>
      </div>
    </div>
  </footer>
</template>
