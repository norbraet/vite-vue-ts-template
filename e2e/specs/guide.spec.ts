import { test, expect } from '../index'

test.describe('Guide page', () => {
  test('guide heading is visible', async ({ guidePage }) => {
    await expect(guidePage.heading).toBeVisible()
  })

  test('architecture section is visible', async ({ guidePage }) => {
    await expect(guidePage.architectureSection).toBeVisible()
  })

  test('scripts section is visible', async ({ guidePage }) => {
    await expect(guidePage.scriptSection).toBeVisible()
  })

  test('page URL is /guide', async ({ guidePage }) => {
    await expect(guidePage.page).toHaveURL('/guide')
  })
})
