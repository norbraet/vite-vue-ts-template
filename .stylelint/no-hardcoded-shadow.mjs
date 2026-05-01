import stylelint from 'stylelint'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'plugin/no-hardcoded-shadow'

const messages = ruleMessages(ruleName, {
  rejected: (value) =>
    `Unexpected hardcoded box-shadow "${value}". Use a shadow token (e.g. --shadow-sm, --shadow-md) instead.`,
})

const meta = {
  url: 'https://github.com/norbraet/vite-vue-ts-template',
  fixable: false,
}

/**
 * Only enforce on shadow-related properties
 */
const SHADOW_PROPERTIES = new Set(['box-shadow', 'text-shadow'])

/**
 * If value contains anything except var(), reject it
 */
function isHardcodedShadow(value) {
  const stripped = value.replace(/var\([^()]*\)/g, '').trim()

  // If anything remains → it's hardcoded
  return stripped.length > 0
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

      if (!SHADOW_PROPERTIES.has(prop)) return

      if (isHardcodedShadow(decl.value)) {
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
