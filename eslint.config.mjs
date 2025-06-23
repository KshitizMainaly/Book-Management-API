// eslint.config.mjs
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['node_modules', 'dist', 'build', 'eslint.config.mjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.rules,
      'prettier/prettier': 'error', // Treat Prettier formatting issues as ESLint errors
    },
  },
]);
