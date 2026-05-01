import stylelint from 'stylelint'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'plugin/no-primitive-tokens'

const messages = ruleMessages(ruleName, {
  rejected: (varName) =>
    `Unexpected use of primitive token "${varName}". ` +
    `Use a semantic token instead (e.g. --color-*, --text-*, --space-*, --motion-*).`,
})

const meta = {
  url: 'https://github.com/norbraet/vite-vue-ts-template/tree/main/.stylelint/no-primitive-tokens.mjs',
  fixable: false,
}

/**
 * Primitive tokens that should NOT be used in components.
 *
 * Use specific palette prefixes rather than --color- so that semantic tokens
 * (--color-text, --color-primary, --color-border, etc.) are not blocked.
 *
 * Use specific font/motion prefixes that don't overlap with semantic ones
 * (semantic typography uses --text-*, semantic motion uses --motion-fast/normal/emphasized).
 */
const BLOCKED_PREFIXES = [
  // Raw palette color scales
  '--color-neutral-',
  '--color-blue-',
  '--color-purple-',
  '--color-green-',
  '--color-red-',
  '--color-orange-',
  '--color-yellow-',
  '--color-pink-',
  // Raw typography scale (semantic tokens use --text-* instead)
  '--font-size-',
  '--font-weight-',
  '--font-family-',
  '--line-height-',
  '--letter-spacing-',
  // Raw motion duration scale (semantic tokens are --motion-fast/normal/emphasized)
  '--motion-duration-',
]

/**
 * Primitive spacing tokens have a numeric suffix: --space-0, --space-4, --space-12, etc.
 * Semantic spacing tokens have named suffixes: --space-page, --space-section, --space-component-*.
 */
const SPACE_SCALE_RE = /^--space-\d+$/

/**
 * Primitive motion easing functions.
 * Blocked explicitly because they share the --motion-ease- prefix with semantic tokens
 * (--motion-ease-standard, --motion-ease-enter, --motion-ease-exit).
 */
const BLOCKED_EXACT = new Set([
  '--motion-ease-linear',
  '--motion-ease-in',
  '--motion-ease-out',
  '--motion-ease-in-out',
  '--motion-ease-emphasized',
])

/**
 * Files where primitive usage is allowed
 */
function isAllowedFile(filePath) {
  if (!filePath) return false

  return (
    filePath.includes('primitives') || filePath.includes('semantics') || filePath.includes('themes')
  )
}

/**
 * Check if variable is a primitive token
 */
function isPrimitive(varName) {
  if (BLOCKED_EXACT.has(varName)) return true
  if (SPACE_SCALE_RE.test(varName)) return true
  return BLOCKED_PREFIXES.some((prefix) => varName.startsWith(prefix))
}

/**
 * Extract all CSS variables used in var() calls
 */
function extractVarNames(value) {
  const matches = value.match(/var\(\s*(--[^,\s)]+)/g) || []
  return matches.map((m) => m.match(/--[^,\s)]+/)[0])
}

/** @type {import('stylelint').Rule} */
const ruleFunction = (primary) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    })

    if (!validOptions) return

    const filePath = root.source?.input.file || ''

    // Allow primitives in token definition layers
    if (isAllowedFile(filePath)) return

    root.walkDecls((decl) => {
      const varNames = extractVarNames(decl.value)

      for (const varName of varNames) {
        if (isPrimitive(varName)) {
          report({
            result,
            ruleName,
            message: messages.rejected(varName),
            node: decl,
            word: varName,
          })
        }
      }
    })
  }
}

ruleFunction.ruleName = ruleName
ruleFunction.messages = messages
ruleFunction.meta = meta

export default createPlugin(ruleName, ruleFunction)
