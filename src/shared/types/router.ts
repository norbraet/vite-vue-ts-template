/**
 * Router-related TypeScript types
 */

export interface RouteMetaData {
  title?: string
  requiresAuth?: boolean
  roles?: string[]
  layout?: string
}

declare module 'vue-router' {
  interface RouteMeta extends RouteMetaData {}
}
