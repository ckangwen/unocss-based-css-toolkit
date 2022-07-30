import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Inspect from "vite-plugin-inspect";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "@unocss/vite";
import MyUnoUi from "my-unocss-preset-ui";

export default defineConfig({
  base: "./",
  plugins: [
    Vue(),
    Unocss({
      presets: [MyUnoUi()],
    }),
    Inspect(),
    Components({
      dirs: ["./src/components"],
      dts: "./src/components.d.ts",
    }),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
    }),
  ],
  optimizeDeps: {
    exclude: [
      "@iconify/utils/lib/loader/fs",
      "@iconify/utils/lib/loader/install-pkg",
      "@iconify/utils/lib/loader/node-loader",
      "@iconify/utils/lib/loader/node-loaders",
    ],
  },
  build: {
    outDir: "../interactive/public/play",
    emptyOutDir: true,
    rollupOptions: {
      external: [
        "@iconify/utils/lib/loader/fs",
        "@iconify/utils/lib/loader/install-pkg",
        "@iconify/utils/lib/loader/node-loader",
        "@iconify/utils/lib/loader/node-loaders",
      ],
      input: ["./index.html", "./__play.html"],
    },
  },
});
