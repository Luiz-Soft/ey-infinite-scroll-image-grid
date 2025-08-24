import { defineConfig } from "cypress";
import path from "node:path";

export default defineConfig({
  e2e: {
    supportFile: false, 
    baseUrl: "http://localhost:5173",
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
      viteConfig: {
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
      },
    },
  },
});
