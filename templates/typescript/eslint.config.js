import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import stylistic from '@stylistic/eslint-plugin';
import js from '@eslint/js';
import globals from 'globals';

/** @type { import('eslint').Linter.FlatConfig[] } */
export default [
  js.configs.recommended,
  reactRecommended,
  reactRuntime,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/jsx-closing-tag-location': ['error'],
      '@stylistic/jsx-curly-brace-presence': ['error', 'never'],
      '@stylistic/jsx-curly-spacing': ['error'],
      '@stylistic/jsx-equals-spacing': ['error'],
      '@stylistic/jsx-indent': ['error', 2],
      '@stylistic/jsx-indent-props': ['error', 2],
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 3 }],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'literal' }],
      '@stylistic/jsx-pascal-case': ['error'],
      '@stylistic/jsx-props-no-multi-spaces': ['error'],
      '@stylistic/jsx-self-closing-comp': ['error'],
      '@stylistic/jsx-sort-props': ['error', {
        callbacksLast: true,
      }],
      '@stylistic/jsx-tag-spacing': ['error', {
        beforeClosing: 'never',
      }],
      '@stylistic/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
        propertyValue: 'parens',
      }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
