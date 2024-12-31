import { defineConfig } from "rolldown";
export default defineConfig({
  input: ['src/index.ts'],
  output: {
    dir: 'dist',
    format: 'esm',
    exports: 'named',
  },
  treeshake: true,
  logLevel: 'silent',
});
