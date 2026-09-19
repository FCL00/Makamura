<template>
  <div
    ref="loader"
    class="fixed inset-0 z-9999 flex items-center justify-center bg-cream"
  >
    <div class="w-full max-w-xs px-6 text-center">
      <div
        ref="logo"
        class="text-4xl font-bold tracking-tight text-charcoal"
      >
        Maka<span class="text-tomato">Mura</span>
      </div>

      <div class="mt-8 h-px w-full overflow-hidden bg-charcoal/10">
        <div
          ref="progress"
          class="h-full origin-left bg-tomato"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { $gsap } = useNuxtApp();

const emit = defineEmits<{
  complete: [];
}>();

const loader = ref<HTMLElement | null>(null);
const logo = ref<HTMLElement | null>(null);
const progress = ref<HTMLElement | null>(null);

onMounted(() => {
  const tl = $gsap.timeline({
    onComplete: () => {
      emit("complete");
    },
  });

  tl.fromTo(
    logo.value,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    },
  );

  tl.fromTo(
    progress.value,
    {
      scaleX: 0,
    },
    {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.inOut",
    },
    "-=0.2",
  );

  tl.to(loader.value, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
});
</script>
