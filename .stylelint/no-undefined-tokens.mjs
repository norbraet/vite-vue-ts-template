import stylelint from 'stylelint'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'plugin/no-undefined-tokens'

const messages = ruleMessages(ruleName, {
  rejected: (name) =>
    `Unknown or disallowed design token "${name}" — use a semantic token instead.`,
})

const meta = {
  url: 'https://github.com/norbraet/vite-vue-ts-template/tree/main/.stylelint/no-undefined-tokens.mjs',
  fixable: false,
}

/**
 * Cache token sets per config
 */
const tokenSetCache = new Map()

/**
 * Extract tokens from var() usage (NON recursive, safe version)
 */
function extractVarTokens(value) {
  const matches = value.match(/var\(\s*(--[a-z0-9-]+)/gi) || []
  return matches.map((m) => m.match(/--[a-z0-9-]+/i)[0].toLowerCase())
}

/**
 * Scan token definition files
 */
function extractTokensFromFile(filePath, tokens) {
  try {
    const content = readFileSync(filePath, 'utf8')

    // capture CSS custom properties
    const re = /(--[a-z0-9-]+)\s*:/gi

    let match
    while ((match = re.exec(content)) !== null) {
      tokens.add(match[1].toLowerCase())
    }
  } catch {
    // ignore file errors
  }
}

/**
 * Recursively scan directories
 */
function scanDir(dir, tokens) {
  let entries

  try {
    entries = readdirSync(dir)
  } catch {
    return
  }

  for (const entry of entries) {
    const full = join(dir, entry)

    try {
      if (statSync(full).isDirectory()) {
        scanDir(full, tokens)
      } else if (entry.endsWith('.css')) {
        extractTokensFromFile(full, tokens)
      }
    } catch {
      // ignore fs errors
    }
  }
}

/**
 * Build token registry
 */
function buildTokenSet(dirs) {
  const key = dirs.join('\0')

  if (!tokenSetCache.has(key)) {
    const tokens = new Set()

    for (const dir of dirs) {
      scanDir(resolve(process.cwd(), dir), tokens)
    }

    tokenSetCache.set(key, tokens)
  }

  return tokenSetCache.get(key)
}

const DEFAULT_TOKEN_DIRS = ['./frontend/styles/tokens']

/** @type {import('stylelint').Rule} */
const ruleFunction = (primary, secondary) => {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      { actual: primary, possible: [true] },
      {
        actual: secondary,
        possible: {
          tokenDirs: [(v) => typeof v === 'string'],
        },
        optional: true,
      }
    )

    if (!validOptions) return

    const dirs = secondary?.tokenDirs
      ? Array.isArray(secondary.tokenDirs)
        ? secondary.tokenDirs
        : [secondary.tokenDirs]
      : DEFAULT_TOKEN_DIRS

    const tokenSet = buildTokenSet(dirs)

    root.walkDecls((decl) => {
      const tokens = extractVarTokens(decl.value)

      for (const token of tokens) {
        /**
         * Core rule:
         * token must exist in registry
         */
        if (!tokenSet.has(token)) {
          report({
            result,
            ruleName,
            message: messages.rejected(token),
            node: decl,
            word: token,
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
