import stylelint from 'stylelint'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'plugin/no-hardcoded-spacing'

const messages = ruleMessages(ruleName, {
  rejected: (prop, value) =>
    `Unexpected hardcoded spacing in "${prop}: ${value}". ` +
    `Use a spacing token instead (e.g. --space-* or semantic layout tokens).`,
})

const meta = {
  url: 'https://github.com/norbraet/vite-vue-ts-template/tree/main/.stylelint/no-hardcoded-spacing.mjs',
  fixable: false,
}

/**
 * Properties related to layout spacing
 */
const SPACING_PROPERTIES = new Set([
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-block',
  'margin-block-start',
  'margin-block-end',
  'margin-inline',
  'margin-inline-start',
  'margin-inline-end',

  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-block',
  'padding-block-start',
  'padding-block-end',
  'padding-inline',
  'padding-inline-start',
  'padding-inline-end',

  'gap',
  'row-gap',
  'column-gap',

  'inset',
  'inset-block',
  'inset-block-start',
  'inset-block-end',
  'inset-inline',
  'inset-inline-start',
  'inset-inline-end',

  'top',
  'right',
  'bottom',
  'left',
])

/**
 * Allowed keyword values that should not be flagged
 */
const ALLOWED_KEYWORDS = new Set(['auto', 'inherit', 'initial', 'unset'])

/**
 * Strip var() calls to reveal raw values
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
 * Match length units (expanded)
 */
const LENGTH_RE = /\b-?\d+(?:\.\d+)?(?:px|rem|em|%|vw|vh|vmin|vmax)\b/

/**
 * Check if value contains disallowed spacing
 */
function hasHardcodedSpacing(value) {
  // Split by whitespace to handle multi-value declarations
  const parts = value.split(/\s+/)

  return parts.some((part) => {
    if (ALLOWED_KEYWORDS.has(part)) return false
    return LENGTH_RE.test(part)
  })
}

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

      if (!SPACING_PROPERTIES.has(prop)) return

      const stripped = stripVarCalls(decl.value)

      if (hasHardcodedSpacing(stripped)) {
        report({
          result,
          ruleName,
          message: messages.rejected(prop, decl.value),
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
