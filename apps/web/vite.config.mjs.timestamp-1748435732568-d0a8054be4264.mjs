// vite.config.mjs
import tailwindcss from "file:///Users/dan/IdeaProjects/Games/untitled/node_modules/.pnpm/@tailwindcss+vite@4.1.7_vite@5.4.19_@types+node@20.17.50_lightningcss@1.30.1_/node_modules/@tailwindcss/vite/dist/index.mjs";
import react from "file:///Users/dan/IdeaProjects/Games/untitled/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@5.4.19_@types+node@20.17.50_lightningcss@1.30.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "file:///Users/dan/IdeaProjects/Games/untitled/node_modules/.pnpm/vite@5.4.19_@types+node@20.17.50_lightningcss@1.30.1/node_modules/vite/dist/node/index.js";
import Pages from "file:///Users/dan/IdeaProjects/Games/untitled/node_modules/.pnpm/vite-plugin-pages@0.33.0_vite@5.4.19_@types+node@20.17.50_lightningcss@1.30.1_/node_modules/vite-plugin-pages/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/dan/IdeaProjects/Games/untitled/apps/web/vite.config.mjs";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss(), Pages()],
  resolve: {
    alias: [
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser"
      },
      {
        find: "@workspace/ui",
        replacement: path.resolve(__dirname, "../../packages/ui/src")
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src")
      }
    ]
  },
  server: {
    port: 3e3
  },
  optimizeDeps: {
    include: ["pixi.js"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2Rhbi9JZGVhUHJvamVjdHMvR2FtZXMvdW50aXRsZWQvYXBwcy93ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kYW4vSWRlYVByb2plY3RzL0dhbWVzL3VudGl0bGVkL2FwcHMvd2ViL3ZpdGUuY29uZmlnLm1qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGFuL0lkZWFQcm9qZWN0cy9HYW1lcy91bnRpdGxlZC9hcHBzL3dlYi92aXRlLmNvbmZpZy5tanNcIjtpbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgcGF0aCwgeyBkaXJuYW1lIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwidXJsXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IFBhZ2VzIGZyb20gXCJ2aXRlLXBsdWdpbi1wYWdlc1wiO1xuXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xuY29uc3QgX19kaXJuYW1lID0gZGlybmFtZShfX2ZpbGVuYW1lKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICBwbHVnaW5zOiBbcmVhY3QoKSwgdGFpbHdpbmRjc3MoKSwgUGFnZXMoKV0sXG4gICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW1xuICAgICAgICAge1xuICAgICAgICAgICAgZmluZDogXCIuL3J1bnRpbWVDb25maWdcIixcbiAgICAgICAgICAgIHJlcGxhY2VtZW50OiBcIi4vcnVudGltZUNvbmZpZy5icm93c2VyXCIsXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgZmluZDogXCJAd29ya3NwYWNlL3VpXCIsXG4gICAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9wYWNrYWdlcy91aS9zcmNcIiksXG4gICAgICAgICB9LFxuICAgICAgICAge1xuICAgICAgICAgICAgZmluZDogXCJAXCIsXG4gICAgICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgICAgIH0sXG4gICAgICBdLFxuICAgfSxcbiAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogMzAwMCxcbiAgIH0sXG4gICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcInBpeGkuanNcIl0sXG4gICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlVLE9BQU8saUJBQWlCO0FBQ3pWLE9BQU8sV0FBVztBQUdsQixPQUFPLFFBQVEsZUFBZTtBQUM5QixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFQcUwsSUFBTSwyQ0FBMkM7QUFTeFAsSUFBTSxhQUFhLGNBQWMsd0NBQWU7QUFDaEQsSUFBTSxZQUFZLFFBQVEsVUFBVTtBQUdwQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN6QixTQUFTLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxNQUFNLENBQUM7QUFBQSxFQUN6QyxTQUFTO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDSjtBQUFBLFFBQ0csTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2hCO0FBQUEsTUFDQTtBQUFBLFFBQ0csTUFBTTtBQUFBLFFBQ04sYUFBYSxLQUFLLFFBQVEsV0FBVyx1QkFBdUI7QUFBQSxNQUMvRDtBQUFBLE1BQ0E7QUFBQSxRQUNHLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxRQUFRLFdBQVcsT0FBTztBQUFBLE1BQy9DO0FBQUEsSUFDSDtBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNMLE1BQU07QUFBQSxFQUNUO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWCxTQUFTLENBQUMsU0FBUztBQUFBLEVBQ3RCO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
