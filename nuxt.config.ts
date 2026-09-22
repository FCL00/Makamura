// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },
  imports: {
    dirs: ["./app/constants", "./app/data", "./app/types", "./app/stores"],
  },
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxt/eslint", "@nuxt/image", "nuxt-lucide-icons", "@pinia/nuxt"],

  lucide: {
    namePrefix: 'Icon'
  },

  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: true,
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

   vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('swiper-'),
    },
  },
});