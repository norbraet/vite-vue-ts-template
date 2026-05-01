import stylelint from 'stylelint'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'plugin/no-hardcoded-typography'

const messages = ruleMessages(ruleName, {
  rejectedSize: (prop, value) =>
    `Unexpected hardcoded font-size in "${prop}: ${value}". Use a typography token (e.g. --text-*).`,

  rejectedWeight: (prop, value) =>
    `Unexpected hardcoded font-weight in "${prop}: ${value}". Use a typography token (e.g. --font-weight-*).`,

  rejectedLineHeight: (prop, value) =>
    `Unexpected hardcoded line-height in "${prop}: ${value}". Use a typography token.`,

  rejectedLetterSpacing: (prop, value) =>
    `Unexpected hardcoded letter-spacing in "${prop}: ${value}". Use a typography token.`,

  rejectedFontShorthand: (prop, value) =>
    `Unexpected hardcoded font shorthand in "${prop}: ${value}". Use typography tokens instead.`,
})

const meta = {
  url: 'https://github.com/norbraet/vite-vue-ts-template/tree/main/.stylelint/no-hardcoded-typography.mjs',
  fixable: false,
}

/**
 * Strip all var() calls so we only analyze raw values
 */
function stripVarCalls(value) {
  let prev
  let v = value

  do {
    prev = v
    v = v.replace(/var\([^()]*\)/g, '')
  } while (v !== prev)

  return v
}

/**
 * Detect numeric font sizes (px/rem/em)
 */
const FONT_SIZE_RE = /\b-?\d+(?:\.\d+)?(?:px|rem|em)\b/

/**
 * Detect numeric font weights (100–900)
 */
const FONT_WEIGHT_RE = /\b(100|200|300|400|500|600|700|800|900)\b/

/**
 * Detect line-height values (unitless or unit-based)
 */
const LINE_HEIGHT_RE = /\b\d+(?:\.\d+)?(?:px|rem|em)?\b/

/**
 * Detect letter-spacing values
 */
const LETTER_SPACING_RE = /\b-?\d+(?:\.\d+)?(?:px|rem|em)\b/

/**
 * Detect unsafe font shorthand usage
 * (anything that isn't fully token-based)
 */
const FONT_SHORTHAND_RE = /\b\d+(?:\.\d+)?(?:px|rem|em)\b|\b(100|200|300|400|500|600|700|800|900)\b/

/** @type {import('stylelint').Rule} */
const ruleFunction = (primary) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    })

    if (!validOptions) return

    root.walkDecls((decl) => {
      const prop = decl.prop.toLowerCase()
      const stripped = stripVarCalls(decl.value)

      // font-size
      if (prop === 'font-size' && FONT_SIZE_RE.test(stripped)) {
        report({
          result,
          ruleName,
          message: messages.rejectedSize(prop, decl.value),
          node: decl,
          word: decl.value,
        })
      }

      // font-weight
      if (prop === 'font-weight' && FONT_WEIGHT_RE.test(stripped)) {
        report({
          result,
          ruleName,
          message: messages.rejectedWeight(prop, decl.value),
          node: decl,
          word: decl.value,
        })
      }

      // line-height
      if (prop === 'line-height' && LINE_HEIGHT_RE.test(stripped)) {
        report({
          result,
          ruleName,
          message: messages.rejectedLineHeight(prop, decl.value),
          node: decl,
          word: decl.value,
        })
      }

      // letter-spacing
      if (prop === 'letter-spacing' && LETTER_SPACING_RE.test(stripped)) {
        report({
          result,
          ruleName,
          message: messages.rejectedLetterSpacing(prop, decl.value),
          node: decl,
          word: decl.value,
        })
      }

      // font shorthand (strict)
      if (prop === 'font' && FONT_SHORTHAND_RE.test(stripped)) {
        report({
          result,
          ruleName,
          message: messages.rejectedFontShorthand(prop, decl.value),
          node: decl,
          word: decl.value,
        })
      }
    })
  }
}

ruleFunction.ruleName = ruleName
ruleFunction.messages = messages
ruleFunction.meta = meta

export default createPlugin(ruleName, ruleFunction)
