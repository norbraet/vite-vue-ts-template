import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-config-prettier'
import boundaries from 'eslint-plugin-boundaries'
import globals from 'globals'

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.vite/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      boundaries: boundaries,
    },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'shared',
          pattern: ['src/shared/**/*'],
        },
        {
          mode: 'full',
          type: 'features',
          capture: ['featureName'],
          pattern: ['src/features/*/**/*'],
        },
        {
          mode: 'full',
          type: 'pages',
          pattern: ['src/pages/**/*'],
        },
        {
          mode: 'full',
          type: 'app',
          pattern: ['src/app/**/*'],
        },
        {
          mode: 'full',
          type: 'neverImport',
          pattern: ['src/*', 'src/assets/**/*'],
        },
      ],
    },
    rules: {
      ...typescript.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',

      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['error'],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['shared'],
              allow: ['shared'],
            },
            {
              from: ['features'],
              allow: ['shared', ['features', { featureName: '${from.featureName}' }]],
            },
            {
              from: ['pages'],
              allow: ['shared', 'features'],
            },
            {
              from: ['app'],
              allow: ['shared', 'features', 'pages', 'app'],
            },
          ],
        },
      ],
    },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      boundaries: boundaries,
    },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'shared',
          pattern: ['src/shared/**/*'],
        },
        {
          mode: 'full',
          type: 'features',
          capture: ['featureName'],
          pattern: ['src/features/*/**/*'],
        },
        {
          mode: 'full',
          type: 'pages',
          pattern: ['src/pages/**/*'],
        },
        {
          mode: 'full',
          type: 'app',
          pattern: ['src/app/**/*'],
        },
        {
          mode: 'full',
          type: 'neverImport',
          pattern: ['src/*', 'src/assets/**/*'],
        },
      ],
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',

      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['error'],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['shared'],
              allow: ['shared'],
            },
            {
              from: ['features'],
              allow: ['shared', ['features', { featureName: '${from.featureName}' }]],
            },
            {
              from: ['pages'],
              allow: ['shared', 'features'],
            },
            {
              from: ['app'],
              allow: ['shared', 'features', 'pages', 'app'],
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/app/main.ts'],
    rules: {
      'boundaries/no-unknown': 'off',
    },
  },

  {
    files: ['**/*.{test,spec}.{ts,tsx,vue}', 'src/test/**/*.ts'],
    rules: {
      'boundaries/element-types': 'off',
      'boundaries/no-unknown': 'off',
      'boundaries/no-unknown-files': 'off',
    },
  },

  prettier,
]
