import type { Locator, Page } from '@playwright/test'
import { AppPage } from './AppPage'

export class GuidePage extends AppPage {
  readonly heading: Locator
  readonly architectureSection: Locator
  readonly scriptSection: Locator

  constructor(page: Page) {
    super(page)
    this.heading = page.locator('.guide h1')
    this.architectureSection = page.locator('.card').filter({ hasText: 'Architecture' }).first()
    this.scriptSection = page.locator('.card').filter({ hasText: 'Script' }).first()
  }

  async goto(): Promise<void> {
    await this.page.goto('/guide')
  }
}
