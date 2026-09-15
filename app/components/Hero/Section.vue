<script setup>
const stats = [
  { value: "12", label: "wing flavors" },
  { value: "4", label: "heat levels" },
  { value: "15 min", label: "avg. wait" },
];
</script>

<template>
  <section id="top" class="relative overflow-hidden border-b border-line">
    <div
      class="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-14 md:grid-cols-12 md:pb-24 md:pt-20"
    >
      <!-- Copy -->
      <div class="md:col-span-7 md:pr-6">
        <p
          class="mb-5 text-center md:text-start text-sm font-semibold uppercase tracking-[0.12em]"
        >
          Fried fresh · Sauced to order
        </p>

        <h1 class="display-heading text-charcoal">
          Hot.
          <br />
          Honey.
          <br />
          <span class="text-tomato">Heaven.</span>
        </h1>

        <p
          class="mt-6 text-center md:max-w-md md:text-start text-lg leading-relaxed text-stone"
        >
          Twelve house-made wing flavors, from whipped honey butter to
          ghost-pepper-hot. Order by the wing, the bucket, or the crew-sized
          feast.
        </p>

        <div
          class="mt-9 flex flex-wrap justify-center md:justify-start items-center gap-4"
        >
          <a
            href="#order"
            class="rounded-full bg-tomato px-7 py-3.5 font-semibold text-cream shadow-[0_8px_20px_-6px_rgba(201,76,61,0.55)] transition-transform hover:-translate-y-0.5"
          >
            Order now
          </a>
          <a
            href="#menu"
            class="rounded-full border border-charcoal/15 px-7 py-3.5 font-semibold text-charcoal transition-colors hover:border-charcoal/40"
          >
            View the menu
          </a>
        </div>
      </div>
      
      <div class="relative md:col-span-5">
        <div class="flex items-center mx-auto aspect-4/5 max-w-sm">
          <div class="relative">
            <NuxtImg
              class="object-cover border rounded-2xl border-butter"
              src="/images/menu/honey-butter.png"
            />
            <div
              class="absolute w-full bottom-0 left-0 md:bottom-2 md:left-2 md:max-w-xs bg-butter/40 backdrop-blur-md border border-butter/20 p-3 rounded-sm shadow-lg"
            >
              <p class="text-charcoal font-bold text-xs md:text-base leading-none">
                Honey Butter
              </p>
              <p class="text-charcoal/80 text-xs mt-1">
                Crispy, golden wings tossed in a sweet & savory glaze.
              </p>
            </div>
            <div
              class="absolute -top-6 -right-6 flex h-24 w-24 rotate-[-8deg] items-center justify-center rounded-full border-2 border-charcoal bg-butter text-center font-display text-xs font-extrabold uppercase leading-tight text-charcoal shadow-sm"
            >
              Made to order
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
