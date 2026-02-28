import { test, expect } from '../index'

test.describe('Not Found (404) page', () => {
  test('shows "404" error code for unknown routes', async ({ notFoundPage }) => {
    await expect(notFoundPage.errorCode).toContainText('404')
  })

  test('"Go Home" button navigates to /', async ({ notFoundPage }) => {
    await notFoundPage.goHomeButton.click()
    await expect(notFoundPage.page).toHaveURL('/')
  })

  test('unknown URL is preserved in the address bar', async ({ notFoundPage }) => {
    await expect(notFoundPage.page).toHaveURL('/this-page-does-not-exist')
  })
})
