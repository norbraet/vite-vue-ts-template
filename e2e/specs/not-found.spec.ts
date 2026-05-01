import { checkA11y } from '../a11y/checkA11y'
import { test, expect } from '../index'

test.describe('Not Found (404) page', () => {
  test('a11y: 404 page baseline', async ({ notFoundPage }) => {
    await checkA11y(notFoundPage.page)
  })

  test('shows "404" error code for unknown routes', async ({ notFoundPage }) => {
    await expect(notFoundPage.errorCode).toContainText('404')
  })

  test('"Go Home" button navigates to /', async ({ notFoundPage }) => {
    await notFoundPage.goHomeButton.click()
    await expect(notFoundPage.page).toHaveURL('/')
  })

  test('unknown URL is preserved in the address bar', async ({ notFoundPage }) => {
    await expect(notFoundPage.page).toHaveURL('/non-existent-page')
  })
})
