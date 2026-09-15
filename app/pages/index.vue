<script setup>
import SiteHeader from '~/layouts/SiteHeader.vue';
import SiteFooter from '~/layouts/SiteFooter.vue';

useHead({
  title: 'Makamura - Fried fresh, sauced to order',
  meta: [
    {
      name: 'description',
      content:
        'Twelve house-made wing flavors, buckets built for sharing, and cold drinks to match. Order online or walk in.',
    },
  ],
})
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <HeroSection />
      <HeroMenu />
      <HeroFlavorSpotlight />
      <HeroBuckets />
      <HeroDrinks />
      <HeroStory />
      <HeroTestimonials />
      <HeroCTA />
    </main>
    <SiteFooter />
  </div>
</template>
