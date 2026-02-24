import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      titleKey: 'home.meta.title',
    },
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('@/pages/GuidePage.vue'),
    meta: {
      titleKey: 'guide.meta.title',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {
      titleKey: 'notFound.meta.title',
    },
  },
]
