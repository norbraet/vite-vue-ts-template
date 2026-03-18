import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { useThemeStore } from '@/features/theme/model/useThemeStore'
import HomePage from './HomePage.vue'

const meta = {
  title: 'Pages/HomePage',
  component: HomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DarkTheme: Story = {
  decorators: [
    () => ({
      setup() {
        useThemeStore().setTheme('dark')
      },
      template: '<story />',
    }),
  ],
}

export const LightTheme: Story = {
  decorators: [
    () => ({
      setup() {
        useThemeStore().setTheme('light')
      },
      template: '<story />',
    }),
  ],
}
