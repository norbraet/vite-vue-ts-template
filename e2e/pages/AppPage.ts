import type { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export abstract class AppPage extends BasePage {
  readonly logo: Locator
  readonly navHome: Locator
  readonly navGuide: Locator
  readonly langueageSelector: Locator

  constructor(page: Page) {
    super(page)
    this.logo = page.locator('a.logo')
    this.navHome = page.locator('a.nav-link[href="/"]')
    this.navGuide = page.locator('a.nav-link[href="/guide"]')
    this.langueageSelector = page.locator('.selector-trigger')
  }
}
