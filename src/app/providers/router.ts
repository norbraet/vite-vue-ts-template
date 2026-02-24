import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

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

function getLocaleToken(): string {
  const globalLocale = i18n.global.locale as unknown

  if (typeof globalLocale === 'object' && globalLocale !== null && 'value' in globalLocale) {
    return String((globalLocale as { value: unknown }).value)
  }

  return String(globalLocale)
}

function applyDocumentTitle(route: RouteLocationNormalizedLoaded): void {
  if (route.meta?.titleKey) {
    document.title = i18n.global.t(String(route.meta.titleKey))
    return
  }

  if (route.meta?.title) {
    document.title = String(route.meta.title)
  }
}

// Global navigation guard
router.beforeEach((to, from, next) => {
  applyDocumentTitle(to)

  next()
})

export function setupRouter(app: App) {
  app.use(router)

  watch(
    [() => router.currentRoute.value.fullPath, () => getLocaleToken()],
    () => {
      applyDocumentTitle(router.currentRoute.value)
    },
    { immediate: true }
  )
}
