import stylelint from 'stylelint'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'plugin/no-hardcoded-border'

const messages = ruleMessages(ruleName, {
  rejectedLength: (value) =>
    `Unexpected hardcoded border size "${value}". Use a spacing or border-width token instead.`,
  rejectedColor: (value) =>
    `Unexpected hardcoded border color "${value}". Use a semantic color token instead (e.g. --color-border).`,
})

const meta = {
  url: 'https://github.com/norbraet/vite-vue-ts-template',
  fixable: false,
}

/**
 * Border-related properties
 */
const BORDER_PROPERTIES = new Set([
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-color',
  'border-width',
  'border-style',
])

/**
 * Lengths (border widths)
 */
const LENGTH_RE = /-?\d+(?:\.\d+)?(?:px|rem|em)\b/

/**
 * Colors
 */
const COLOR_RE =
  /(#(?:[0-9a-fA-F]{3}){1,2}\b)|(\brgba?\([^)]*\))|(\bhsl[a]?\([^)]*\))|(\b[a-zA-Z]+\b)/g

const SAFE_COLOR_KEYWORDS = new Set([
  'inherit',
  'initial',
  'unset',
  'transparent',
  'currentcolor',
  'none',
  // Border style keywords — style values, not colors
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
  'hidden',
])

/**
 * Strip CSS variables so tokens are ignored
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
 * Extract unsafe colors
 */
function extractColors(value) {
  const cleaned = stripVarCalls(value)
  const matches = cleaned.match(COLOR_RE) || []
  return matches.filter((v) => !SAFE_COLOR_KEYWORDS.has(v.toLowerCase()))
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
      if (!BORDER_PROPERTIES.has(prop)) return

      const cleaned = stripVarCalls(decl.value)

      /**
       * 1. Block raw border widths
       */
      if (LENGTH_RE.test(cleaned)) {
        report({
          result,
          ruleName,
          message: messages.rejectedLength(decl.value),
          node: decl,
          word: decl.value,
        })
        return
      }

      /**
       * 2. Block raw colors
       */
      const colors = extractColors(decl.value)

      for (const color of colors) {
        report({
          result,
          ruleName,
          message: messages.rejectedColor(color),
          node: decl,
          word: color,
        })
      }
    })
  }
}

ruleFunction.ruleName = ruleName
ruleFunction.messages = messages
ruleFunction.meta = meta

export default createPlugin(ruleName, ruleFunction)
