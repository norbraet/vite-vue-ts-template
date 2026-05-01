import stylelint from 'stylelint'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'plugin/no-hardcoded-motion'

const messages = ruleMessages(ruleName, {
  rejectedDuration: (prop, value) =>
    `Unexpected hardcoded duration in "${prop}: ${value}". ` +
    `Use a motion token instead (e.g. --motion-duration-*, --motion-*).`,

  rejectedEasing: (prop, value) =>
    `Unexpected hardcoded easing in "${prop}: ${value}". ` +
    `Use a motion easing token instead (e.g. --motion-ease-*).`,
})

const meta = {
  url: 'https://github.com/norbraet/vite-vue-ts-template/tree/main/.stylelint/no-hardcoded-motion.js',
  fixable: false,
}

/**
 * Properties that can contain motion values
 */
const MOTION_PROPERTIES = new Set([
  'transition',
  'transition-duration',
  'transition-delay',
  'animation',
  'animation-duration',
  'animation-delay',
])

/**
 * Strip all var() calls to expose raw values
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
 * Match time values (ms / s)
 */
const TIME_VALUE_RE = /\b\d+(?:\.\d+)?(?:ms|s)\b/g

/**
 * Match easing functions / keywords
 */
const EASING_RE = /\b(linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier|steps)\b/

/**
 * Check if any duration is non-zero
 */
function hasNonZeroDuration(value) {
  const matches = value.match(TIME_VALUE_RE)
  if (!matches) return false

  return matches.some((m) => parseFloat(m) !== 0)
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

      if (!MOTION_PROPERTIES.has(prop)) return

      const stripped = stripVarCalls(decl.value)

      // 🚫 Hardcoded duration (except 0)
      if (hasNonZeroDuration(stripped)) {
        report({
          result,
          ruleName,
          message: messages.rejectedDuration(prop, decl.value),
          node: decl,
          word: decl.value,
        })
      }

      // 🚫 Hardcoded easing
      if (EASING_RE.test(stripped)) {
        report({
          result,
          ruleName,
          message: messages.rejectedEasing(prop, decl.value),
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
