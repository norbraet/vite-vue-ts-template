import { test, expect } from '../fixtures'

test.describe('Navigation', () => {
  test('home page loads at root URL', async ({ homePage }) => {
    await expect(homePage.page).toHaveURL('/')
  })

  test('logo navigates to home', async ({ guidePage }) => {
    await guidePage.logo.click()
    await expect(guidePage.page).toHaveURL('/')
  })

  test('clicking Guide nav link navigates to /guide', async ({ homePage }) => {
    await homePage.navGuide.click()
    await expect(homePage.page).toHaveURL('/guide')
  })

  test('clicking Home nav link navigates to /', async ({ guidePage }) => {
    await guidePage.navHome.click()
    await expect(guidePage.page).toHaveURL('/')
  })

  test('active nav link has router-link-active class on home', async ({ homePage }) => {
    await expect(homePage.navHome).toHaveClass(/router-link-active/)
    await expect(homePage.navGuide).not.toHaveClass(/router-link-active/)
  })

  test('active nav link has router-link-active class on guide', async ({ guidePage }) => {
    await expect(guidePage.navGuide).toHaveClass(/router-link-active/)
    await expect(guidePage.navHome).not.toHaveClass(/router-link-active/)
  })

  test('unknown URL renders the 404 page', async ({ notFoundPage }) => {
    await expect(notFoundPage.errorCode).toContainText('404')
  })
})
