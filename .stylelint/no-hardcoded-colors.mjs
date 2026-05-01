import stylelint from 'stylelint'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'plugin/no-hardcoded-colors'

const messages = ruleMessages(ruleName, {
  rejected: (value) =>
    `Unexpected hardcoded color "${value}". Use a semantic color token (e.g. --color-text-primary, --color-bg-primary).`,
})

const meta = {
  url: 'https://github.com/norbraet/vite-vue-ts-template',
  fixable: false,
}

/**
 * Only enforce color rules on color-related properties
 */
const COLOR_PROPERTIES = new Set([
  'color',
  'background',
  'background-color',
  'border',
  'border-color',
  'outline',
  'fill',
  'stroke',
])

/**
 * Detect raw colors:
 * - hex (#fff, #ffffff)
 * - rgb/rgba
 * - hsl/hsla
 * - named colors (simple heuristic)
 */
const COLOR_RE =
  /(#(?:[0-9a-fA-F]{3}){1,2}\b)|(\brgba?\([^)]*\))|(\bhsl[a]?\([^)]*\))|(\b[a-zA-Z]+\b)/g

/**
 * Remove CSS variables so we don't flag valid token usage
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
 * Filter out known safe keywords (CSS keywords that are NOT colors)
 */
const SAFE_KEYWORDS = new Set([
  'inherit',
  'initial',
  'unset',
  'transparent',
  'currentcolor',
  'none',
  // CSS gradient function keywords
  'linear',
  'radial',
  'conic',
  'gradient',
  'to',
  'from',
  'at',
  // Border / outline style keywords
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
  'hidden',
  // Background position / size keywords
  'center',
  'top',
  'bottom',
  'left',
  'right',
  'cover',
  'contain',
  'auto',
  'repeat',
])

function extractHardcodedColors(value) {
  const cleaned = stripVarCalls(value)
  const matches = cleaned.match(COLOR_RE)
  if (!matches) return []

  return matches.filter((v) => !SAFE_KEYWORDS.has(v.toLowerCase()))
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

      if (!COLOR_PROPERTIES.has(prop)) return

      const violations = extractHardcodedColors(decl.value)

      for (const value of violations) {
        report({
          result,
          ruleName,
          message: messages.rejected(value),
          node: decl,
          word: value,
        })
      }
    })
  }
}

ruleFunction.ruleName = ruleName
ruleFunction.messages = messages
ruleFunction.meta = meta

export default createPlugin(ruleName, ruleFunction)
