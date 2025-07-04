import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss(), Pages()],
   resolve: {
      alias: [
         {
            find: "./runtimeConfig",
            replacement: "./runtimeConfig.browser",
         },
         {
            find: "@workspace/ui",
            replacement: path.resolve(__dirname, "../../packages/ui/src"),
         },
         {
            find: "@",
            replacement: path.resolve(__dirname, "./src"),
         },
      ],
   },
   server: {
      port: 3000,
   },
   optimizeDeps: {
      include: ["pixi.js"],
   },
});
