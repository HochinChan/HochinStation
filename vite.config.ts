import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      eslintrc: { enabled: true },
      dts: "types/auto-import.d.ts",
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "pinia"],
    }),
    Components({
      dirs: ["src/components"],
      dts: "types/components.d.ts",
      resolvers: [ElementPlusResolver({ importStyle: false })],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      pages: fileURLToPath(new URL("./src/pages", import.meta.url)),
    },
  },
  server: {
    port: 5555,
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import url('@/assets/styles/global.less');`,
      },
    },
  },
});
