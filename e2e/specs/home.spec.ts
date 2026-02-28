import { test, expect } from '../index'

test.describe('Home page', () => {
  test('hero heading is visible', async ({ homePage }) => {
    await expect(homePage.heroHeading).toBeVisible()
  })

  test('hero subtitle is visible', async ({ homePage }) => {
    await expect(homePage.heroSubtitle).toBeVisible()
  })

  test('"View Guide" button navigates to /guide', async ({ homePage }) => {
    await homePage.viewGuideButton.click()
    await expect(homePage.page).toHaveURL('/guide')
  })

  test('theme toggle button is visible and clickable', async ({ homePage }) => {
    await expect(homePage.themeToggleButton).toBeVisible()
    await homePage.toggleTheme()
    // Theme cycled — button is still present
    await expect(homePage.themeToggleButton).toBeVisible()
  })

  test('stack section is visible with technology badges', async ({ homePage }) => {
    await expect(homePage.stackSection).toBeVisible()
    const badges = homePage.stackSection.locator('a.badge')
    await expect(badges).toHaveCount(15)
  })
})
