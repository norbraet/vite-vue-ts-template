/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-html',
  plugins: [
    './.stylelint/no-hardcoded-colors.mjs',
    './.stylelint/no-hardcoded-motion.mjs',
    './.stylelint/no-hardcoded-shadow.mjs',
    './.stylelint/no-hardcoded-borders.mjs',
    './.stylelint/no-hardcoded-z-index.mjs',
    './.stylelint/no-hardcoded-typography.mjs',
    './.stylelint/no-hardcoded-spacing.mjs',
    './.stylelint/no-primitive-tokens.mjs',
    './.stylelint/no-undefined-tokens.mjs',
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'property-no-vendor-prefix': null,
    'media-feature-range-notation': 'prefix',
    'plugin/no-hardcoded-colors': true,
    'plugin/no-hardcoded-motion': true,
    'plugin/no-hardcoded-shadow': true,
    'plugin/no-hardcoded-border': true,
    'plugin/no-hardcoded-z-index': true,
    'plugin/no-hardcoded-typography': true,
    'plugin/no-hardcoded-spacing': true,
    'plugin/no-primitive-tokens': true,
    'plugin/no-undefined-tokens': [true, { tokenDirs: ['./src/app/styles'] }],
  },
}
