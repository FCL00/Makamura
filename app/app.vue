<template>
  <AppLoader v-if="showLoader" @complete="handleLoaderComplete" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const showLoader = ref(true);

const handleLoaderComplete = () => {
  showLoader.value = false;
};
</script>
