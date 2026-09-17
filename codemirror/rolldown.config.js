import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts'

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig([
  {
    input: "index.ts",
    external: [
      '@codemirror/language',
      '@codemirror/state',
      '@codemirror/view',
      '@lezer/highlight',
    ],
    plugins: [dts()],
    platform: "browser",
    output: {
      dir: 'dist',
      format: 'esm',
      minify: isProduction,
      entryFileNames: ({ name, isEntry }) => {
        return name.replace("index", "themes-codemirror") + (isEntry ? ".js": ".ts")
      }
    }
  }
]);
