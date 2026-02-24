import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

import { routes } from '@/app/router/routes'
import { i18n } from '@/app/providers/i18n'

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  },
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta?.titleKey) {
    document.title = i18n.global.t(String(to.meta.titleKey))
  } else if (to.meta?.title) {
    document.title = String(to.meta.title)
  }

  next()
})

export function setupRouter(app: App) {
  app.use(router)
}
