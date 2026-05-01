import stylelint from 'stylelint'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'plugin/no-hardcoded-z-index'

const messages = ruleMessages(ruleName, {
  rejected: (value) =>
    `Unexpected hardcoded z-index "${value}". Use a semantic z-index token (e.g. --z-modal, --z-dropdown) instead.`,
})

const meta = {
  url: 'https://github.com/norbraet/vite-vue-ts-template',
  fixable: false,
}

/**
 * Only enforce z-index property
 */
const Z_INDEX_PROPERTY = 'z-index'

/**
 * Checks if value is a valid token reference
 */
function isToken(value) {
  return /^\s*var\(--z-[a-z0-9-]+\)\s*$/i.test(value)
}

/**
 * Reject anything that is NOT a token
 */
function isHardcoded(value) {
  const cleaned = value.replace(/var\([^()]*\)/g, '').trim()

  // If anything remains → it's a raw value
  if (cleaned.length > 0) return true

  // If it's var() but not a z-token → reject
  if (!isToken(value)) return true

  return false
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
      if (decl.prop.toLowerCase() !== Z_INDEX_PROPERTY) return

      if (isHardcoded(decl.value)) {
        report({
          result,
          ruleName,
          message: messages.rejected(decl.value),
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
