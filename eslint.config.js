import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      semi: ['error', 'never'],
      quotes: [2, 'single', { avoidEscape: true }],
      'max-len': ['error', { ignoreComments: true, ignoreStrings: true, ignoreRegExpLiterals: true, code: 120 }],
      'class-methods-use-this': 'off',
      '@/semi': ['error', 'never'],
      'object-curly-newline': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'implicit-arrow-linebreak': 'off',
    }
  },
])
