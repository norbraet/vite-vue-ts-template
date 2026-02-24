import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/HomePage.vue'),
    meta: {
      titleKey: 'home.meta.title',
    },
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('@/pages/guide/GuidePage.vue'),
    meta: {
      titleKey: 'guide.meta.title',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found/NotFoundPage.vue'),
    meta: {
      titleKey: 'notFound.meta.title',
    },
  },
]
