// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  imports: {
    dirs: ["./app/constants", "./app/data", "./app/types"],
  },
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxt/eslint", "@nuxt/image", "nuxt-lucide-icons"],

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
});