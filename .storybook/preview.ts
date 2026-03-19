import { setup } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import type { Preview } from '@storybook/vue3-vite'

import type { MessageSchema } from '@/shared/i18n/types'
import type { Locale } from '@/shared/i18n/config/locales'

import commonEn from '@/shared/i18n/model/messages/en/common'
import navEn from '@/shared/i18n/model/messages/en/nav'
import commonDe from '@/shared/i18n/model/messages/de/common'
import navDe from '@/shared/i18n/model/messages/de/nav'
import themeEn from '@/features/theme/i18n/en'
import themeDe from '@/features/theme/i18n/de'
import notificationsEn from '@/features/notifications/i18n/en'
import notificationsDe from '@/features/notifications/i18n/de'
import languageSelectorEn from '@/features/language-selector/i18n/en'
import languageSelectorDe from '@/features/language-selector/i18n/de'
import homeEn from '@/pages/home/i18n/en'
import homeDe from '@/pages/home/i18n/de'
import guideEn from '@/pages/guide/i18n/en'
import guideDe from '@/pages/guide/i18n/de'
import notFoundEn from '@/pages/not-found/i18n/en'
import notFoundDe from '@/pages/not-found/i18n/de'

import '@/app/styles/global.css'

// Polyfill window.matchMedia for jsdom environments (addon-vitest)
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
}

const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      common: commonEn,
      nav: navEn,
      home: homeEn,
      guide: guideEn,
      notFound: notFoundEn,
      theme: themeEn,
      notifications: notificationsEn,
      languageSelector: languageSelectorEn,
    } satisfies MessageSchema,
    de: {
      common: commonDe,
      nav: navDe,
      home: homeDe,
      guide: guideDe,
      notFound: notFoundDe,
      theme: themeDe,
      notifications: notificationsDe,
      languageSelector: languageSelectorDe,
    } satisfies MessageSchema,
  },
})

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/guide', component: { template: '<div />' } },
    { path: '/:pathMatch(.*)*', component: { template: '<div />' } },
  ],
})

setup((app) => {
  app.use(createPinia())
  app.use(i18n)
  app.use(router)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
