/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'vue-i18n'
import type { MessageSchema } from '@/shared/i18n/types'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
