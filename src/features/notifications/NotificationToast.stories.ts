import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { useThemeStore } from '@/features/theme/model/useThemeStore'
import NotificationToast from './NotificationToast.vue'

const meta = {
  title: 'Features/NotificationToast',
  component: NotificationToast,
  tags: ['autodocs'],
  decorators: [
    () => ({
      setup() {
        useThemeStore().clearNotifications()
      },
      template: '<div style="min-height: 8rem;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof NotificationToast>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  render: () => ({
    components: { NotificationToast },
    setup() {
      const store = useThemeStore()
      store.clearNotifications()
      store.addNotification('Your changes have been saved.', 'info')
      return {}
    },
    template: '<NotificationToast />',
  }),
}

export const Success: Story = {
  render: () => ({
    components: { NotificationToast },
    setup() {
      const store = useThemeStore()
      store.clearNotifications()
      store.addNotification('Operation completed successfully.', 'success')
      return {}
    },
    template: '<NotificationToast />',
  }),
}

export const Warning: Story = {
  render: () => ({
    components: { NotificationToast },
    setup() {
      const store = useThemeStore()
      store.clearNotifications()
      store.addNotification('This action cannot be undone.', 'warning')
      return {}
    },
    template: '<NotificationToast />',
  }),
}

export const Error: Story = {
  render: () => ({
    components: { NotificationToast },
    setup() {
      const store = useThemeStore()
      store.clearNotifications()
      store.addNotification('Something went wrong. Please try again.', 'error')
      return {}
    },
    template: '<NotificationToast />',
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { NotificationToast },
    setup() {
      const store = useThemeStore()
      store.clearNotifications()
      store.addNotification('Your changes have been saved.', 'info')
      store.addNotification('Profile updated successfully.', 'success')
      store.addNotification('Your session expires in 5 minutes.', 'warning')
      store.addNotification('Failed to connect to the server.', 'error')
      return {}
    },
    template: '<NotificationToast />',
  }),
}
