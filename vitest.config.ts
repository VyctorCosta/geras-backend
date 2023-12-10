import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {},
  resolve: {
    alias: [
      {
        find: "@middlewares",
        replacement: path.resolve(__dirname, "src/middlewares"),
      },
      {
        find: "@repositories",
        replacement: path.resolve(__dirname, "src/repositories"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
    ],
  },
});
