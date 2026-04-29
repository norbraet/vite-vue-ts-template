import { type Page, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

export async function checkA11y(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
  const violations = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious'
  )

  expect(violations).toEqual([])
}
