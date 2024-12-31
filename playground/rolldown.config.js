import { defineConfig } from "rolldown";
import { claspPlugin } from "rolldown-plugin-clasp";
export default defineConfig({
  input: ["src/index.ts"],
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [claspPlugin("index.js")],
  treeshake: true,
  logLevel: "silent",
});
