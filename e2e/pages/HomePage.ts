import type { Locator, Page } from '@playwright/test'
import { AppPage } from './AppPage'

export class HomePage extends AppPage {
  readonly heroHeading: Locator
  readonly heroSubtitle: Locator
  readonly viewGuideButton: Locator
  readonly themeToggleButton: Locator
  readonly stackSection: Locator

  constructor(page: Page) {
    super(page)
    this.heroHeading = page.locator('.hero h1')
    this.heroSubtitle = page.locator('.hero p')
    this.viewGuideButton = page.locator('.hero-actions a.btn-primary')
    this.themeToggleButton = page.locator('.hero-actions button')
    this.stackSection = page.locator('.stack.card')
  }

  async goto(): Promise<void> {
    await this.page.goto('/')
  }

  async toggleTheme(): Promise<void> {
    await this.themeToggleButton.click()
  }
}
