import type { App } from 'vue'

import { setupPinia } from '@/app/providers/pinia'
import { setupI18n } from '@/app/providers/i18n'
import { setupRouter } from '@/app/providers/router.ts'

export function setupProviders(app: App) {
  setupPinia(app)
  setupI18n(app)
  setupRouter(app)
}
