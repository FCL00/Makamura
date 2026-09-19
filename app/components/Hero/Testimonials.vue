<template>
  <section id="reviews" class="border-b border-line bg-cream">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <!-- Header -->
      <div class="flex items-end justify-between gap-6">
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

        <!-- Controls -->
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
            type="button"
            aria-label="Next review"
            class="grid size-11 place-items-center rounded-full border border-line bg-white text-charcoal transition hover:bg-charcoal hover:text-white"
            @click="nextReview"
          >
            →
          </button>
        </div>
      </div>

      <!-- Reviews -->
      <swiper-container
        ref="swiper"
        class="mt-10"
        slides-per-view="1"
        space-between="24"
        :breakpoints="{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }"
      >
        <swiper-slide v-for="review in reviews" :key="review.name">
          <figure
            class="flex min-h-64 h-full flex-col justify-between rounded-2xl border border-line bg-white p-7"
          >
            <blockquote
              class="font-display text-xl font-medium leading-snug text-charcoal"
            >
              <em>“{{ review.comment }}”</em>
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

      <!-- Mobile controls -->
      <div class="mt-6 flex gap-2 sm:hidden">
        <button
          type="button"
          aria-label="Previous review"
          class="grid size-11 place-items-center rounded-full border border-line bg-white text-charcoal"
          @click="prevReview"
        >
          ←
        </button>

        <button
          type="button"
          aria-label="Next review"
          class="grid size-11 place-items-center rounded-full border border-line bg-white text-charcoal"
          @click="nextReview"
        >
          →
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reviews } from "~/data/review";
import type { SwiperContainer } from "swiper/element";

const swiper = useTemplateRef<SwiperContainer>("swiper");

const nextReview = () => {
  swiper.value?.swiper.slideNext();
};

const prevReview = () => {
  swiper.value?.swiper.slidePrev();
};
</script>
