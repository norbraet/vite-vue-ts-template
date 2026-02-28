import type { Locator, Page } from '@playwright/test'
import { AppPage } from './AppPage'

export class NotFoundPage extends AppPage {
  readonly errorCode: Locator
  readonly goHomeButton: Locator
  readonly goBackButton: Locator

  constructor(page: Page) {
    super(page)
    this.errorCode = page.locator('.error-content h1')
    this.goHomeButton = page.locator('.actions .btn-primary')
    this.goBackButton = page.locator('.actions button:not(.btn-primary)')
  }

  async goto(): Promise<void> {
    await this.page.goto('/non-existent-page')
  }
}
