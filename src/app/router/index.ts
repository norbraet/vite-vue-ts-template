import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('@/pages/GuidePage.vue'),
    meta: {
      title: 'Guide',
    },
  },
  {
    // Catch-all route for 404
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {
      title: 'Page Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title}`
  }

  next()
})

export default router
