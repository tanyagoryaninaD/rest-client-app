import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import importSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig({
  ignores: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ],

  extends: [
    compat.extends('next/core-web-vitals'),
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
  ],

  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },

  linterOptions: {
    reportUnusedDisableDirectives: true,
  },

  plugins: {
    'react-hooks': reactHooks,
    prettier: prettierPlugin,
    'simple-import-sort': importSort,
  },

  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allow: [{ name: ['Error', 'URL', 'URLSearchParams'], from: 'lib' }],
        allowAny: true,
        allowBoolean: true,
        allowNullish: true,
        allowNumber: true,
        allowRegExp: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-debugger': 'warn',
    'no-console': 'warn',
  },
});
