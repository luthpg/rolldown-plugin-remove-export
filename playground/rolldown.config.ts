import { defineConfig } from 'rolldown';
import { removeExportPlugin } from 'rolldown-plugin-remove-export';

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: 'dist/out.js',
  },
  plugins: [removeExportPlugin("out.js")],
});
