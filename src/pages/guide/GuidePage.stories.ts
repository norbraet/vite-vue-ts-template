import type { Meta, StoryObj } from '@storybook/vue3-vite'

import GuidePage from './GuidePage.vue'

const meta = {
  title: 'Pages/GuidePage',
  component: GuidePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GuidePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
