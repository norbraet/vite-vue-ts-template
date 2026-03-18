import type { Meta, StoryObj } from '@storybook/vue3-vite'

import NotFoundPage from './NotFoundPage.vue'

const meta = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NotFoundPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
