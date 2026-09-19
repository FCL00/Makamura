<template>
  <section id="reviews" class="border-b border-line bg-cream">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <div class="flex items-end justify-between">
        <div>
          <p
            class="text-sm font-semibold uppercase tracking-[0.12em] text-tomato"
          >
            What people order twice
          </p>

          <h2 class="section-heading mt-3 max-w-lg text-charcoal">
            Reviews from the regulars
          </h2>
        </div>

        <div class="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous review"
            class="grid size-11 place-items-center rounded-full border border-line bg-white text-charcoal transition hover:bg-charcoal hover:text-white"
            @click="prevReview"
          >
            ←
          </button>

          <button
            class="grid size-11 place-items-center rounded-full border border-line bg-white text-charcoal transition hover:bg-charcoal hover:text-white"
            type="button"
            aria-label="Next review"
            @click="nextReview"
          >
            →
          </button>
        </div>
      </div>

      <ClientOnly>
        <swiper-container ref="swiper" class="mt-10" init="false">
          <swiper-slide v-for="review in reviews" :key="review.id">
            <figure
              class="flex min-h-64 h-full flex-col justify-between rounded-2xl border border-line bg-white p-7"
            >
              <blockquote
                class="font-display text-2xl font-medium leading-snug text-charcoal"
              >
                “{{ review.comment }}”
              </blockquote>

              <figcaption class="mt-6 border-t border-line pt-4 text-sm">
                <span class="font-semibold text-charcoal">
                  {{ review.name }}
                </span>

                <span class="block text-stone">
                  {{ review.context }}
                </span>
              </figcaption>
            </figure>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reviews } from "~/data/review";
import type { SwiperContainer } from "swiper/element";

const swiper = useTemplateRef<SwiperContainer>("swiper");

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 24,
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
};

onMounted(async () => {
  await nextTick();
  if (!swiper.value) return;
  Object.assign(swiper.value, swiperOptions);
  swiper.value.initialize();
});

const prevReview = () => {
  swiper.value?.swiper.slidePrev();
};

const nextReview = () => {
  swiper.value?.swiper.slideNext();
};
</script>
